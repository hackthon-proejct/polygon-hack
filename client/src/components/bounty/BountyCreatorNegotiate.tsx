import { BountyStatus } from "@shared/enums";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  HStack,
  Select,
  Text,
  useRadioGroup,
} from "@chakra-ui/react";
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import { useAppSelector, useAppDispatch } from "@redux/hooks";

import { selectUserId } from "@redux/slices/userSlice";
import { RadioCard } from "@components/RadioCard";
import {
  bountyDeliverableOptions,
  getTimeStringFromSeconds,
} from "@utils/bounty";
import { TimeSecondsType, TimeStringType } from "@utils/types";
import { useState } from "react";

type Props = { bounty: BountyQuery_bounty };

export default function BountyCreatorNegotiate({ bounty }: Props) {
  const currentTimeOnBlockcchain = getTimeStringFromSeconds(
    bounty.block_metadata.timeLimit as TimeSecondsType
  );
  const [deliverable, setDeliverable] = useState<TimeStringType>(
    currentTimeOnBlockcchain
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
  const loggedInUserId = useAppSelector(selectUserId);
  // TODO: for testing only
  const isCreator = bounty.creator_id === loggedInUserId;
  const deliverableGroup = getDeliverableRootProps();
  return (
    <Box>
      {isCreator ? (
        <Flex direction="column">
          <Heading>Negotiate this bounty</Heading>
          <FormLabel>Deliverable Date</FormLabel>
          <FormLabel htmlFor="bountyResY">Deliverable Date</FormLabel>
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

          <Button>Submit</Button>
        </Flex>
      ) : null}
    </Box>
  );
}

const styles = {
  deliverableCurrent: {
    height: "40px",
    lineHeight: "40px",
    textAlign: "center",
  },
};
