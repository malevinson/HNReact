import React, { Component } from 'react';
import Button from '../components/Button';
import Story from '../components/Story';
import './App.css';

const uiMap = {
    buttons: [
        { name: 'Default', styles: 'default' },
        { name: 'Rating', styles: 'rating' },
        { name: 'Comments', styles: 'comments' },
        { name: 'Ratio', styles: 'hybrid' }
    ],
    select: [30, 60, 100, 200, 500]
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeButton: 'Default',
            sortDirectionUp: true,
            showCount: '500',
            frontPageIds: [],
            stories: [],
            lastFetchTimestamp: null,
            maxRating: 0,
            maxComments: 0
        };
    }

    componentDidMount() {
        const savedState = JSON.parse(localStorage.getItem('visual-hacker-news'));
        const timeStamp = savedState ? savedState.lastFetchTimestamp : 0;
        const TWO_MINUTES = 1000 * 60 * 2;

        if (+new Date() - timeStamp > TWO_MINUTES) {
            this.getFrontPageIds();
        } else {
            const state = JSON.parse(localStorage.getItem('visual-hacker-news'));
            this.setState(state);
        }
    }

    getFrontPageIds() {
        fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
            .then(res => res.json())
            .then(ids => {
                this.setState(
                    {
                        frontPageIds: ids,
                        lastFetchTimestamp: +new Date(),
                        maxRating: 0,
                        maxComments: 0
                    },
                    () => {
                        this.getStories();
                    }
                );
            });
    }

    componentDidUpdate(prevState, nextState) {
        localStorage.setItem('visual-hacker-news', JSON.stringify(this.state));
    }

    getStories() {
        const ids = this.state.frontPageIds;

        ids.forEach(id => {
            fetch('https://hacker-news.firebaseio.com/v0/item/' + id + '.json')
                .then(res => res.json())
                .then(story => {
                    if (this.state.maxRating < story.score) {
                        this.setState({ maxRating: story.score });
                    }
                    if (this.state.maxComments < story.descendants) {
                        this.setState({ maxComments: story.descendants });
                    }
                    this.setState({ stories: this.state.stories.concat(story) });
                });
        });
    }

    getDomain(url) {
        const a = document.createElement('a');
        a.href = url;
        let host = a.hostname;
        host = host.split('.');
        let domain = host.pop();
        domain = host.pop() + '.' + domain;

        if (domain.includes('undefined') || domain.includes('herokuapp')) {
            domain = 'news.ycombinator.com';
        }

        return domain;
    }

    handleClickButton = buttonName => {
        if (buttonName === this.state.activeButton) {
            this.setState({
                sortDirectionUp: !this.state.sortDirectionUp
            });
        } else {
            this.setState({
                activeButton: buttonName
            });
        }
    };

    handleSelect = e => {
        this.setState({
            showCount: e.target.value
        });
    };

    sortBasedOnDirection(a, b, sortDirectionUp) {
        if (sortDirectionUp) {
            return a - b;
        } else {
            return b - a;
        }
    }

    sortStories(stories, activeButton, frontPageIds, sortDirectionUp) {
        if (activeButton === 'Default') {
            stories.sort((a, b) => {
                return this.sortBasedOnDirection(
                    frontPageIds.indexOf(a.id),
                    frontPageIds.indexOf(b.id),
                    sortDirectionUp
                );
            });
        } else if (activeButton === 'Rating') {
            stories.sort((a, b) => {
                return this.sortBasedOnDirection(a.score, b.score, sortDirectionUp);
            });
        } else if (activeButton === 'Comments') {
            stories.sort((a, b) => {
                return this.sortBasedOnDirection(a.descendants, b.descendants, sortDirectionUp);
            });
        } else if (activeButton === 'Ratio') {
            stories.sort((a, b) => {
                return this.sortBasedOnDirection(a.descendants / a.score, b.descendants / b.score, sortDirectionUp);
            });
        }
        return stories;
    }

    render() {
        const { activeButton, sortDirectionUp, showCount, stories, frontPageIds, maxRating, maxComments } = this.state;
        let sortedStories = this.sortStories(stories, activeButton, frontPageIds, sortDirectionUp);

        sortedStories = sortedStories.slice(0, showCount);

        return (
            <div>
                <header>VISUAL HACKER NEWS</header>
                <div className="select">
                    SHOW:
                    <select value={showCount} onChange={this.handleSelect}>
                        {uiMap.select.map(option => {
                            return (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="controls">
                    <div className="control-text">SORT BY:</div>
                    <div className="button-group">
                        {uiMap.buttons.map(button => {
                            return (
                                <Button
                                    key={button.name}
                                    handleClickButton={this.handleClickButton}
                                    showIcon={button.name === activeButton}
                                    sortDirectionUp={sortDirectionUp}
                                    styles={button.styles}
                                >
                                    {button.name}
                                </Button>
                            );
                        })}
                    </div>
                </div>
                <div className="stories-container">
                    {sortedStories.map(story => {
                        return (
                            <Story
                                key={story.id}
                                styleRating={{ width: story.score / maxRating * 200 + 'px' }}
                                styleComments={{ width: story.descendants / maxComments * 200 + 'px' }}
                                id={story.id}
                                name={story.title}
                                url={story.url}
                                time={story.time}
                                rating={story.score}
                                comments={story.descendants}
                                number={frontPageIds.indexOf(story.id) + 1}
                                source={this.getDomain(story.url)}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default App;
