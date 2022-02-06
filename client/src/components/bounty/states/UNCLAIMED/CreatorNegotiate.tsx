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

type Props = { bounty: BountyQuery_bounty };

export default function Creator({ bounty }: Props) {
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
  const [bountyMin, setBountyMin] = useState(0);
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
    <Flex direction="column">
      <Heading>Negotiate this bounty</Heading>
      <FormLabel>Deliverable Date</FormLabel>
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
      <FormLabel htmlFor="bountyChangesDescription">
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
      <FormLabel htmlFor="bountyChangesDescription">
        Minimum bounty size
      </FormLabel>
      <Input
        id="bountyMin"
        type="number"
        placeholder="Mininum bounty size"
        value={bountyMin}
        onChange={(e) => {
          setBountyMin(e.currentTarget.valueAsNumber);
        }}
      />

      <Button
        onClick={async () => {
          await createNegotiation({
            variables: {
              bounty_id: bounty.id,
              metadata: {
                reservePrice: bountyMin,
                description: description,
                timeLimit: getSecondsFromTimeString(deliverable),
              },
            },
          });
        }}
      >
        Submit
      </Button>
    </Flex>
  );
}

const styles = {
  deliverableCurrent: {
    height: "40px",
    lineHeight: "40px",
    textAlign: "center",
  },
};
