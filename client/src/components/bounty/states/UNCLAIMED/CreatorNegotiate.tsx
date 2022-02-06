import { useMutation } from "@apollo/client";
import {
  Text,
  Flex,
  Heading,
  FormLabel,
  HStack,
  Textarea,
  Input,
  Button,
  VStack,
  useRadioGroup,
} from "@chakra-ui/react";
import { RadioCard } from "@components/RadioCard";
import { CREATE_NEGOTIATION } from "@gql/negotiations.graphql";
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import {
  CreateNegotiation,
  CreateNegotiationVariables,
} from "@gql/__generated__/CreateNegotiation";
import {
  bountyDeliverableOptions,
  getSecondsFromTimeString,
  getTimeStringFromSeconds,
} from "@utils/bounty";
import { TimeSecondsType, TimeStringType } from "@utils/types";
import { useState } from "react";
import Router, { useRouter } from "next/router";

type Props = { bounty: BountyQuery_bounty };

export default function Creator({ bounty }: Props) {
  const router = useRouter();
  const currentTimeOnBlockcchain = getTimeStringFromSeconds(
    bounty.block_metadata.timeLimit as TimeSecondsType
  );
  const [deliverable, setDeliverable] = useState<TimeStringType>(
    currentTimeOnBlockcchain
  );

  const [createNegotiation, { loading, error }] = useMutation<
    CreateNegotiation,
    CreateNegotiationVariables
  >(CREATE_NEGOTIATION);
  const [description, setDescription] = useState("");
  const [bountyMin, setBountyMin] = useState(
    bounty.block_metadata.reservePrice
  );
  const {
    getRootProps: getDeliverableRootProps,
    getRadioProps: getDeliverableRadioProps,
  } = useRadioGroup({
    name: "deliverableOptions",
    value: deliverable,
    onChange: (val) => {
      setDeliverable(val as TimeStringType);
    },
  });

  const deliverableGroup = getDeliverableRootProps();
  return (
    <VStack
      direction="column"
      mt="36px"
      spacing="12px"
      maxWidth="80%"
      margin="auto"
    >
      <Heading my="12px">Negotiate this bounty</Heading>
      <Text textAlign="center" fontSize="24px" pb="12px">
        Interested in this bounty? Declare your terms of service, deliverable
        timelines, and any other changes you'd like to see below start the
        claim.
      </Text>
      <VStack
        direction="column"
        alignItems="flex-start"
        mt="36px"
        spacing="12px"
        maxWidth="80%"
        margin="auto"
      >
        <Text variant="metadataLabel">Deliverable Date</Text>
        <HStack {...deliverableGroup}>
          {bountyDeliverableOptions.map((value) => {
            const radio = getDeliverableRadioProps({ value });
            return (
              <Flex direction="column" key={value}>
                <RadioCard value={deliverable} {...radio}>
                  {value}
                </RadioCard>
                <Text sx={styles.deliverableCurrent}>
                  {value === currentTimeOnBlockcchain
                    ? "Current Time"
                    : deliverable === value
                    ? "New Time"
                    : null}
                </Text>
              </Flex>
            );
          })}
        </HStack>
        <FormLabel variant="metadataLabel" htmlFor="bountyChangesDescription">
          Describe your proposed changes
        </FormLabel>
        <Textarea
          id="bountyChangesDescription"
          placeholder="Description of Changes"
          value={description}
          onChange={(e) => {
            setDescription(e.currentTarget.value);
          }}
        />
        <Flex>
          <FormLabel
            variant="metadataLabel"
            htmlFor="bountyChangesDescription"
            mr="4px"
          >
            Minimum Reserve Price
          </FormLabel>
          <Text variant="metadataLabel" fontWeight="400" mr="4px">
            (currently
          </Text>
          <Text variant="metadataLabel">
            {bounty.block_metadata.reservePrice} MATIC
          </Text>
          <Text variant="metadataLabel" fontWeight="400" mr="4px">
            )
          </Text>
        </Flex>
        <Input
          id="bountyMin"
          type="number"
          placeholder="Mininum bounty size"
          value={bountyMin}
          onChange={(e) => {
            setBountyMin(e.currentTarget.valueAsNumber);
          }}
        />
      </VStack>

      <Button
        isLoading={loading}
        onClick={async () => {
          try {
            const negotiationResp = await createNegotiation({
              variables: {
                bounty_id: bounty.id,
                metadata: {
                  reservePrice: bountyMin,
                  description: description,
                  timeLimit: getSecondsFromTimeString(deliverable),
                },
              },
            });
            console.log("coll", negotiationResp);
            if (negotiationResp?.data?.createNegotiation) {
              router.reload();
            }
          } catch (e: any) {
            alert("Something went wrong!");
          }
        }}
      >
        Submit Proposal
      </Button>
    </VStack>
  );
}

const styles = {
  deliverableCurrent: {
    height: "40px",
    lineHeight: "40px",
    textAlign: "center",
  },
};
