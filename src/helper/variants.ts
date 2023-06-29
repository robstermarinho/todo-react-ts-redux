export const motionVariants = {
  initial: {
    opacity: 0,
    translateY: -50,
  },
  animate: {
    opacity: 1,
    translateY: 0,
    transition: {
      duration: 0.2,
    },
  },
  exit: { opacity: 0, translateX: -100 },
}
