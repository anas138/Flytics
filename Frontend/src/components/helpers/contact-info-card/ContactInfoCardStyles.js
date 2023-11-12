
const row = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

const styles = them => ({
    root:{
        width:"98%",
        // border:`1px solid #707070`,
        borderRadius:"4px",
        backgroundColor:"#F6F6F6",
        padding:"5px"
    },
    iconContainer: {
        width: "40px",
        height: "40px",
        backgroundColor: "#0077FF",
        borderRadius: "50%",
        ...row,
        justifyContent: "center",
        color: "white",
    },
    infoRow:{
        ...row,
        width:"100%",
        margin:"5px",
        padding:"2px",
        justifyContent:"flex-start",
        "& *":{
            margin:"auto 5px",
        },
    },
});

export default styles;