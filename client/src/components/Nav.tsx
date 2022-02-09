import {
  Text,
  Flex,
  CSSObject,
  Spacer,
  Link,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import theme from "src/theme";
import Logo from "./logo/Logo";
import MetaMaskButton from "./MetamaskButton";
import NextLink from "next/link";
import { useAppSelector } from "@redux/hooks";
import { selectTwitterHandle, selectUserId } from "@redux/slices/userSlice";
import { Camera } from "react-feather";
import DiscordLogo from "./DiscordLogo";

function StickyHeader({}: PropsWithChildren<{}>) {
  const userId = useAppSelector(selectUserId);
  console.log(userId);
  const handle = useAppSelector(selectTwitterHandle);
  return (
    <Flex sx={styles.sticky}>
      <NextLink href={`/`} passHref>
        <Link>
          <Logo type="dynamic" />
        </Link>
      </NextLink>
      <Spacer />
      {userId ? (
        <Text fontSize="24px">{handle ? `@${handle}` : "Anonymous User"}</Text>
      ) : null}
      <Spacer />
      <Button mr="12px" aria-label="Reject Bounty" bg="#5865F2">
        <DiscordLogo
          size={20}
          color="white"
          onClick={() => {
            window.open("https://discord.gg/rFghjfWMKY", "_blank");
          }}
        />
      </Button>
      <MetaMaskButton />
    </Flex>
  );
}

const styles = {
  sticky: {
    zIndex: 100000,
    top: 0,
    left: 0,
    position: "fixed",
    right: 0,
    alignItems: "center",

    boxShadow: "rgb(0 0 0 / 8%) 0px 1px 12px !important",
    padding: {
      sm: "0 32px",
      md: "0 80px",
    },
    height: {
      sm: "52px",
      md: "80px",
    },
    backgroundColor: theme.colors.bountyHeaderGreen,
  },
};

export default StickyHeader;
