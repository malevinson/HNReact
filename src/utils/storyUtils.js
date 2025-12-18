import { SORT_OPTIONS } from './constants';

export const getDomain = (url) => {
    if (!url) return 'news.ycombinator.com';
    
    try {
        const a = document.createElement('a');
        a.href = url;
        const hostname = a.hostname;
        
        if (!hostname) return 'news.ycombinator.com';
        
        const parts = hostname.split('.');
        if (parts.length < 2) return hostname;
        
        const domain = parts.slice(-2).join('.');
        
        if (domain.includes('undefined') || domain.includes('herokuapp')) {
            return 'news.ycombinator.com';
        }
        
        return domain;
    } catch (e) {
        return 'news.ycombinator.com';
    }
};

const sortBasedOnDirection = (a, b, sortDirectionUp) => {
    return sortDirectionUp ? a - b : b - a;
};

export const filterStoriesByDate = (stories, dateFilter) => {
    if (!dateFilter || dateFilter === 'all') {
        return stories;
    }

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const filterDays = dateFilter === '10+' ? 10 : parseInt(dateFilter, 10);
    const filterSeconds = filterDays * 24 * 60 * 60; // Convert days to seconds

    return stories.filter(story => {
        if (!story.time) return false;
        const storyAge = currentTime - story.time;
        return storyAge < filterSeconds; // Newer than = age is less than threshold
    });
};

export const sortStories = (stories, activeButton, frontPageIds, sortDirectionUp) => {
    const sorted = [...stories];
    
    switch (activeButton) {
        case SORT_OPTIONS.DEFAULT:
            sorted.sort((a, b) => {
                return sortBasedOnDirection(
                    frontPageIds.indexOf(a.id),
                    frontPageIds.indexOf(b.id),
                    sortDirectionUp
                );
            });
            break;
        case SORT_OPTIONS.RATING:
            sorted.sort((a, b) => {
                return sortBasedOnDirection(a.score || 0, b.score || 0, sortDirectionUp);
            });
            break;
        case SORT_OPTIONS.COMMENTS:
            sorted.sort((a, b) => {
                return sortBasedOnDirection(a.descendants || 0, b.descendants || 0, sortDirectionUp);
            });
            break;
        case SORT_OPTIONS.RATIO:
            sorted.sort((a, b) => {
                const ratioA = a.score > 0 ? (a.descendants || 0) / a.score : 0;
                const ratioB = b.score > 0 ? (b.descendants || 0) / b.score : 0;
                return sortBasedOnDirection(ratioA, ratioB, sortDirectionUp);
            });
            break;
        default:
            break;
    }
    return sorted;
};

