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
  BountyBlockState,
  getBountyStatus,
  stringNumToJS,
  voteBounty,
  VotingState,
} from "@utils/bounty";
import { useEffect, useState } from "react";
import { RadioCard } from "@components/RadioCard";
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import theme from "src/theme";
import { SubmissionsForBounty_submissionsForBounty } from "@gql/__generated__/SubmissionsForBounty";
import { useRouter } from "next/router";

type Props = {
  votingState: VotingState;
  bounty: BountyQuery_bounty;
  currSubmission: SubmissionsForBounty_submissionsForBounty | null;
  isCreator: boolean;
  equity: number;
};

export default function FunderVote(props: Props) {
  const router = useRouter();
  const [bountyState, setBountyState] = useState<BountyBlockState>();
  const [yea, setYea] = useState<number>(-1);
  const [isLoading, setLoading] = useState<boolean>(false);
  let { votingState, bounty, equity, isCreator } = props;

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

  useEffect(() => {
    async function getBounty(contract: any) {
      const status = await getBountyStatus(contract);
      setBountyState(status);
    }
    const contract = bountyContract(bounty?.address!);
    getBounty(contract);
  }, [bounty?.address]);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "deadlineOptions",
    value: yea,
    onChange: (val) => {
      setYea(Number(val));
    },
  });
  const bonusTarget = Number(votingState.votingOn) + 1;

  const currOngoingSubmission = props.currSubmission;
  console.log(votingState);

  return (
    <VStack
      direction="column"
      mt="36px"
      spacing="12px"
      maxWidth="80%"
      margin="auto"
    >
      {!isCreator &&
        (props.currSubmission ? (
          <>
            <Heading my="12px">
              Submission #{Number(votingState.timesFailed) + 1}
            </Heading>
            <Text textAlign="center" fontSize="24px" pb="12px">
              @{bounty.creator_handle} submitted a new revision! You have 48
              hours to vote and decide whether the submission is worthy of a
              bonus!
            </Text>
          </>
        ) : (
          <Text textAlign="center" fontSize="24px" pb="12px">
            Waiting for @{bounty.creator_handle} to submit for{" "}
            <b>Bonus Target {bonusTarget}</b>
          </Text>
        ))}

      <Text fontSize="24px" pb="12px" mr="8px">
        This bounty can fail{" "}
        <Text as="span" fontSize="24px" fontWeight="700" pb="12px">
          {Number(votingState.maxFailures) - Number(votingState.timesFailed)}{" "}
          more times
        </Text>
      </Text>
      <VStack
        direction="column"
        alignItems="flex-start"
        mt="36px"
        spacing="12px"
        maxWidth="80%"
        margin="auto"
      >
        <Flex alignItems="center" pb="18px">
          <Text variant="metadataLabelLg" mr="12px">
            Bonus Target {bonusTarget}:
          </Text>

          <Text variant="metadataLabelLg" fontSize="36px">
            {stringNumToJS(props.votingState.bonusValue)} MATIC (
            {props.votingState.bonusPct}%)
          </Text>
        </Flex>
      </VStack>

      {props.currSubmission != null && (
        <>
          <Box pb="48px" width="100%">
            <Slider
              isReadOnly
              defaultValue={Number(votingState.currentYeas)}
              min={0}
              max={
                bountyState?.totalContribution
                  ? Number(bountyState.totalContribution)
                  : 0
              }
              step={1}
            >
              <SliderTrack bg="red.100">
                <Box position="relative" right={10} />
                <SliderFilledTrack bg={theme.colors.bountyGreen} />
              </SliderTrack>
              <SliderThumb boxSize={6} />
              <SliderMark
                value={
                  Number(votingState.pctYeasNeeded) *
                  Number(votingState.yeasNeeded)
                }
                textAlign="center"
                color={theme.colors.bountyBrown}
                fontSize="20px"
                mt="5"
                ml="-15px"
              >
                {votingState.pctYeasNeeded}% needed
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
            <Text fontSize="24px" fontWeight="700" pb="12px" mr="8px">
              {stringNumToJS(votingState.yeasNeeded)} MATIC{" "}
              <Text
                as="span"
                fontSize="24px"
                fontWeight="500"
                pb="12px"
                mr="8px"
              >
                more &apos;Yea&apos; equity is needed to succeed.
              </Text>
            </Text>
          </Flex>

          {!isCreator ? (
            <>
              <Text fontSize="24px" fontWeight="700" pb="12px" mr="8px">
                <Text
                  as="span"
                  fontSize="24px"
                  fontWeight="500"
                  pb="12px"
                  mr="8px"
                >
                  You have
                </Text>
                {equity} MATIC
              </Text>

              <FormLabel variant="metadataLabelLg">
                What will you choose?
              </FormLabel>
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
              <Button
                isLoading={isLoading}
                disabled={yea === -1 && !isLoading}
                onClick={async () => {
                  setLoading(true);

                  await vote(yea);
                  setLoading(false);
                  router.reload();
                }}
              >
                Vote
              </Button>
            </>
          ) : null}
        </>
      )}
    </VStack>
  );
}
