import { extendTheme } from "@chakra-ui/react";
import Button from "./button";

const theme = extendTheme({
  components: {
    Button,
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
    bountyGreenLightest: "#cbf5cf",
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
