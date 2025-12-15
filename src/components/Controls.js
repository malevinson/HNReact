import React from 'react';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Button, makeStyles } from '@material-ui/core';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';
import { UI_CONFIG } from '../utils/constants';

const useStyles = makeStyles((theme) => ({
    controlsContainer: {
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.paper,
        marginBottom: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
    },
    selectContainer: {
        marginBottom: theme.spacing(3),
        minWidth: 150,
    },
    sortSection: {
        marginTop: theme.spacing(2),
    },
    sortLabel: {
        marginBottom: theme.spacing(1),
        fontWeight: 600,
        color: theme.palette.text.primary,
    },
    buttonGroup: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: theme.spacing(1),
        '& > *': {
            marginRight: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    },
    sortButton: {
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: theme.shape.borderRadius,
    },
    activeButton: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    },
}));

const Controls = ({ showCount, activeButton, sortDirectionUp, onSelectChange, onButtonClick }) => {
    const classes = useStyles();
    
    return (
        <Box className={classes.controlsContainer}>
            <FormControl variant="outlined" className={classes.selectContainer}>
                <InputLabel id="show-count-label">Show Stories</InputLabel>
                <Select
                    labelId="show-count-label"
                    value={showCount}
                    onChange={onSelectChange}
                    label="Show Stories"
                >
                    {UI_CONFIG.select.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            
            <Box className={classes.sortSection}>
                <Typography variant="body1" className={classes.sortLabel}>
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
                                startIcon={
                                    isActive ? (
                                        sortDirectionUp ? <ArrowUpward /> : <ArrowDownward />
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
    );
};

export default Controls;

