const Button = {
  // The styles all button have in common
  baseStyle: {
    lineHeight: "initial",
  },
  // Two sizes: sm and md
  sizes: {},
  // Two variants: outline and solid
  variants: {
    reject: {
      bg: "red.400",
      color: "white",
    },
    outline: {
      // border: "2px solid",
      // borderColor: "purple.500",
      // color: "purple.500",
    },
    solid: {
      bg: "bountyGreen",
      color: "white",
    },
    ghost: {},
    link: {},
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
    // variant: "outline",
  },
};

export default Button;
