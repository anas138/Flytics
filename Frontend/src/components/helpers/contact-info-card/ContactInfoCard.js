import { Divider, Typography } from '@mui/material';
import { withStyles } from '@mui/styles';
import React from 'react';
import { MailIcon, PhoneIcon, TimeIcon } from '../../../resources/design-icons/contact-card-icons';
import styles from "./ContactInfoCardStyles";

function ContactInfoCard(props) {
    const { classes } = props;
    const { contactNo, email, timeSlotStart, timeSlotEnd } = props;
    return (
        <div className={classes.root}>
            <div className={classes.infoRow}>
                <div className={classes.iconContainer}>
                    <PhoneIcon />
                </div>
                <Typography>{contactNo}</Typography>
            </div>
            <Divider />
            <div className={classes.infoRow}>
                <div className={classes.iconContainer}>
                    <MailIcon />
                </div>
                <Typography>{email}</Typography>
            </div>
            <Divider />
            <div className={classes.infoRow}>
                <div className={classes.iconContainer}>
                    <TimeIcon />
                </div>
                <Typography>{timeSlotStart} - {timeSlotEnd}</Typography>
            </div>
        </div>
    );
}

export default withStyles(styles)(ContactInfoCard);