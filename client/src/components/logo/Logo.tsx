import { Flex, Text } from "@chakra-ui/react";
import { cx } from "@chakra-ui/react";
import SVGLogo from "./SVGLogo";
import { useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import theme from "src/theme";

enum LogoType {
  icon = "icon",
  text = "text",
  full = "full",
  // it will dynamically only show the icon on the tablet or mobile
  dynamic = "dynamic",
}

type LogoTypeString = keyof typeof LogoType;

type Props = { type: LogoTypeString };

export default function Logo({ type }: Props) {
  const [svgSize, setSvgSize] = useState(0);
  const breakpointSize = useBreakpointValue({ base: 28, sm: 28, md: 40 });
  useEffect(() => {
    // bug with breakpointSize and SSR
    setSvgSize(breakpointSize || 0);
  }, [breakpointSize]);

  switch (type) {
    case LogoType.text:
      return (
        <Flex sx={styles.logo}>
          <Text sx={styles.logoText}>bounty</Text>
          <sup>
            <>&alpha;</>
          </sup>
        </Flex>
      );
    case LogoType.full:
      return (
        <Flex sx={styles.logo}>
          <SVGLogo size={svgSize} sx={styles.logoIconWithText} />
          <Text sx={styles.logoText}>bounty</Text>
          <Text as="sup" sx={styles.logoSuperscript}>
            &alpha;
          </Text>
        </Flex>
      );
    case LogoType.dynamic:
      return (
        <Flex sx={styles.logo}>
          <SVGLogo size={svgSize} sx={styles.logoIconWithText} />
          <Text sx={{ ...styles.logoText, ...styles.dynamicHidden }}>
            bounty
          </Text>
          <Text
            as="sup"
            sx={{ ...styles.logoSuperscript, ...styles.dynamicHidden }}
          >
            &alpha;
          </Text>
        </Flex>
      );
    case LogoType.icon:
      return (
        <Flex sx={styles.logo}>
          <SVGLogo size={svgSize} />
        </Flex>
      );
    default:
      throw new Error(`Improper string used for logo type: ${type}`);
  }
}

const styles = {
  logo: {
    fontFamily: '"Averia Sans Libre", cursive',
    color: theme.colors.bountyBrownDark,
  },
  logoIconWithText: {
    ".bounty-svglogo": {
      marginRight: "8px",
    },
  },
  logoText: {
    display: "flex",
    alignItems: "center",
    fontSize: "28px",
  },
  logoSuperscript: {
    verticalAlign: "super",
    fontSize: "100%",
    alignSelf: "baseline",
    marginLeft: "4px",
    lineHeight: "initial",
    top: 0,
  },
  dynamicHidden: {
    display: { sm: "none", md: "block" },
  },
};
