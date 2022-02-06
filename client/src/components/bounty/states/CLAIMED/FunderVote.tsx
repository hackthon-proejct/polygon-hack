import {
  Box,
  Button,
  Flex,
  FormLabel,
  HStack,
  Text,
  useRadioGroup,
} from "@chakra-ui/react";
import { web3 } from "@utils/constants";
import bountyContract, { voteBounty, VotingState } from "@utils/bounty";
import { useState } from "react";
import { RadioCard } from "@components/RadioCard";

type Props = { votingState: VotingState; address: string };

export default function FunderVote(props: Props) {
  const [yea, setYea] = useState<number>(0);

  const vote = async (val: number) => {
    const contract = bountyContract(props.address);
    const accounts = await web3.eth.getAccounts();
    const result = await voteBounty(
      contract,
      Number(props.votingState.votingOn),
      yea === 1,
      accounts[0]
    );
    console.log("result", result);
    return result;
  };
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "deadlineOptions",
    value: yea,
    onChange: (val) => {
      setYea(Number(val));
    },
  });

  return (
    <Flex direction="column">
      <Text>currentNays: {props.votingState.currentNays}</Text>
      <Text>currentVotes: {props.votingState.currentVotes}</Text>
      <Text>currentYeas: {props.votingState.currentYeas}</Text>
      <Text>maxFailures: {props.votingState.maxFailures}</Text>
      <Text>pctYeasNeeded: {props.votingState.pctYeasNeeded}</Text>
      <Text>timesFailed: {props.votingState.timesFailed}</Text>
      <Text>votingOn: {props.votingState.votingOn}</Text>
      <FormLabel>Your Choice</FormLabel>
      <HStack {...getRootProps()}>
        {[0, 1].map((value) => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard key={value} value={yea} {...radio}>
              {value === 0 ? "Nay" : "Yea"}
            </RadioCard>
          );
        })}
      </HStack>
      <Button onClick={() => vote(yea)}>Vote</Button>
    </Flex>
  );
}
