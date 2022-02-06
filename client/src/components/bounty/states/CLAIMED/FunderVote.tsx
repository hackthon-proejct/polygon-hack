import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Spacer,
  Text,
  useRadioGroup,
  VStack,
} from "@chakra-ui/react";
import { web3 } from "@utils/constants";
import bountyContract, {
  stringNumToJS,
  voteBounty,
  VotingState,
} from "@utils/bounty";
import { useState } from "react";
import { RadioCard } from "@components/RadioCard";
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import theme from "src/theme";
import { SubmissionsForBounty_submissionsForBounty } from "@gql/__generated__/SubmissionsForBounty";

type Props = {
  votingState: VotingState;
  bounty: BountyQuery_bounty;
  currSubmission: SubmissionsForBounty_submissionsForBounty | null;
};

export default function FunderVote(props: Props) {
  const [yea, setYea] = useState<number>(-1);
  let { votingState, bounty } = props;

  const vote = async (val: number) => {
    const contract = bountyContract(bounty.address!);
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
    <VStack
      direction="column"
      mt="36px"
      spacing="12px"
      maxWidth="80%"
      margin="auto"
    >
      {props.currSubmission ? (
        <>
          <Heading my="12px">
            Submission #{Number(votingState.timesFailed) + 1}
          </Heading>
          <Text textAlign="center" fontSize="24px" pb="12px">
            @{bounty.creator_handle} submitted a new revision! You have 48 hours
            to vote and decide whether the submission is worthy of a bonus!
          </Text>
        </>
      ) : (
        <Text textAlign="center" fontSize="24px" pb="12px">
          Waiting for @{bounty.creator_handle} to submit for{" "}
          <b>milestone {votingState.votingOn}</b>
        </Text>
      )}

      <VStack
        direction="column"
        alignItems="flex-start"
        mt="36px"
        spacing="12px"
        maxWidth="80%"
        margin="auto"
      >
        <Flex alignItems="center" py="18px">
          <Text variant="metadataLabelLg" mr="12px">
            Next Bonus Target:
          </Text>

          <Text variant="metadataLabelLg" fontSize="36px">
            {stringNumToJS(props.votingState.bonusValue)} MATIC (
            {props.votingState.bonusPct}%)
          </Text>
        </Flex>
      </VStack>
      <Box py="48px" width="100%">
        <Slider
          isReadOnly
          defaultValue={Number(votingState.currentYeas)}
          min={0}
          max={Number(votingState.currentVotes)}
          step={1}
        >
          <SliderTrack bg="red.100">
            <Box position="relative" right={10} />
            <SliderFilledTrack bg={theme.colors.bountyGreen} />
          </SliderTrack>
          <SliderThumb boxSize={6} />
          <SliderMark
            value={
              (Number(votingState.pctYeasNeeded) / 100) *
              Number(votingState.currentVotes)
            }
            textAlign="center"
            color={theme.colors.bountyBrown}
            fontSize="20px"
            mt="5"
            ml="-15px"
          >
            {votingState.pctYeasNeeded} % needed
          </SliderMark>
        </Slider>
      </Box>
      <Flex width="100%">
        <Text variant="metadataLabelLg">
          {stringNumToJS(votingState.currentYeas)} Yeas
        </Text>
        <Spacer />
        <Text variant="metadataLabelLg">
          {stringNumToJS(votingState.currentNays)} Nays
        </Text>
      </Flex>

      <Flex>
        <Text fontSize="24px" pb="12px" mr="8px">
          This bounty can fail
        </Text>
        <Text fontSize="24px" fontWeight="700" pb="12px">
          {Number(votingState.maxFailures) - Number(votingState.timesFailed)}{" "}
          more times
        </Text>
      </Flex>
      <Flex>
        <Text fontSize="24px" fontWeight="700" pb="12px" mr="8px">
          {stringNumToJS(votingState.yeasNeeded)} more &apos;Yea&apos; votes
          needed to succeed
        </Text>
      </Flex>

      <FormLabel variant="metadataLabelLg">What will you choose?</FormLabel>
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
      <Button disabled={yea == -1} onClick={() => vote(yea)}>
        Vote
      </Button>
    </VStack>
  );
}
