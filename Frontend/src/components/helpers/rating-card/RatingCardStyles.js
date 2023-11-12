
const row = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};
const column = {
    ...row,
    flexDirection: "column"
};

const text = {
    margin: "0",
    padding: "0",
    fontWeight: "bold",
};

const styles = theme => ({
    root: {
        position: 'relative',
        borderRadius: '50%',
        width: "200px",
        height: "200px",
        background: `#707070 linear-gradient(to right, #0077FF 0%, #0077FF 100%) no-repeat`,
        transition: `background-size 0.3s ease`,
        transform: `rotate(180deg)`,
        ...row,
        justifyContent: "center",
        padding: "4px",
    },
    innerDiv: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        borderRadius: "50%"
    },
    content: {
        transform: `rotate(180deg)`,
        ...column,
        justifyContent: "center",
        widht: "90%",
        height: "90%"
    },
    pill: {
        width: "50%",
        margin:"0"
    },
    title: {
        "&.MuiTypography-root": {
            ...text,
            color:"#AAAEB3",
            fontSize:"small"
        },
    },
    status: {
        "&.MuiTypography-root": {
            ...text,
        },
    },
});

export default styles;