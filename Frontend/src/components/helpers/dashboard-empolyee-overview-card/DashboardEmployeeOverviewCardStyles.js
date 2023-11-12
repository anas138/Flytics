
const row = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

const column = {
    ...row,
    flexDirection: "column"
};

const select = {
    paddingLeft: "8px",
    paddingRight: "8px",
    border: `1px solid #EDEDED`,
    borderRadius: "4px",
    backgroundColor: "white",
    height: "38px",
    width: "95%",
    "&:hover": {
        cursor: "pointer",
    },
};

const styles = theme => ({
    root: {
        width:"98%",
        position: "relative",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "rgba(33, 35, 38, 0.1) 8px 10px 8px -8px",
        padding: "5px",
        height: "98%",
        [theme.breakpoints.down(1366)]:{
            height:"fit-content",
        },
    },
    tabStrip: {
        width: "6px",
        maxWidth: "6px",
        height: "40px",
        backgroundColor: "#0077FF",
        position: "absolute",
        left: "0",
        top: "4%",
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
    cardDataContainer: {
        ...column,
        width: "100%",
    },
    cardFilterDataSelect: {
        ...row,
        ...select,
        position: "relative",
        [theme.breakpoints.down(1366)]:{
            width:"90%",
        },
    },
    selectOptions: {
        ...select,
        color: "black",
        position: "absolute",
        top: "110%",
        left: "0",
        width: "100%",
        height: "auto",
        maxHeight: "160px",
        overflowY: "auto",
    },
    hidden: { display: "none" },
    employeeInfoContainer: {
        ...column,
        width: "98%",
        height: "64%",
        border: '1px solid #EDEDED',
        borderRadius: "4px",
        justifyContent: "flex-start",
        margin: "1% auto"
    },
    infoCardTopRow: {
        ...row,
        width: "98%",
        padding: "5px",
        margin: "5px auto"
    },
    infoRow: {
        ...row,
        width: "85%",
        padding: "5px"
    },
    infoColumn: {
        ...column,
        alignItems: "flex-start"
    },
    infoHeading: {
        "&.MuiTypography-root": {
            padding: "0",
            margin: "0",
            marginTop: "5px",
            color: "#AAAEB3",
            letterSpacing: "2px",
            fontWeight: "bold",
            fontSize: "small"
        },
    },
    infoText: {
        "&.MuiTypography-root": {
            padding: "0",
            margin: "0",
        },
    },
    ratingCardContainer: {
        margin: "5px auto",
        width: "100%",
        ...column,
    },
    statsContainer: {
        ...row,
        justifyContent: "space-around",
        width: "98%",
        padding: "5px",
        height: "20%",
        "& *": {
            width: "32%",
            margin: "auto 5px",
        },
    },
});

export default styles;