import React from 'react';
import './Story.css';

const Story = ({ name, time, id, rating, comments, number, source, url, styleRating, styleComments }) => {
    const hours = Math.floor((+new Date() / 1000 - time) / 60 / 60);

    const minutes = Math.round(((+new Date() / 1000 - time) / 60) % 60);

    return (
        <div className="story">
            <div className="story-row">
                <span className="number">{number}</span>
                <a target="_blank" href={url}>
                    {name}
                </a>
                <span className="source">{source}</span>
            </div>
            <div className="rating-bars">
                <div className="rating-fill" style={styleRating}>
                    <div className="rating-text">{rating}</div>
                </div>
            </div>
            <div className="comment-bars">
                <a target="_blank" href={'https://news.ycombinator.com/item?id=' + id}>
                    <div className="comment-fill" style={styleComments}>
                        {comments}
                    </div>
                </a>
            </div>
            <span className="time">
                {hours !== 0 ? (
                    <span>
                        {hours} hrs {minutes} mins
                    </span>
                ) : (
                    <span>{minutes} min</span>
                )}
            </span>
        </div>
    );
};

export default Story;
