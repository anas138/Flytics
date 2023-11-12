import { Typography } from '@mui/material';
import { withStyles } from '@mui/styles';
import React from 'react';
import styles from './StatsCardStyles';

function StatsCard(props) {
    const { classes } = props;
    const { statTitle, statValue, statInfo } = props;
    return (
        <div className={classes.root}>
            <div className={classes.row}>
                <Typography className={classes.statTitle}>{statTitle}</Typography>
            </div>
            <div className={classes.statValueContainer}>
                {statValue}
            </div>
            <div className={classes.row}>
                <Typography className={classes.statInfo}>{statInfo}</Typography>
            </div>
        </div>
    );
}

export default withStyles(styles)(StatsCard);