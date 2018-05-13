import React, { Component } from 'react';
import Button from '../components/Button';
import Story from '../components/Story';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeButton: 'Default',
            sortDirectionUp: true,
            showCount: '100',
            frontPageIds: [],
            stories: [],
            lastFetchTimestamp: null,
            maxRating: 0,
            maxComments: 0
        };

        this.sampleStory = {
            by: 'olifrost',
            descendants: 30,
            id: 17059575,
            kids: [
                17060134,
                17060002,
                17060203,
                17060012,
                17059975,
                17059964,
                17060127,
                17060299,
                17060200,
                17060174,
                17059918,
                17059957,
                17059981,
                17060133,
                17059853
            ],
            score: 129,
            time: 1526227334,
            title: 'Flopstarter: a platform for bad ideas',
            type: 'story',
            url: 'http://flopstarter.com/'
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
                    console.log(story);
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

        if (domain.includes('undefined')) {
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

    sortStories(stories, activeButton, frontPageIds, sortDirectionUp) {
        let unsortedStories = stories;
        if (activeButton === 'Default') {
            if (sortDirectionUp) {
                unsortedStories.sort(function(a, b) {
                    return frontPageIds.indexOf(a.id) - frontPageIds.indexOf(b.id);
                });
            } else {
                unsortedStories.sort(function(a, b) {
                    return frontPageIds.indexOf(b.id) - frontPageIds.indexOf(a.id);
                });
            }
        } else if (activeButton === 'Rating') {
            if (sortDirectionUp) {
                unsortedStories.sort(function(a, b) {
                    return a.score - b.score;
                });
            } else {
                unsortedStories.sort(function(a, b) {
                    return b.score - a.score;
                });
            }
        } else if (activeButton === 'Comments') {
            if (sortDirectionUp) {
                unsortedStories.sort(function(a, b) {
                    return a.descendants - b.descendants;
                });
            } else {
                unsortedStories.sort(function(a, b) {
                    return b.descendants - a.descendants;
                });
            }
        } else if (activeButton === 'Ratio') {
            if (sortDirectionUp) {
                unsortedStories.sort(function(a, b) {
                    return a.descendants / a.score - b.descendants / b.score;
                });
            } else {
                unsortedStories.sort(function(a, b) {
                    return b.descendants / b.score - a.descendants / a.score;
                });
            }
        }
        return unsortedStories;
    }

    render() {
        const { activeButton, sortDirectionUp, showCount, stories, frontPageIds } = this.state;

        console.log(this.state);

        console.log(JSON.stringify(this.state.stories[1]));

        const uiMap = {
            buttons: [
                { name: 'Default', styles: 'default' },
                { name: 'Rating', styles: 'rating' },
                { name: 'Comments', styles: 'comments' },
                { name: 'Ratio', styles: 'hybrid' }
            ],
            select: [30, 60, 100, 200, 500]
        };

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
                                styleRating={{ width: story.score / this.state.maxRating * 200 + 'px' }}
                                styleComments={{ width: story.descendants / this.state.maxComments * 200 + 'px' }}
                                name={story.title}
                                url={story.url}
                                time={story.time}
                                rating={story.score}
                                comments={story.descendants}
                                number={this.state.frontPageIds.indexOf(story.id) + 1}
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
