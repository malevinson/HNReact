import React from 'react';
import './Story.css';

const Story = ({ handleClickComments, name, time, rating, comments, number, source, handleClickStory }) => {
    return (
        <div className="story">
            <span className="number">{number}</span>
            <a href="url">{name}</a>
            <span className="source">{source}</span>
            <div className="rating-bars">{rating}</div>
            <div className="comment-bars">{comments}</div>
            <span className="time">{time}</span>
        </div>
    );
};

export default Story;
