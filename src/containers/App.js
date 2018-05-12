import React, { Component } from 'react';
import Button from '../components/Button';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { activeButton: 'Default', sortDirectionUp: true, showCount: 100 };
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

    render() {
        const { activeButton, sortDirectionUp, showCount } = this.state;

        console.log(this.state);

        const uiMap = {
            buttons: [
                { name: 'Default', styles: 'default' },
                { name: 'Rating', styles: 'rating' },
                { name: 'Comments', styles: 'comments' },
                { name: 'Discussion Ratio', styles: 'hybrid' }
            ],
            select: [30, 60, 100, 200, 500]
        };

        return (
            <div>
                Show:
                <select value={showCount} onChange={this.handleSelect}>
                    {uiMap.select.map(option => {
                        return (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        );
                    })}
                </select>
                {uiMap.buttons.map(button => {
                    return (
                        <Button
                            key={button.name}
                            handleClickButton={this.handleClickButton}
                            showIcon={button.name === activeButton}
                            iconDirection={sortDirectionUp}
                            styles={button.styles}
                        >
                            {button.name}
                        </Button>
                    );
                })}
                {/* story container css */}
                {/* <Story {...{ handleClickStory, handleClickComments }} />
                <Story {...{ handleClickStory, handleClickComments }} />
                <Story {...{ handleClickStory, handleClickComments }} /> */}
            </div>
        );
    }
}

export default App;
