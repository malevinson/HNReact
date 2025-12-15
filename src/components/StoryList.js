import React from 'react';
import { Container, Box, makeStyles } from '@material-ui/core';
import Story from './Story';
import { getDomain } from '../utils/storyUtils';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
        maxWidth: '900px',
    },
}));

const StoryList = ({ stories, frontPageIds, maxRating, maxComments }) => {
    const classes = useStyles();
    
    return (
        <Container className={classes.container}>
            <Box>
                {stories.map(story => (
                    <Story
                        key={story.id}
                        styleRating={{ 
                            width: maxRating > 0 && story.score 
                                ? `${(story.score / maxRating) * 100}%` 
                                : '0%' 
                        }}
                        styleComments={{ 
                            width: maxComments > 0 && story.descendants 
                                ? `${(story.descendants / maxComments) * 100}%` 
                                : '0%' 
                        }}
                        id={story.id}
                        name={story.title || 'Untitled'}
                        url={story.url || `https://news.ycombinator.com/item?id=${story.id}`}
                        time={story.time}
                        rating={story.score || 0}
                        comments={story.descendants || 0}
                        number={frontPageIds.indexOf(story.id) + 1}
                        source={getDomain(story.url)}
                    />
                ))}
            </Box>
        </Container>
    );
};

export default StoryList;

