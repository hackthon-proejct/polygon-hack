import { useMutation, useQuery } from "@apollo/client";
import {
  Text,
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
import { CREATE_BOUNTY } from "@gql/bounties.graphql";
import { USER } from "@gql/users.graphql";
import {
  CreateBounty as CreateBountyType,
  CreateBountyVariables,
} from "@gql/__generated__/CreateBounty";
import {
  UserQuery as UserQueryType,
  UserQueryVariables,
} from "@gql/__generated__/UserQuery";
import { useAppSelector } from "@redux/hooks";
import { selectUserId } from "@redux/slices/userSlice";
import Board from "./Board";

type Props = {
  userId: string;
};
const expirationOptions = ["48 hours", "7 days", "14 days"];
const deadlineOptions = [
  "48 hours",
  "1 week",
  "2 weeks",
  "1 month",
  "2 months",
  "3 months",
];

function CreateBounty({ userId }: Props) {
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

  const { data, loading, error } = useQuery<UserQueryType, UserQueryVariables>(
    USER,
    {
      fetchPolicy: "network-only",
      variables: {
        id: userId,
      },
    }
  );

  const [
    createBounty,
    { loading: isCreatingBounty, error: errorCreatingBounty },
  ] = useMutation<CreateBountyType, CreateBountyVariables>(CREATE_BOUNTY);

  const user = data?.user || null;
  const { board } = user || {};
  const { id: board_id } = board || {};

  // only pass the twitter handle if we can't fetch a user.
  let twitter_handle: string | null = userId;
  if (user != null) {
    twitter_handle = null;
  }

  return loading ? (
    <Text>Loading...</Text>
  ) : board_id != null ? (
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
      <FormLabel htmlFor="bountyMax">MaxBounty</FormLabel>
      <Input id="bountyMax" placeholder="15ETH" />

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

      <FormLabel htmlFor="bountyResY">Deadline Date</FormLabel>
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

      <Button
        loadingText="Submitting"
        colorScheme="teal"
        variant="outline"
        onClick={async () => {
          const bountyResp = await createBounty({
            variables: {
              board_id,
              twitter_handle,
              metadata: {
                maxValue: 100000000,
                mustBeClaimedTime: 1643949932,
                timeLimit: 86400,
              },
            },
          });
        }}
      >
        Create
      </Button>
    </Flex>
  ) : (
    <Text>No board was found</Text>
  );
}

export default CreateBounty;
