const styles = (theme) => ({
  childPropContainer: {
    width: `calc(100vw - ${theme.drawer.width}px)`,
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight * 1.75}px)`,
    marginTop: theme.mixins.toolbar.minHeight *1.4,
    // margin: "0 auto",
    // marginRight:"5px",
    marginLeft: theme.drawer.width - 4,
    padding: "10px 0",
  },
});

export default styles;
