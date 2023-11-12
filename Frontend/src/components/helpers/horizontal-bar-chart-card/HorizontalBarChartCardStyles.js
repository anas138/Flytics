
const row = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

const column = {
    ...row,
    flexDirection: "column"
};

const styles = theme => ({
    root: {
        position: "relative",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "rgba(33, 35, 38, 0.1) 8px 10px 8px -8px",
        padding: "5px",
        height: "98%",
        ...column,
    },
    tabStrip: {
        width: "6px",
        maxWidth: "6px",
        height: "40px",
        backgroundColor: "#0077FF",
        position: "absolute",
        left: "0",
        top: "6%",
    },
    cardTopRow: {
        ...row,
        width: "100%",
    },
    cardTitile: {
        "&.MuiTypography-root": {
            padding: "5px",
            margin: "5px",
            fontSize: "larger"
        },
    },
    chartContainer: {
        padding: "5px",
        overflow: "auto",
        width: "98%",
        height: "80%",
        padding:"5px",
        ...column,
        justifyContent:"center",
        "& > div":{
            width:"85% !important",
            height:"95% !important",
        },
    },
});

export default styles;