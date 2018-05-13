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
            lastFetchTimestamp: null
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
                        lastFetchTimestamp: +new Date()
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

    handleClickComments = commentLink => {
        //
    };

    handleClickStory = storyLink => {
        //
    };

    render() {
        const { activeButton, sortDirectionUp, showCount } = this.state;

        console.log(this.state);

        const uiMap = {
            buttons: [
                { name: 'Default', styles: 'default' },
                { name: 'Rating', styles: 'rating' },
                { name: 'Comments', styles: 'comments' },
                { name: 'Ratio', styles: 'hybrid' }
            ],
            select: [30, 60, 100, 200, 500]
        };

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
                <Story handleClickStory={this.handleClickStory} handleClickComments={this.handleClickComments} />
            </div>
        );
    }
}

export default App;
