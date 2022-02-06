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
    bountyYellow: "#FFE6AD",
  },
});

export default theme;
