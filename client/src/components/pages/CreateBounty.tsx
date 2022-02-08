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
  VStack,
} from "@chakra-ui/react";
import { RadioCard } from "@components/RadioCard";
import { CREATE_BOUNTY } from "@gql/bounties.graphql";
import { LOOKUP_TWITTER_HANDLE, USER } from "@gql/users.graphql";
import {
  CreateBounty as CreateBountyType,
  CreateBountyVariables,
} from "@gql/__generated__/CreateBounty";
import {
  LookupTwitterHandle,
  LookupTwitterHandleVariables,
} from "@gql/__generated__/LookupTwitterHandle";
import {
  UserQuery as UserQueryType,
  UserQueryVariables,
} from "@gql/__generated__/UserQuery";
import {
  bountyDeliverableOptions,
  bountyExpirationOptions,
  getSecondsFromTimeString,
} from "@utils/bounty";
import { TimeStringType } from "@utils/types";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
  twitterHandle: string;
};

function CreateBounty({ twitterHandle }: Props) {
  const router = useRouter();
  const [expirationString, setExpirationString] =
    useState<TimeStringType>("48 hours");
  const [deliverableString, setDeliverableString] =
    useState<TimeStringType>("1 week");
  const {
    getRootProps: getExpirationRootProps,
    getRadioProps: getExpirationRadioProps,
  } = useRadioGroup({
    name: "expiration",
    value: expirationString,
    onChange: (val) => {
      setExpirationString(val as TimeStringType);
    },
  });
  const {
    getRootProps: getDeliverableRootProps,
    getRadioProps: getDeliverableRadioProps,
  } = useRadioGroup({
    name: "deliverableOptions",
    value: deliverableString,
    onChange: (val) => {
      setDeliverableString(val as TimeStringType);
    },
  });
  const expirationGroup = getExpirationRootProps();
  const deliverableGroup = getDeliverableRootProps();

  const { data, loading, error } = useQuery<
    LookupTwitterHandle,
    LookupTwitterHandleVariables
  >(LOOKUP_TWITTER_HANDLE, {
    fetchPolicy: "network-only",
    variables: {
      handle: twitterHandle,
    },
  });

  const [
    createBounty,
    { loading: isCreatingBounty, error: errorCreatingBounty },
  ] = useMutation<CreateBountyType, CreateBountyVariables>(CREATE_BOUNTY);

  const profile = data?.lookupTwitterHandle || null;
  const { board } = profile || {};
  const { id: board_id } = board || {};

  // only pass the twitter handle if we can't fetch a user.
  let twitter_handle: string | null = profile?.twitter_handle || twitterHandle;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pitch, setPitch] = useState("");
  const [resX, setResX] = useState(2000);
  const [resY, setResY] = useState(2000);
  const [max, setMax] = useState(1);
  const [reserve, setReserve] = useState(0.1);
  const [initial, setInitial] = useState(20);
  const [final, setFinal] = useState(40);
  const [bonus, setBonus] = useState(20);

  return loading ? (
    <Text>Loading...</Text>
  ) : (
    <VStack direction="column" alignItems="flex-start">
      <FormLabel variant="metadataLabelLg" htmlFor="bountyTitle">
        Title
      </FormLabel>
      <Input
        id="bountyTitle"
        placeholder="Title of Bounty"
        value={title}
        onChange={(e) => {
          setTitle(e.currentTarget.value);
        }}
      />

      <FormLabel variant="metadataLabelLg" htmlFor="bountyDescription">
        Description
      </FormLabel>
      <Textarea
        id="bountyDescription"
        placeholder="Description of Bounty"
        value={description}
        onChange={(e) => {
          setDescription(e.currentTarget.value);
        }}
      />

      <FormLabel variant="metadataLabelLg" htmlFor="bountyPitch">
        Pitch
      </FormLabel>
      <Input
        id="bountyPitch"
        placeholder="youtube link"
        value={pitch}
        onChange={(e) => {
          setPitch(e.currentTarget.value);
        }}
      />

      <FormLabel variant="metadataLabelLg" htmlFor="bountyResX">
        Resolution (Width)
      </FormLabel>
      <Input
        id="bountyResX"
        type="number"
        placeholder="2000"
        value={resX}
        onChange={(e) => {
          setResX(e.currentTarget.valueAsNumber);
        }}
      />

      <FormLabel variant="metadataLabelLg" htmlFor="bountyResY">
        Resolution (Height)
      </FormLabel>
      <Input
        id="bountyResY"
        type="number"
        placeholder="2000"
        value={resY}
        onChange={(e) => {
          setResY(e.currentTarget.valueAsNumber);
        }}
      />

      <FormLabel variant="metadataLabelLg" htmlFor="bountyMax">
        Maximum Bounty
      </FormLabel>
      <Input
        id="bountyMax"
        type="number"
        placeholder="15ETH"
        value={max}
        onChange={(e) => {
          setMax(e.currentTarget.valueAsNumber);
        }}
      />

      <FormLabel variant="metadataLabelLg" htmlFor="bountyReserve">
        Reserve Price
      </FormLabel>
      <Input
        id="bountyReserve"
        type="number"
        placeholder="1ETH"
        value={reserve}
        onChange={(e) => {
          setReserve(e.currentTarget.valueAsNumber);
        }}
      />

      <FormLabel variant="metadataLabelLg" htmlFor="bountyResY">
        Expiration Date
      </FormLabel>
      <HStack {...expirationGroup}>
        {bountyExpirationOptions.map((value) => {
          const radio = getExpirationRadioProps({ value });
          return (
            <RadioCard key={value} value={expirationString} {...radio}>
              {value}
            </RadioCard>
          );
        })}
      </HStack>

      <FormLabel variant="metadataLabelLg" htmlFor="bountyResY">
        Deliverable Date
      </FormLabel>
      <HStack {...deliverableGroup}>
        {bountyDeliverableOptions.map((value) => {
          const radio = getDeliverableRadioProps({ value });
          return (
            <RadioCard key={value} value={deliverableString} {...radio}>
              {value}
            </RadioCard>
          );
        })}
      </HStack>

      <FormLabel variant="metadataLabelLg" htmlFor="initialPct">
        Initial Payout
      </FormLabel>
      <Input
        id="initialPct"
        type="number"
        value={initial}
        onChange={(e) => {
          setReserve(Math.round(e.currentTarget.valueAsNumber));
        }}
      />
      <FormLabel variant="metadataLabelLg" htmlFor="finalPct">
        Final Payout
      </FormLabel>
      <Input
        id="finalPct"
        type="number"
        value={final}
        onChange={(e) => {
          setReserve(Math.round(e.currentTarget.valueAsNumber));
        }}
      />
      <FormLabel variant="metadataLabelLg" htmlFor="bonusPct">
        Bonus Structure
      </FormLabel>
      <Input
        id="bonusPct"
        type="number"
        value={bonus}
        onChange={(e) => {
          setReserve(Math.round(e.currentTarget.valueAsNumber));
        }}
      />

      <Button
        isLoading={isCreatingBounty}
        loadingText="Submitting"
        colorScheme="teal"
        variant="outline"
        onClick={async () => {
          try {
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
                },
                block_metadata: {
                  maxValue: max,
                  reservePrice: reserve,
                  pctCreatorInitialDisbursement: initial,
                  pctCreatorFinalDisbursement: final,
                  bonusTargets: [bonus, bonus],
                  bonusPctYeasNeeded: [50, 50],
                  bonusFailureThresholds: [1, 1],
                  mustBeClaimedTime:
                    Math.floor(Date.now() / 1000) +
                    getSecondsFromTimeString(expirationString),
                  timeLimit: getSecondsFromTimeString(deliverableString),
                },
              },
            });
            if (bountyResp.data?.createBounty) {
              router.push(
                `/${twitter_handle}/${bountyResp.data?.createBounty?.id}`
              );
            }
          } catch (e: any) {
            alert("Something went wrong!");
          }
        }}
      >
        {isCreatingBounty ? "Creating..." : "Create"}
      </Button>
    </VStack>
  );
}

export default CreateBounty;
