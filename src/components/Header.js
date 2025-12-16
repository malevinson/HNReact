import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    appBar: {
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        boxShadow: theme.shadows[2],
    },
    toolbar: {
        minHeight: '48px !important',
        height: '48px',
        padding: theme.spacing(0, 2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        flexGrow: 1,
        fontWeight: 700,
        letterSpacing: '1px',
        fontSize: '1.1rem',
        lineHeight: '1.1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

const Header = () => {
    const classes = useStyles();
    
    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolbar} disableGutters>
                <Typography variant="h6" className={classes.title} component="div">
                    VISUAL HACKER NEWS
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;

