import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Box, makeStyles, ThemeProvider } from '@material-ui/core';
import Header from '../components/Header';
import Controls from '../components/Controls';
import StoryList from '../components/StoryList';
import LoadingIndicator from '../components/LoadingIndicator';
import { useStories } from '../hooks/useStories';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { sortStories, filterStoriesByDate } from '../utils/storyUtils';
import { SORT_OPTIONS, STORAGE_KEY, DATE_FILTER_OPTIONS } from '../utils/constants';
import createTheme from '../theme/theme';

const AppContent = () => {
    const [activeButton, setActiveButton] = useState(SORT_OPTIONS.RATIO);
    const [sortDirectionUp, setSortDirectionUp] = useState(false);
    const [showCount, setShowCount] = useState('500');
    const [themeType, setThemeType] = useState('dark');
    const [dateFilter, setDateFilter] = useState(DATE_FILTER_OPTIONS.ALL);

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
                setThemeType(savedState.themeType || 'dark');
                setDateFilter(savedState.dateFilter || DATE_FILTER_OPTIONS.ALL);
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
        themeType,
        dateFilter,
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

    const handleDateFilterChange = useCallback((e) => {
        setDateFilter(e.target.value);
    }, []);

    const handleThemeToggle = useCallback(() => {
        setThemeType(prev => prev === 'dark' ? 'light' : 'dark');
    }, []);

    // Memoize filtered, sorted and sliced stories for performance
    const sortedStories = useMemo(() => {
        const filtered = filterStoriesByDate(stories, dateFilter);
        const sorted = sortStories(filtered, activeButton, frontPageIds, sortDirectionUp);
        const count = parseInt(showCount, 10);
        return sorted.slice(0, count);
    }, [stories, dateFilter, activeButton, frontPageIds, sortDirectionUp, showCount]);

    // Create theme based on current type
    const theme = useMemo(() => createTheme(themeType), [themeType]);

    return (
        <ThemeProvider theme={theme}>
            <AppContentInner
                showCount={showCount}
                activeButton={activeButton}
                sortDirectionUp={sortDirectionUp}
                themeType={themeType}
                dateFilter={dateFilter}
                isLoading={isLoading}
                stories={stories}
                sortedStories={sortedStories}
                frontPageIds={frontPageIds}
                maxRating={maxRating}
                maxComments={maxComments}
                onSelectChange={handleSelect}
                onDateFilterChange={handleDateFilterChange}
                onButtonClick={handleClickButton}
                onThemeToggle={handleThemeToggle}
            />
        </ThemeProvider>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
    },
}));

const AppContentInner = ({
    showCount,
    activeButton,
    sortDirectionUp,
    themeType,
    dateFilter,
    isLoading,
    stories,
    sortedStories,
    frontPageIds,
    maxRating,
    maxComments,
    onSelectChange,
    onDateFilterChange,
    onButtonClick,
    onThemeToggle,
}) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Header />
            <Controls
                showCount={showCount}
                activeButton={activeButton}
                sortDirectionUp={sortDirectionUp}
                themeType={themeType}
                dateFilter={dateFilter}
                onSelectChange={onSelectChange}
                onDateFilterChange={onDateFilterChange}
                onButtonClick={onButtonClick}
                onThemeToggle={onThemeToggle}
            />
            {isLoading && stories.length === 0 && <LoadingIndicator />}
            <StoryList
                stories={sortedStories}
                frontPageIds={frontPageIds}
                maxRating={maxRating}
                maxComments={maxComments}
            />
        </Box>
    );
};

const App = () => <AppContent />;

export default App;
