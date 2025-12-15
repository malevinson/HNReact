import { useEffect } from 'react';
import { STORAGE_KEY } from '../utils/constants';

export const useLocalStorage = (
    activeButton,
    sortDirectionUp,
    showCount,
    frontPageIds,
    stories,
    lastFetchTimestamp,
    maxRating,
    maxComments,
    hasLoadedFromStorage
) => {
    useEffect(() => {
        if (!hasLoadedFromStorage.current) return;
        
        const stateToSave = {
            activeButton,
            sortDirectionUp,
            showCount,
            frontPageIds,
            stories,
            lastFetchTimestamp,
            maxRating,
            maxComments
        };
        
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
        } catch (e) {
            console.error('Error saving to localStorage:', e);
        }
    }, [activeButton, sortDirectionUp, showCount, frontPageIds, stories, lastFetchTimestamp, maxRating, maxComments, hasLoadedFromStorage]);
};

