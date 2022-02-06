import { extendTheme } from "@chakra-ui/react";
import Button from "./button";

const Text = {
  // The styles all button have in common
  baseStyle: {},
  // Two variants: outline and solid
  variants: {
    creatorPreviewTitle: {
      fontSize: "22px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      textAlign: "center",
      margin: "8px 0",
      maxWidth: "100%",
      // border: "2px solid",
      // borderColor: "purple.500",
      // color: "purple.500",
    },
    creatorPreviewSubtitle: {
      fontSize: "16px",
      // TODO: hardcoded to webkit
      display: "-webkit-box",
      WebkitLineClamp: "3",
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      marginTop: 0,
    },
    bountyPreviewTitle: {
      fontSize: "18px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      textAlign: "center",
      margin: "0 0 8px 0",
      maxWidth: "100%",
      // border: "2px solid",
      // borderColor: "purple.500",
      // color: "purple.500",
    },
    bountyPreviewSubtitle: {
      fontSize: "14px",
      // TODO: hardcoded to webkit
      display: "-webkit-box",
      WebkitLineClamp: "3",
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      marginTop: 0,
    },
  },
  // The default size and variant values
  defaultProps: {},
};

const theme = extendTheme({
  components: {
    Button,
    Text,
  },
  // mobile
  sm: "768px",
  // tablet
  md: "1024px",
  // desktop
  lg: "1216px",
  // fullhd
  xl: "1408px",
  colors: {
    bountyGreen: "#7DC794",
    bountyHeaderGreen: "#e8ffea",
    bountyGreenLightest: "#d9fae0",
    bountyGreenLighter: "#9be0a8",
    bountyGreenLight: "#8fd6a0",
    bountyYellow: "#FFE6AD",
    bountyBrownDark: "#5a2707",
    bountyBrownLight: "#f7dec9",
  },
  fonts: {
    body: "Josefin Sans, sans-serif",
    heading: "Josefin Sans, sans-serif",
  },
});

export default theme;
