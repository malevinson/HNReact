import React from 'react';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Button, IconButton, makeStyles } from '@material-ui/core';
import { ArrowUpward, ArrowDownward, Brightness4, Brightness7 } from '@material-ui/icons';
import { UI_CONFIG } from '../utils/constants';

const useStyles = makeStyles((theme) => ({
    controlsContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: theme.spacing(2),
        padding: theme.spacing(1.5, 2),
        backgroundColor: theme.palette.background.paper,
        marginBottom: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '1fr',
            gap: theme.spacing(0.25),
            padding: theme.spacing(0.5, 0.75),
            marginBottom: theme.spacing(0.25),
        },
    },
    leftColumn: {
        display: 'flex',
        justifyContent: 'flex-start',
        gap: theme.spacing(1),
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            justifyContent: 'stretch',
            gap: theme.spacing(0.5),
        },
    },
    centerColumn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightColumn: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
            width: '100%',
        },
    },
    themeToggle: {
        padding: theme.spacing(0.75),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(0.5),
            fontSize: '1.2rem',
        },
        '& .MuiSvgIcon-root': {
            [theme.breakpoints.down('sm')]: {
                fontSize: '1.2rem',
            },
        },
    },
    formControl: {
        minWidth: 120,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            minWidth: 'auto',
        },
        '& .MuiInputBase-root': {
            fontSize: '0.875rem',
            height: '36px',
            [theme.breakpoints.down('sm')]: {
                fontSize: '0.7rem',
                height: '28px',
            },
        },
        '& .MuiInputLabel-root': {
            fontSize: '0.875rem',
            [theme.breakpoints.down('sm')]: {
                fontSize: '0.7rem',
            },
        },
    },
    sortSection: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
            gap: theme.spacing(0.25),
        },
    },
    sortLabel: {
        fontSize: '0.875rem',
        fontWeight: 600,
        color: theme.palette.text.primary,
        whiteSpace: 'nowrap',
        margin: 0,
        lineHeight: '36px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.7rem',
            lineHeight: '1',
            marginBottom: theme.spacing(0.125),
        },
    },
    buttonGroup: {
        display: 'flex',
        gap: theme.spacing(0.5),
        flexWrap: 'wrap',
        [theme.breakpoints.down('sm')]: {
            gap: theme.spacing(0.25),
            justifyContent: 'center',
        },
    },
    sortButton: {
        fontSize: '0.875rem',
        fontWeight: 600,
        textTransform: 'none',
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(0.625, 1.25),
        minHeight: '36px',
        lineHeight: '36px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.7rem',
            padding: theme.spacing(0.25, 0.75),
            minHeight: '28px',
            lineHeight: '28px',
            margin: 0,
        },
    },
    activeButton: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    },
}));

const Controls = ({ showCount, activeButton, sortDirectionUp, themeType, dateFilter, onSelectChange, onDateFilterChange, onButtonClick, onThemeToggle }) => {
    const classes = useStyles();
    
    return (
        <Box className={classes.controlsContainer}>
            <Box className={classes.leftColumn}>
                <FormControl 
                    variant="outlined" 
                    className={classes.formControl}
                    size="small"
                >
                    <InputLabel id="show-count-label">Show</InputLabel>
                    <Select
                        labelId="show-count-label"
                        value={showCount}
                        onChange={onSelectChange}
                        label="Show"
                    >
                        {UI_CONFIG.select.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl 
                    variant="outlined" 
                    className={classes.formControl}
                    size="small"
                >
                    <InputLabel id="date-filter-label">Date</InputLabel>
                    <Select
                        labelId="date-filter-label"
                        value={dateFilter}
                        onChange={onDateFilterChange}
                        label="Date"
                    >
                        {UI_CONFIG.dateFilter.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            
            <Box className={classes.centerColumn}>
                <Box className={classes.sortSection}>
                    <Typography className={classes.sortLabel}>
                        SORT BY:
                    </Typography>
                    <Box className={classes.buttonGroup}>
                        {UI_CONFIG.buttons.map(button => {
                            const isActive = button.name === activeButton;
                            return (
                                <Button
                                    key={button.name}
                                    onClick={() => onButtonClick(button.name)}
                                    className={`${classes.sortButton} ${isActive ? classes.activeButton : ''}`}
                                    variant={isActive ? 'contained' : 'outlined'}
                                    size="small"
                                    startIcon={
                                        isActive ? (
                                            sortDirectionUp ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                                        ) : null
                                    }
                                >
                                    {button.name}
                                </Button>
                            );
                        })}
                    </Box>
                </Box>
            </Box>
            
            <Box className={classes.rightColumn}>
                <IconButton
                    onClick={onThemeToggle}
                    className={classes.themeToggle}
                    size="small"
                    aria-label="toggle theme"
                >
                    {themeType === 'dark' ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
            </Box>
        </Box>
    );
};

export default Controls;
