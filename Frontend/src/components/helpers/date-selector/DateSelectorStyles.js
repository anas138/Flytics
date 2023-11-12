const styles = (theme) => ({
    inputField:{
        width:"170px",
        padding:"0.7em",
        backgroundColor:"transparent",
        border:`1px solid black`,
        borderRadius:"4px",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        minHeight:"3.5rem",
        "&:hover":{
            border:`1px solid black`,
            cursor:"pointer"
        },
    },
    icon:{
        //color:iconColor,
    },
    title:{
        position:"absolute",
        top:"-10%"
    },
    dateSelector:{
        "&.MuiOutlinedInput-input":{
            height:"38px"
        },
    },
});

export default styles;
