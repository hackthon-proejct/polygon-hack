import { Text, Box, Flex, Link, Image } from "@chakra-ui/react";
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import { getReadableStatus } from "@utils/bounty";
import { BountyDataType } from "@utils/types";
import { getImageUrlFromYoutube } from "@utils/youtube";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import BountyRejectButton from "./BountyRejectButton";

type Props = {
  bounty: BountyQuery_bounty;
};

export function BountyPreview({ bounty }: Props) {
  const { title, pitch, description } = bounty.metadata;
  const imageUrl = getImageUrlFromYoutube(pitch);
  return (
    <Flex direction="column" sx={styles.container}>
      <Box role="group" position="relative">
        <NextLink href={`/${bounty.creator_id}/${bounty.id}`} passHref>
          <Link>
            <Image alt="" src={imageUrl!} />
          </Link>
        </NextLink>
        <Box _groupHover={styles.hoverButton} sx={styles.rejectContainer}>
          <BountyRejectButton bounty={bounty} sx={styles.rejectButton} />
        </Box>
        <Box sx={styles.status}>
          <Text>{getReadableStatus(bounty.status)}</Text>
        </Box>
      </Box>
      <Flex sx={styles.metadata}>
        <Box sx={styles.image}>
          <Image
            alt=""
            src={`https://unavatar.io/twitter/${bounty.creator_handle}`}
          />
        </Box>
        <Flex
          direction="column"
          sx={styles.textMetadata}
          alignItems="flex-start"
        >
          <Text variant="bountyPreviewTitle">{title}</Text>
          <Text variant="bountyPreviewSubtitle">{description}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

const styles = {
  hoverButton: { display: "flex" },
  rejectContainer: {
    display: "none",
  },
  container: { maxWidth: "320px", boxShadow: "0px 0px 20px rgba(0,0,0,0.12)" },
  // TODO: hardcoded to webkit
  description: {
    display: "WebkitBox",
    WebkitLineClamp: "3",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  metadata: { padding: "16px 0 20px 0" },
  textMetadata: { padding: "0 20px 0 8px", minWidth: 0 },
  image: {
    backgroundColor: "white",
    flexShrink: 0,
    "&>img": {
      height: "60px",
      width: "60px",
      borderRadius: "30px",
    },
    padding: "0 12px ",
    display: "flex",
    alignItems: "flex-start",
    textAlign: "center",
    maxWidth: "150px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    borderRadius: "4px",
  },
  rejectButton: {
    position: "absolute",
    top: "12px",
    right: "12px",
  },
  status: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    position: "absolute",
    top: 0,
    padding: "12px",
    width: "120px",
    textAlign: "center",
  },
};
