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

