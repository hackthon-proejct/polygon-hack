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
import { stringNumToJS } from "@utils/bounty";
import { SubmissionsForBounty_submissionsForBounty } from "@gql/__generated__/SubmissionsForBounty";
import { useRouter } from "next/router";
import MintButton from "./MintButton";

type Props = {
  bounty: BountyQuery_bounty;
  currSubmission: SubmissionsForBounty_submissionsForBounty | null;
  allSubmissions: any[];
};

const fr = IS_SERVER ? null : new FileReader();

export default function Mint({
  bounty,
  currSubmission,
  allSubmissions,
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
  return (
    <Flex
      direction="column"
      mt="36px"
      spacing="12px"
      maxWidth="80%"
      margin="auto"
      alignItems="center"
    >
      {isCreator ? (
        <>
          <Heading my="12px">Mint your NFT</Heading>
          <Text textAlign="center" fontSize="24px">
            You&apos;ve made it to the final step!
          </Text>
          <Text textAlign="center" fontSize="24px" pb="12px">
            Mint your NFT below to receive your final bonus
          </Text>
          <Image
            mt="24px"
            py="80px"
            src={currSubmission?.metadata?.image_url}
            width="100%"
            boxShadow="rgb(0 0 0 / 8%) 0px 1px 12px !important"
            px={{ sm: "32px", md: "80px" }}
          />
          <MintButton
            mt="40px"
            submissionId={currSubmission?.id}
            onSuccess={(data) => {
              router.reload();
            }}
          />
        </>
      ) : (
        <>
          <Heading my="12px">Awaiting NFT...</Heading>
          <Text textAlign="center" fontSize="24px">
            The NFT is ready to mint! We&apos;re still waiting on the creator to
            mint their artwork.
          </Text>
          <Image
            mt="24px"
            py="80px"
            src={currSubmission?.metadata?.image_url}
            width="100%"
            boxShadow="rgb(0 0 0 / 8%) 0px 1px 12px !important"
            px={{ sm: "32px", md: "80px" }}
          />
        </>
      )}
    </Flex>
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
