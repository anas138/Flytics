import { withStyles } from '@mui/styles';
import React from 'react';
import styles from './RatingPillStyles';

function RatingPill(props) {
    const { classes } = props;
    const { rating } = props;
    const getClassName = () => {
        if (rating >= 8) return 'goodRating';
        else if (rating < 8 && rating >= 6) return 'averageRating';
        else return 'badRating';
    };
    return (
        <div className={classes[getClassName()]}>
            <p>{rating}</p>
        </div>
    );
}

export default withStyles(styles)(RatingPill);