import { useMutation, useQuery } from "@apollo/client";
import {
  Text,
  Button,
  Flex,
  FormLabel,
  HStack,
  Input,
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
import { TimeType } from "@utils/types";
import { useState } from "react";

type Props = {
  userId: string;
};

const expirationOptions: TimeType[] = ["48 hours", "1 week", "2 weeks"];

const deadlineOptions: TimeType[] = [
  "48 hours",
  "1 week",
  "2 weeks",
  "1 month",
  "2 months",
  "3 months",
];

const timeMap = {
  "48 hours": 172800,
  "1 week": 604800,
  "2 weeks": 1209600,
  "1 month": 2629746,
  "2 months": 5259492,
  "3 months": 7889238,
};

function CreateBounty({ userId }: Props) {
  const [expiration, setExpiration] = useState<TimeType>("48 hours");
  const [deadline, setDeadline] = useState<TimeType>("1 week");
  const {
    getRootProps: getExpirationRootProps,
    getRadioProps: getExpirationRadioProps,
  } = useRadioGroup({
    name: "expiration",
    value: expiration,
    onChange: (val) => {
      setExpiration(val as TimeType);
    },
  });
  const {
    getRootProps: getDeadlineRootProps,
    getRadioProps: getDeadlineRadioProps,
  } = useRadioGroup({
    name: "deadlineOptions",
    value: deadline,
    onChange: (val) => {
      setDeadline(val as TimeType);
    },
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

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pitch, setPitch] = useState("");
  const [resX, setResX] = useState(2000);
  const [resY, setResY] = useState(2000);
  const [max, setMax] = useState(100);

  return loading ? (
    <Text>Loading...</Text>
  ) : board_id != null ? (
    <Flex direction="column">
      <FormLabel htmlFor="bountyTitle">Title</FormLabel>
      <Input
        id="bountyTitle"
        placeholder="Title of Bounty"
        value={title}
        onChange={(e) => {
          setTitle(e.currentTarget.value);
        }}
      />

      <FormLabel htmlFor="bountyDescription">Description</FormLabel>
      <Textarea
        id="bountyDescription"
        placeholder="Description of Bounty"
        value={description}
        onChange={(e) => {
          setDescription(e.currentTarget.value);
        }}
      />

      <FormLabel htmlFor="bountyPitch">Pitch</FormLabel>
      <Input
        id="bountyPitch"
        placeholder="youtube link"
        value={pitch}
        onChange={(e) => {
          setPitch(e.currentTarget.value);
        }}
      />

      <FormLabel htmlFor="bountyResX">Resolution (Width)</FormLabel>
      <Input
        id="bountyResX"
        type="number"
        placeholder="2000"
        value={resX}
        onChange={(e) => {
          setResX(e.currentTarget.valueAsNumber);
        }}
      />

      <FormLabel htmlFor="bountyResY">Resolution (Height)</FormLabel>
      <Input
        id="bountyResY"
        type="number"
        placeholder="2000"
        value={resY}
        onChange={(e) => {
          setResY(e.currentTarget.valueAsNumber);
        }}
      />

      <FormLabel htmlFor="bountyMax">MaxBounty</FormLabel>
      <Input
        id="bountyMax"
        type="number"
        placeholder="15ETH"
        value={max}
        onChange={(e) => {
          setMax(e.currentTarget.valueAsNumber);
        }}
      />

      <FormLabel htmlFor="bountyResY">Expiration Date</FormLabel>
      <HStack {...expirationGroup}>
        {expirationOptions.map((value) => {
          const radio = getExpirationRadioProps({ value });
          return (
            <RadioCard key={value} value={expiration} {...radio}>
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
            <RadioCard key={value} value={deadline} {...radio}>
              {value}
            </RadioCard>
          );
        })}
      </HStack>

      <Button
        isLoading={isCreatingBounty}
        loadingText="Submitting"
        colorScheme="teal"
        variant="outline"
        onClick={async () => {
          const bountyResp = await createBounty({
            variables: {
              board_id,
              twitter_handle,
              metadata: {
                title,
                description,
                pitch,
                specs: {
                  resX,
                  resY,
                },
                maxValue: max,
                mustBeClaimedTime:
                  Math.floor(Date.now() / 100) + timeMap[expiration],
                timeLimit: timeMap[deadline],
              },
            },
          });
        }}
      >
        {isCreatingBounty ? "Creating..." : "Create"}
      </Button>
    </Flex>
  ) : (
    <Text>No board was found</Text>
  );
}

export default CreateBounty;
