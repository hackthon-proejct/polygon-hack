import { Flex, CSSObject, Spacer, Link } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import theme from "src/theme";
import Logo from "./logo/Logo";
import MetaMaskButton from "./MetamaskButton";
import NextLink from "next/link";

function StickyHeader({}: PropsWithChildren<{}>) {
  return (
    <Flex sx={styles.sticky}>
      <NextLink href={`/`} passHref>
        <Link>
          <Logo type="dynamic" />
        </Link>
      </NextLink>
      <Spacer />
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
