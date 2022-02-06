import { BountyStatus } from "@shared/enums";
import {
  Textarea,
  Box,
  Button,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  Flex,
  Image,
  HStack,
} from "@chakra-ui/react";
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import { useAppSelector, useAppDispatch } from "@redux/hooks";
import * as Icon from "react-feather";

import { selectUserId } from "@redux/slices/userSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import { IS_SERVER } from "@utils/constants";
import SubmitButton from "./SubmitButton";
import { stringNumToJS, VotingState } from "@utils/bounty";
import { SubmissionsForBounty_submissionsForBounty } from "@gql/__generated__/SubmissionsForBounty";
import { useRouter } from "next/router";

type Props = {
  bounty: BountyQuery_bounty;
  votingState: VotingState;
  currSubmission: SubmissionsForBounty_submissionsForBounty | null;
};

const fr = IS_SERVER ? null : new FileReader();

export default function CreatorSubmit({
  bounty,
  votingState,
  currSubmission,
}: Props) {
  const router = useRouter();
  const uploadRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const loggedInUserId = useAppSelector(selectUserId);
  const isCreator = bounty.creator_id === loggedInUserId;

  const bonusTarget = Number(votingState.votingOn) + 1;

  useEffect(() => {
    function handleImageLoaded() {}
    function handleFileReader() {
      // convert image file to base64 string
      if (imgRef.current != null && fr?.result != null) {
        imgRef.current.src = fr?.result as string;
        imgRef.current.addEventListener("load", handleImageLoaded);
      }
    }
    fr?.addEventListener("load", handleFileReader, false);
    const currentImgRef = imgRef.current;
    return () => {
      fr?.removeEventListener("load", handleFileReader);
      currentImgRef?.removeEventListener("load", handleImageLoaded);
    }; // ... and to false on unmount
  }, []);
  const onUploadRefChanged = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (uploadRef.current?.files && uploadRef.current?.files[0] != null) {
        setFile(uploadRef.current?.files[0]);
        fr?.readAsDataURL(uploadRef.current?.files[0]);
      }
    },
    [setFile]
  );
  console.log(currSubmission);
  return currSubmission?.metadata?.milestone ===
    Number(votingState.votingOn) ? (
    <VStack>
      <Heading my="12px">
        Vote in progress:{" "}
        <Heading as="span" variant="metadataLabelLg" mr="12px">
          Bonus Target {bonusTarget}.
        </Heading>
      </Heading>
      <Text textAlign="center" fontSize="24px">
        {`Funders are currently voting on your submission for `}

        <Text as="span" variant="metadataLabelLg" mr="12px">
          Bonus Target {bonusTarget}.
        </Text>
      </Text>
      <Text textAlign="center" fontSize="24px" pb="12px">
        You&apos;ll be able to submit again when the vote is finished!
      </Text>
      <Image
        alt=""
        src={currSubmission?.metadata?.image_url || ""}
        width="100%"
        boxShadow="rgb(0 0 0 / 8%) 0px 1px 12px !important"
        px={{ sm: "32px", md: "80px" }}
      />
    </VStack>
  ) : (
    <VStack
      direction="column"
      mt="36px"
      spacing="12px"
      maxWidth="80%"
      margin="auto"
    >
      <Heading my="12px">
        Submit{" "}
        <Text as="span" fontWeight="500">
          a revision for:
        </Text>{" "}
        Bonus Target {bonusTarget}
      </Heading>
      <Text textAlign="center" fontSize="24px" pb="12px">
        Ready to get your next bonus? Submit a new revision below for review!
        Funders will have <b>48 hours</b> to vote and decide whether your
        submission is worthy of a bonus.
      </Text>
      <VStack
        direction="column"
        alignItems="flex-start"
        mt="36px"
        spacing="12px"
        maxWidth="80%"
        margin="auto"
      >
        <Flex alignItems="center" py="18px">
          <VStack>
            <HStack>
              <Text variant="metadataLabelLg" mr="12px">
                Bonus Target {bonusTarget}:
              </Text>
              <Text variant="metadataLabelLg" fontSize="36px">
                {stringNumToJS(votingState.bonusValue)} MATIC (
                {votingState.bonusPct}%)
              </Text>
            </HStack>
          </VStack>
        </Flex>
        <Box sx={styles.upload}>
          <FormLabel
            htmlFor="file-upload"
            sx={styles.inputFilePickerTarget}
            m={0}
          >
            <Image cursor="pointer" ref={imgRef} />
            {file == null && (
              <VStack
                sx={styles.inputFilePickerControls}
                backgroundImage="url(${imgSrc})"
              >
                {<Icon.Image size={50} />}
                <Text>Click to upload</Text>
              </VStack>
            )}
          </FormLabel>
          <input
            id="file-upload"
            ref={uploadRef}
            type="file"
            accept="image/png, image/jpeg"
            onChange={onUploadRefChanged}
          />
        </Box>
        <Text variant="metadataLabelLg" mr="12px">
          Submission Summary:
        </Text>
        <Textarea
          placeholder="Summary of submission"
          value={description}
          onChange={(e) => {
            setDescription(e.currentTarget.value);
          }}
        />
        <Text variant="metadataLabelLg" mr="12px">
          Name:
        </Text>
        <Input
          type="text"
          placeholder="Name your piece"
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
        />
      </VStack>
      <SubmitButton
        disabled={file == null || description === ""}
        milestone={Number(votingState.votingOn)}
        bountyId={bounty.id}
        description={description}
        metadata={{ name: name }}
        imageFile={file!}
        onSuccess={(data) => {
          router.reload();
        }}
      />
    </VStack>
  );
}

const styles = {
  upload: {
    width: "100%",
    minHeight: "300px",
    'input[type="file"]': {
      display: "none",
    },

    boxShadow: "0px 0px 0px 1px rgba(0, 0, 0, 0.2)",
    transition: "box-shadow 0.05s linear, opacity 0.05s linear",

    "&:hover": {
      boxShadow: "0px 0px 0px 2px rgba(0, 0, 0, 0.2)",
      opacity: 1,
    },
  },
  inputFilePickerTarget: {
    width: "100%",
    height: "100%",
    display: "flex",
    position: "relative",
  },
  inputFilePickerControls: {
    width: "100%",
    height: "100%",
    minHeight: "300px",
    padding: "6px 12px",
    cursor: "pointer",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    opacity: 0.6,

    "&::before": {
      content: '""',
      backgroundSize: "cover",
      position: "absolute",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
      opacity: 0.1,
    },
  },
};
