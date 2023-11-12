const row = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};
const column = {
    ...row,
    flexDirection: "column"
};
const text = {
    margin: "0",
    padding: "0",
    fontWeight: "bold",
    textAlign:"center"
};
const styles = theme => ({
    root: {
        ...column,
        justifyContent: "center"
    },
    row: {
        width: "fit-content !important",
        ...row,
    },
    statValueContainer: {
        borderRadius: "50%",
        padding: "2px",
        whiteSpace: "nowrap",
        border: `1px solid #F1F1F1`,
        width: "40px !important",
        height: "40px",
        ...row,
        justifyContent: "center",
        color: "#1DE9B6",
    },
    statTitle: {
        "&.MuiTypography-root": {
            ...text,
            color: "#AAAEB3",
            fontWeight: "normal"
        },
    },
    statInfo: {
        "&.MuiTypography-root": {
            ...text,
            color: "#0077FF",
            fontSize: "small",
            whiteSpace: "nowrap"
        },
    },
});

export default styles;