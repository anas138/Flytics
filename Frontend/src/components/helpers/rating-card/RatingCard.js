import { Typography } from '@mui/material';
import { withStyles } from '@mui/styles';
import React from 'react';
import RatingPill from '../rating-pill/RatingPill';
import styles from './RatingCardStyles';

function RatingCard(props) {
    const { classes } = props;
    const { rating } = props;
    const getStatus = () => {
        if (rating >= 8) return 'Good';
        else if (rating < 8 && rating >= 6) return 'Average';
        else return 'Bad';
    };
    return (
        <div className={classes.root} style={{ backgroundSize: `${rating * 10}% 100%` }}>
            <div className={classes.innerDiv}>
                <div className={classes.content}>
                    <Typography className={classes.title}>Rating</Typography>
                    <div className={classes.pill}>
                        <RatingPill rating={rating} />
                    </div>
                    <Typography className={classes.status}>{getStatus()}</Typography>
                </div>
            </div>
        </div>
    );
}

export default withStyles(styles)(RatingCard);