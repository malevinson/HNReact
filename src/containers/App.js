import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Header from '../components/Header';
import Controls from '../components/Controls';
import StoryList from '../components/StoryList';
import LoadingIndicator from '../components/LoadingIndicator';
import { useStories } from '../hooks/useStories';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { sortStories } from '../utils/storyUtils';
import { SORT_OPTIONS, STORAGE_KEY } from '../utils/constants';
import './App.css';

const AppContent = () => {
    const [activeButton, setActiveButton] = useState(SORT_OPTIONS.RATIO);
    const [sortDirectionUp, setSortDirectionUp] = useState(false);
    const [showCount, setShowCount] = useState('500');

    const {
        frontPageIds,
        stories,
        lastFetchTimestamp,
        maxRating,
        maxComments,
        isLoading,
        hasLoadedFromStorage
    } = useStories(activeButton, showCount);

    // Load UI state from localStorage on mount
    useEffect(() => {
        try {
            const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (savedState) {
                setActiveButton(savedState.activeButton || SORT_OPTIONS.RATIO);
                setSortDirectionUp(savedState.sortDirectionUp || false);
                setShowCount(savedState.showCount || '500');
            }
        } catch (e) {
            console.error('Error reading UI state from localStorage:', e);
        }
    }, []);

    // Save state to localStorage
    useLocalStorage(
        activeButton,
        sortDirectionUp,
        showCount,
        frontPageIds,
        stories,
        lastFetchTimestamp,
        maxRating,
        maxComments,
        hasLoadedFromStorage
    );

    const handleClickButton = useCallback((buttonName) => {
        if (buttonName === activeButton) {
            setSortDirectionUp(prev => !prev);
        } else {
            setActiveButton(buttonName);
        }
    }, [activeButton]);

    const handleSelect = useCallback((e) => {
        setShowCount(e.target.value);
    }, []);

    // Memoize sorted and sliced stories for performance
    const sortedStories = useMemo(() => {
        const sorted = sortStories(stories, activeButton, frontPageIds, sortDirectionUp);
        const count = parseInt(showCount, 10);
        return sorted.slice(0, count);
    }, [stories, activeButton, frontPageIds, sortDirectionUp, showCount]);

    return (
        <div>
            <Header />
            <Controls
                showCount={showCount}
                activeButton={activeButton}
                sortDirectionUp={sortDirectionUp}
                onSelectChange={handleSelect}
                onButtonClick={handleClickButton}
            />
            {isLoading && stories.length === 0 && <LoadingIndicator />}
            <StoryList
                stories={sortedStories}
                frontPageIds={frontPageIds}
                maxRating={maxRating}
                maxComments={maxComments}
            />
        </div>
    );
};

const App = () => <AppContent />;

export default App;
