import { withStyles } from '@mui/styles';
import React from 'react';
import styles from './PercentageCellStyles';

function PercentageCell(props) {
    const { classes } = props;
    const { percentage } = props;
    const getClassName = () => {
        if (percentage >= 80) return 'goodPercentage';
        else if (percentage < 80 && percentage >= 60) return 'averagePercentage';
        else return 'badPercentage';
    };
    return (
        <div className={classes[getClassName()]}>
            <p>{percentage} %</p>
        </div>
    );
}

export default withStyles(styles)(PercentageCell);