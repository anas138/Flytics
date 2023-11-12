
const percentageRing = {
    border: `2px solid`,
    borderRadius: "50%",
    padding: "5px",
    width: "45px",
    height: "45px",
    textAlign:"center",
    "& p": {
        whitespace: "nowrap"
    },
};

const styles = theme => ({
    goodPercentage: {
        ...percentageRing,
        borderColor: "#1DE9B6",
    },
    averagePercentage: {
        ...percentageRing,
        borderColor: "#F2C203",
    },
    badPercentage: {
        ...percentageRing,
        borderColor: "#F4542B",
    },
});

export default styles;