"use client"

import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { useEffect, useRef, useState } from "react";
import { Button, Flex, Heading, Input, Stat, StatGroup, StatLabel, StatNumber, Text, useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import styles from './page.module.css'
import { flip } from "@/utils/coinflip";
import { monadTestnet } from "@/lib/chain";
import { client } from "@/lib/client";
import coinflipABI from '@/abi/Coinflip.json';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_COINFLIP_CONTRACT_ADDRESS || "";
const WEBSOCKET_PROVIDER = `wss://monad-testnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || ''}`;

/// The page is only using the user address to listen for events, we can't use the
/// sequence number as sometimes the events are received out of order
export default function Home() {
  const [coinFace, setCoinFace] = useState<'HEADS' | 'TAILS'>('HEADS');
  const [amountToBet, setAmountToBet] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [sequenceNumber, setSequenceNumber] = useState(0);
  const sequenceNumberRef = useRef(sequenceNumber);
  const acc = useActiveAccount();
  const toast = useToast();
  const { data: contractBalance, isLoading: isContractBalanceLoading, refetch: refetchContractBalance } = useWalletBalance({
    chain: monadTestnet,
    address: CONTRACT_ADDRESS,
    client: client,
  });
  const { data: userBalance, isLoading: isUserBalanceLoading, refetch: refetchUserBalance } = useWalletBalance({
    chain: monadTestnet,
    address: acc?.address,
    client: client,
  });

  // Keep the ref updated with the latest sequenceNumber
  useEffect(() => {
    sequenceNumberRef.current = sequenceNumber;
  }, [sequenceNumber]);


  useEffect(() => {
    if (!acc || typeof window === 'undefined') return;

    const provider = new ethers.WebSocketProvider(WEBSOCKET_PROVIDER);
    const coinflip = new ethers.Contract(CONTRACT_ADDRESS, coinflipABI, provider);

    if (!coinflip) {
      console.log("Failed to create coinflip contract.");
      return;
    }

    console.log(`Setting up event listeners for contract at address: ${CONTRACT_ADDRESS}`);

    coinflip.on('Won', async (user, seqNum, finalNumber, betAmount, event) => {
      console.log(`Won event detected for sequence number: ${seqNum}`);
      console.log(`Current sequence number: ${sequenceNumberRef.current}`);
      try {
        // don't check sequence number because could face race condition
        if (user.toLowerCase() === acc?.address.toLowerCase()) {
          setSequenceNumber(0);
          setIsLoading(false);
          refetchUserBalance();
          refetchContractBalance();
          toast({
            title: "Won!",
            description: `You bet on ${finalNumber > 50 ? 'HEADS' : 'TAILS'} and the result was ${finalNumber > 50 ? 'HEADS' : 'TAILS'}`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Error processing Transfer event:", error);
        setSequenceNumber(0);
        setIsLoading(false);
        toast({
          title: "Error",
          description: "An error occurred while processing the event.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    });
    coinflip.on('Lost', async (user, seqNum, finalNumber, betAmount, event) => {
      console.log(`Lost event detected for sequence number: ${seqNum}`);
      console.log(`Current sequence number: ${sequenceNumberRef.current}`);
      try {
        // don't check sequence number because could face race condition
        if (user.toLowerCase() === acc?.address.toLowerCase()) {
          setSequenceNumber(0);
          setIsLoading(false);
          refetchUserBalance();
          refetchContractBalance();
          toast({
            title: "Lost!",
            description: `You bet on ${finalNumber > 50 ? 'TAILS' : 'HEADS'} but the result was ${finalNumber > 50 ? 'HEADS' : 'TAILS'}`,
            status: "warning",
            duration: 9000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Error processing Transfer event:", error);
        setSequenceNumber(0);
        setIsLoading(false);
        toast({
          title: "Error",
          description: "An error occurred while processing the event.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    });

    return () => {
      // Clean up the event listeners
      coinflip.removeAllListeners('Won');
      coinflip.removeAllListeners('Lost');
      // Close the WebSocket connection
      provider.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acc]);

  const handleFlipClick = async () => {
    if (amountToBet === '') {
      return;
    }
    // check if contract balance is greater than amount to bet
    if (contractBalance && contractBalance.value < (ethers.parseEther(amountToBet) * 2n)) {
      toast({
        title: "Error",
        description: "Bet bigger than contract balance",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    const result = await flip(acc, setIsLoading, coinFace == 'HEADS', amountToBet); // sequence number from the spin
    if (result == undefined) {
      // print error message
      toast({
        title: "Error",
        description: "Failed to flip the coin",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    setSequenceNumber(result);
  };

  const coinAnimation = () => {
    return (
      <div className={styles.coinContainer}>
        <div className={styles.coin}></div>
      </div>
    );
  };

  const buttons = () => {
    if (acc) {
      return (
        <Flex direction={'column'} gap={5} alignItems={'center'}>
          <Flex direction={'row'} gap={4}>
            <Button
              border={coinFace == 'HEADS' ? '4px' : ''}
              borderColor={coinFace == 'HEADS' ? 'monadoffwhite' : ''}
              backgroundColor="monadpurple"
              _hover={{ backgroundColor: "monadblue" }}
              onClick={() => setCoinFace('HEADS')}
            >
              HEADS
            </Button>
            <Button
              border={coinFace == 'TAILS' ? '4px' : ''}
              borderColor={coinFace == 'TAILS' ? 'monadoffwhite' : ''}
              backgroundColor="monadpurple"
              _hover={{ backgroundColor: "monadblue" }}
              onClick={() => setCoinFace('TAILS')}
            >
              TAILS
            </Button>
          </Flex>
          <StatGroup gap={10} alignItems="center" m={4} pl={3}>
            <Stat>
              <StatLabel>Your balance</StatLabel>
              <StatNumber>
                {isUserBalanceLoading ? 'Loading...' : userBalance?.displayValue.slice(0, 6)}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Protocol balance</StatLabel>
              <StatNumber>
                {isContractBalanceLoading ? 'Loading...' : contractBalance?.displayValue}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Max to bet</StatLabel>
              <StatNumber>
                {isContractBalanceLoading ? 'Loading...' : ethers.formatEther(contractBalance!.value / 2n)}
              </StatNumber>
            </Stat>
          </StatGroup>
          <Input
            placeholder="Amount to bet"
            type="number"
            onChange={(e) => setAmountToBet(e.target.value)}
            width={"auto"}
          />
          <Button
            backgroundColor="monadpurple"
            _hover={{ backgroundColor: "monadblue" }}
            onClick={handleFlipClick}
            isLoading={isLoading}
          >
            FLIP A COIN
          </Button>
        </Flex>
      );
    } else {
      return <Text>Connect to spin</Text>
    }
  };

  return (
    <Flex align="center" justify="center" direction='column' mt={8} mb={8} gap={4} className="w-full">
      <Heading size='2xl'>Coinflip</Heading>
      {coinAnimation()}
      {buttons()}
    </Flex>
  );
}
