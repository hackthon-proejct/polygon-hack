import {
  Button,
  Flex,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useRadioGroup,
} from "@chakra-ui/react";
import { RadioCard } from "@components/RadioCard";
import { useAppSelector } from "@redux/hooks";
import { selectUserId } from "@redux/slices/userSlice";
import Board from "./Board";

type Props = {
  userId: string;
};
function CreateBounty({ userId }: Props) {
  const expirationOptions = ["48 hours", "7 days", "14 days"];
  const deadlineOptions = [
    "48 hours",
    "1 week",
    "2 weeks",
    "1 month",
    "2 months",
    "3 months",
  ];
  const {
    getRootProps: getExpirationRootProps,
    getRadioProps: getExpirationRadioProps,
  } = useRadioGroup({
    name: "expiration",
    defaultValue: "48 hours",
    onChange: console.log,
  });

  const {
    getRootProps: getDeadlineRootProps,
    getRadioProps: getDeadlineRadioProps,
  } = useRadioGroup({
    name: "deadlineOptions",
    defaultValue: "48 hours",
    onChange: console.log,
  });

  const expirationGroup = getExpirationRootProps();
  const deadlineGroup = getDeadlineRootProps();
  return (
    <Flex direction="column">
      <FormLabel htmlFor="bountyTitle">Title</FormLabel>
      <Input id="bountyTitle" placeholder="Title of Bounty" />

      <FormLabel htmlFor="bountyDescription">Description</FormLabel>
      <Textarea id="bountyDescription" placeholder="Description of Bounty" />
      <FormLabel htmlFor="bountyPitch">Pitch</FormLabel>
      <Input id="bountyPitch" placeholder="youtube link" />

      <FormLabel htmlFor="bountyResX">Resolution (Width)</FormLabel>
      <Input id="bountyResX" placeholder="2000" />
      <FormLabel htmlFor="bountyResY">Resolution (Height)</FormLabel>
      <Input id="bountyResY" placeholder="2000" />

      <FormLabel htmlFor="bountyResY">Expiration Date</FormLabel>
      <HStack {...expirationGroup}>
        {expirationOptions.map((value) => {
          const radio = getExpirationRadioProps({ value });
          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          );
        })}
      </HStack>

      <FormLabel htmlFor="bountyResY">Expiration Date</FormLabel>
      <HStack {...deadlineGroup}>
        {deadlineOptions.map((value) => {
          const radio = getDeadlineRadioProps({ value });
          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          );
        })}
      </HStack>

      <Button loadingText="Submitting" colorScheme="teal" variant="outline">
        Create
      </Button>
    </Flex>
  );
}

export default CreateBounty;
