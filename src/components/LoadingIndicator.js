import React from 'react';
import { Box, Typography, CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(4),
        minHeight: '200px',
    },
    text: {
        marginTop: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
}));

const LoadingIndicator = () => {
    const classes = useStyles();
    
    return (
        <Box className={classes.container}>
            <CircularProgress size={48} />
            <Typography variant="body1" className={classes.text}>
                Loading stories...
            </Typography>
        </Box>
    );
};

export default LoadingIndicator;

