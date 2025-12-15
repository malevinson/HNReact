import { useState, useEffect, useCallback, useRef } from 'react';
import { API_BASE_URL, STORAGE_KEY, CACHE_DURATION, MAX_FETCH_LIMIT, SORT_OPTIONS } from '../utils/constants';

export const useStories = (activeButton, showCount) => {
    const [frontPageIds, setFrontPageIds] = useState([]);
    const [stories, setStories] = useState([]);
    const [lastFetchTimestamp, setLastFetchTimestamp] = useState(null);
    const [maxRating, setMaxRating] = useState(0);
    const [maxComments, setMaxComments] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const fetchedStoryIds = useRef(new Set());
    const hasLoadedFromStorage = useRef(false);

    const getStories = useCallback((ids, limit = null) => {
        const idsToFetch = limit ? ids.slice(0, limit) : ids;
        const newIds = idsToFetch.filter(id => !fetchedStoryIds.current.has(id));
        
        if (newIds.length === 0) return;

        setIsLoading(true);

        const fetchPromises = newIds.map(id => {
            fetchedStoryIds.current.add(id);
            return fetch(`${API_BASE_URL}/item/${id}.json`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then(story => {
                    if (!story || story.deleted || story.dead) return null;
                    return story;
                })
                .catch(err => {
                    console.error(`Error fetching story ${id}:`, err);
                    fetchedStoryIds.current.delete(id);
                    return null;
                });
        });

        Promise.all(fetchPromises).then(stories => {
            setIsLoading(false);
            const validStories = stories.filter(story => story !== null);
            if (validStories.length === 0) return;

            setStories(prevStories => {
                const existingIds = new Set(prevStories.map(s => s.id));
                const newStories = validStories.filter(s => !existingIds.has(s.id));
                return [...prevStories, ...newStories];
            });
            
            setMaxRating(prevMax => {
                return validStories.reduce((max, story) => 
                    Math.max(max, story.score || 0), prevMax);
            });
            setMaxComments(prevMax => {
                return validStories.reduce((max, story) => 
                    Math.max(max, story.descendants || 0), prevMax);
            });
        }).catch(err => {
            setIsLoading(false);
            console.error('Error fetching stories:', err);
        });
    }, []);

    const getFrontPageIds = useCallback(() => {
        setIsLoading(true);
        fetch(`${API_BASE_URL}/topstories.json`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(ids => {
                setFrontPageIds(ids);
                setLastFetchTimestamp(Date.now());
                setMaxRating(0);
                setMaxComments(0);
                setStories([]);
                fetchedStoryIds.current.clear();
                getStories(ids, parseInt(showCount, 10));
            })
            .catch(err => {
                setIsLoading(false);
                console.error('Error fetching front page IDs:', err);
            });
    }, [getStories, showCount]);

    // Initialize from localStorage or fetch new data
    useEffect(() => {
        let savedState;
        try {
            savedState = JSON.parse(localStorage.getItem(STORAGE_KEY));
        } catch (e) {
            console.error('Error reading from localStorage:', e);
        }
        
        const timeStamp = savedState?.lastFetchTimestamp || 0;

        if (Date.now() - timeStamp > CACHE_DURATION) {
            getFrontPageIds();
            hasLoadedFromStorage.current = true;
        } else if (savedState) {
            setFrontPageIds(savedState.frontPageIds || []);
            setStories(savedState.stories || []);
            setLastFetchTimestamp(savedState.lastFetchTimestamp || null);
            setMaxRating(savedState.maxRating || 0);
            setMaxComments(savedState.maxComments || 0);
            if (savedState.stories?.length > 0) {
                savedState.stories.forEach(story => {
                    if (story?.id) {
                        fetchedStoryIds.current.add(story.id);
                    }
                });
            }
            hasLoadedFromStorage.current = true;
        } else {
            getFrontPageIds();
            hasLoadedFromStorage.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Fetch more stories when showCount increases or sort changes
    useEffect(() => {
        if (!hasLoadedFromStorage.current || frontPageIds.length === 0) return;
        
        const count = parseInt(showCount, 10);
        const currentStoryCount = stories.length;
        const fetchLimit = activeButton === SORT_OPTIONS.DEFAULT 
            ? count 
            : Math.min(count * 2, MAX_FETCH_LIMIT);
        
        if (currentStoryCount < fetchLimit && fetchedStoryIds.current.size < fetchLimit) {
            const needed = fetchLimit - fetchedStoryIds.current.size;
            if (needed > 0) {
                getStories(frontPageIds, fetchedStoryIds.current.size + needed);
            }
        }
    }, [showCount, activeButton, frontPageIds, stories.length, getStories]);

    return {
        frontPageIds,
        stories,
        lastFetchTimestamp,
        maxRating,
        maxComments,
        isLoading,
        setFrontPageIds,
        setStories,
        setLastFetchTimestamp,
        setMaxRating,
        setMaxComments,
        hasLoadedFromStorage
    };
};

