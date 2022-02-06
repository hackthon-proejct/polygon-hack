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
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import {
  bountyDeliverableOptions,
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
        placeholder="Mininum bounty size"
        value={bountyMin}
        onChange={(e) => {
          setBountyMin(e.currentTarget.valueAsNumber);
        }}
      />

      <Button
        onClick={() => {
          alert("Should submit negotiation and trigger neg");
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
