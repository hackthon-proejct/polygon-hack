import { Flex, CSSObject, Spacer } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import theme from "src/theme";
import Logo from "./logo/Logo";
import MetaMaskButton from "./MetamaskButton";

function StickyHeader({}: PropsWithChildren<{}>) {
  return (
    <Flex sx={styles.sticky}>
      <Logo type="dynamic" />
      <Spacer />
      <MetaMaskButton />
    </Flex>
  );
}

const styles = {
  sticky: {
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
    backgroundColor: theme.colors.white,
  },
};

export default StickyHeader;
