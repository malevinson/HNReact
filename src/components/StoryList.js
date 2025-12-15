import React from 'react';
import Story from './Story';
import { getDomain } from '../utils/storyUtils';

const StoryList = ({ stories, frontPageIds, maxRating, maxComments }) => {
    return (
        <div className="stories-container">
            {stories.map(story => (
                <Story
                    key={story.id}
                    styleRating={{ 
                        width: maxRating > 0 && story.score 
                            ? `${(story.score / maxRating) * 200}px` 
                            : '0px' 
                    }}
                    styleComments={{ 
                        width: maxComments > 0 && story.descendants 
                            ? `${(story.descendants / maxComments) * 200}px` 
                            : '0px' 
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
        </div>
    );
};

export default StoryList;

