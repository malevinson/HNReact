import React from 'react';
import { Card, CardContent, Box, Typography, Link, Chip, makeStyles } from '@material-ui/core';
import { TrendingUp, Comment } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    card: {
        marginBottom: theme.spacing(1),
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
            transform: 'translateY(-1px)',
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(0.75),
        },
    },
    cardContent: {
        padding: theme.spacing(1.5),
        '&:last-child': {
            paddingBottom: theme.spacing(1.5),
        },
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1),
            '&:last-child': {
                paddingBottom: theme.spacing(1),
            },
        },
    },
    storyHeader: {
        marginBottom: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(0.75),
        },
    },
    headerTop: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1),
        marginBottom: theme.spacing(0.75),
        flexWrap: 'wrap',
        [theme.breakpoints.down('sm')]: {
            gap: theme.spacing(0.5),
            marginBottom: theme.spacing(0.5),
        },
    },
    number: {
        minWidth: '28px',
        height: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: '50%',
        fontWeight: 700,
        fontSize: '0.75rem',
        flexShrink: 0,
        [theme.breakpoints.down('sm')]: {
            minWidth: '20px',
            height: '20px',
            fontSize: '0.6rem',
        },
    },
    headerMeta: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(0.75),
        flexShrink: 0,
        [theme.breakpoints.down('sm')]: {
            gap: theme.spacing(0.5),
        },
    },
    title: {
        fontWeight: 400,
        textDecoration: 'none',
        color: theme.palette.text.primary,
        fontSize: '0.9rem',
        lineHeight: '1.4',
        display: 'block',
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.8rem',
        },
        '&:hover': {
            color: theme.palette.primary.main,
            textDecoration: 'underline',
        },
    },
    timeText: {
        fontSize: '0.7rem',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        flexShrink: 0,
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.65rem',
        },
    },
    sourceChip: {
        height: '22px',
        fontSize: '0.7rem',
        flexShrink: 0,
        [theme.breakpoints.down('sm')]: {
            height: '18px',
            fontSize: '0.6rem',
            '& .MuiChip-label': {
                padding: '0 6px',
            },
        },
    },
    barsRow: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1),
        marginBottom: theme.spacing(0.5),
        [theme.breakpoints.down('sm')]: {
            gap: theme.spacing(0.5),
            marginBottom: theme.spacing(0.25),
        },
    },
    barLabelContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(0.75),
        flexShrink: 0,
        [theme.breakpoints.down('sm')]: {
            gap: theme.spacing(0.5),
        },
    },
    barLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(0.5),
        fontSize: '0.7rem',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.65rem',
        },
    },
    commentsLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(0.5),
        fontSize: '0.7rem',
        color: theme.palette.info.main,
        textDecoration: 'underline',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.65rem',
        },
        '&:hover': {
            color: theme.palette.info.dark,
        },
    },
    barsCenterContainer: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        gap: theme.spacing(0.5),
        minWidth: 0,
    },
    ratingContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        minWidth: 0,
    },
    ratingWrapper: {
        position: 'relative',
        height: '20px',
        width: '100%',
        maxWidth: '100%',
        backgroundColor: theme.palette.grey[200],
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            height: '18px',
        },
    },
    ratingBar: {
        height: '100%',
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: theme.spacing(0.75),
        borderRadius: theme.shape.borderRadius,
        transition: 'width 0.3s ease',
        marginLeft: 'auto',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(0.5),
        },
    },
    commentsContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minWidth: 0,
    },
    commentsWrapper: {
        position: 'relative',
        height: '20px',
        width: '100%',
        maxWidth: '100%',
        backgroundColor: theme.palette.grey[200],
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            height: '18px',
        },
    },
    commentBar: {
        height: '100%',
        backgroundColor: theme.palette.info.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: theme.spacing(0.75),
        borderRadius: theme.shape.borderRadius,
        transition: 'width 0.3s ease',
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
            paddingRight: theme.spacing(0.5),
        },
        '&:hover': {
            opacity: 0.9,
        },
    },
    barText: {
        color: theme.palette.common.white,
        fontWeight: 600,
        fontSize: '0.75rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.65rem',
        },
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
            <CardContent className={classes.cardContent}>
                <Box className={classes.storyHeader}>
                    <Box className={classes.headerTop}>
                        <Box className={classes.number}>{number}</Box>
                        <Box className={classes.headerMeta}>
                            <Typography className={classes.timeText}>{timeText}</Typography>
                            <Chip
                                label={source}
                                size="small"
                                className={classes.sourceChip}
                                variant="outlined"
                            />
                        </Box>
                    </Box>
                    <Link
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.title}
                        variant="body1"
                    >
                        {name}
                    </Link>
                </Box>

                <Box className={classes.barsRow}>
                    <Box className={classes.barLabelContainer}>
                        <TrendingUp fontSize="small" />
                        <Typography variant="caption" className={classes.barLabel}>
                            Rating
                        </Typography>
                    </Box>
                    
                    <Box className={classes.barsCenterContainer}>
                        <Box className={classes.ratingContainer}>
                            <Box className={classes.ratingWrapper}>
                                <Box className={classes.ratingBar} style={styleRating}>
                                    <Typography className={classes.barText}>{rating}</Typography>
                                </Box>
                            </Box>
                        </Box>
                        
                        <Box className={classes.commentsContainer}>
                            <Link
                                href={`https://news.ycombinator.com/item?id=${id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: 'none', width: '100%' }}
                            >
                                <Box className={classes.commentsWrapper}>
                                    <Box className={classes.commentBar} style={styleComments}>
                                        <Typography className={classes.barText}>{comments}</Typography>
                                    </Box>
                                </Box>
                            </Link>
                        </Box>
                    </Box>
                    
                    <Box className={classes.barLabelContainer}>
                        <Comment fontSize="small" style={{ color: '#42A5F5' }} />
                        <Link
                            href={`https://news.ycombinator.com/item?id=${id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classes.commentsLabel}
                        >
                            Comments
                        </Link>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Story;
