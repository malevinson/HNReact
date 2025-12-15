import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    appBar: {
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        boxShadow: theme.shadows[4],
    },
    title: {
        flexGrow: 1,
        fontWeight: 700,
        letterSpacing: '1px',
    },
}));

const Header = () => {
    const classes = useStyles();
    
    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h5" className={classes.title}>
                    VISUAL HACKER NEWS
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;

