const Button = {
  // The styles all button have in common
  baseStyle: {},
  // Two sizes: sm and md
  sizes: {},
  // Two variants: outline and solid
  variants: {
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
