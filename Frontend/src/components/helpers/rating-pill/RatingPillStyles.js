
const ratingPill = {
    borderRadius: "15px",
    padding: "0px 5px",
    textAlign: "center",
    fontWeight:"bold",
    fontSize:"large",
    color:"white",
    "& p": {
        whiteSpace: "nowrap"
    },
};

const styles = theme => ({
    goodRating: {
        ...ratingPill,
        backgroundColor: "#1DE9B6",
    },
    averageRating: {
        ...ratingPill,
        backgroundColor: "#F2C203",
    },
    badRating: {
        ...ratingPill,
        backgroundColor: "#F4542B",
    },
});

export default styles;