import React from 'react';
import { Card, CardContent, Box, Typography, Link, Chip, makeStyles } from '@material-ui/core';
import { TrendingUp, Comment } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    card: {
        marginBottom: theme.spacing(2),
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
            transform: 'translateY(-2px)',
        },
    },
    storyHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1.5),
        gap: theme.spacing(1),
    },
    number: {
        minWidth: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: '50%',
        fontWeight: 700,
        fontSize: '0.875rem',
    },
    title: {
        flexGrow: 1,
        fontWeight: 600,
        textDecoration: 'none',
        color: theme.palette.text.primary,
        '&:hover': {
            color: theme.palette.primary.main,
            textDecoration: 'underline',
        },
    },
    sourceChip: {
        height: '24px',
        fontSize: '0.75rem',
    },
    barContainer: {
        marginBottom: theme.spacing(1),
    },
    barLabel: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(0.5),
        gap: theme.spacing(0.5),
        fontSize: '0.75rem',
        color: theme.palette.text.secondary,
    },
    barWrapper: {
        position: 'relative',
        height: '32px',
        backgroundColor: theme.palette.grey[200],
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
    },
    ratingBar: {
        height: '100%',
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        transition: 'width 0.3s ease',
    },
    commentBar: {
        height: '100%',
        backgroundColor: theme.palette.info.main,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        transition: 'width 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
            opacity: 0.9,
        },
    },
    barText: {
        color: theme.palette.common.white,
        fontWeight: 600,
        fontSize: '0.875rem',
    },
    timeText: {
        fontSize: '0.75rem',
        color: theme.palette.text.secondary,
        marginTop: theme.spacing(0.5),
    },
}));

const Story = ({ name, time, id, rating, comments, number, source, url, styleRating, styleComments }) => {
    const classes = useStyles();
    const currentTime = Math.floor(Date.now() / 1000);
    const elapsedSeconds = currentTime - (time || 0);
    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.round((elapsedSeconds % 3600) / 60);

    const timeText = hours !== 0 ? `${hours} hrs ${minutes} mins` : `${minutes} min`;

    return (
        <Card className={classes.card}>
            <CardContent>
                <Box className={classes.storyHeader}>
                    <Box className={classes.number}>{number}</Box>
                    <Link
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.title}
                        variant="body1"
                    >
                        {name}
                    </Link>
                    <Chip
                        label={source}
                        size="small"
                        className={classes.sourceChip}
                        variant="outlined"
                    />
                </Box>

                <Box className={classes.barContainer}>
                    <Box className={classes.barLabel}>
                        <TrendingUp fontSize="small" />
                        <Typography variant="caption">Rating</Typography>
                    </Box>
                    <Box className={classes.barWrapper}>
                        <Box className={classes.ratingBar} style={styleRating}>
                            <Typography className={classes.barText}>{rating}</Typography>
                        </Box>
                    </Box>
                </Box>

                <Box className={classes.barContainer}>
                    <Box className={classes.barLabel}>
                        <Comment fontSize="small" />
                        <Typography variant="caption">Comments</Typography>
                    </Box>
                    <Link
                        href={`https://news.ycombinator.com/item?id=${id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}
                    >
                        <Box className={classes.barWrapper}>
                            <Box className={classes.commentBar} style={styleComments}>
                                <Typography className={classes.barText}>{comments}</Typography>
                            </Box>
                        </Box>
                    </Link>
                </Box>

                <Typography className={classes.timeText}>{timeText}</Typography>
            </CardContent>
        </Card>
    );
};

export default Story;
