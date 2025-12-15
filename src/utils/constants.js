export const API_BASE_URL = 'https://hacker-news.firebaseio.com/v0';
export const STORAGE_KEY = 'visual-hacker-news';
export const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes in milliseconds
export const MAX_FETCH_LIMIT = 200;

export const SORT_OPTIONS = {
    DEFAULT: 'Default',
    RATING: 'Rating',
    COMMENTS: 'Comments',
    RATIO: 'Ratio'
};

export const UI_CONFIG = {
    buttons: [
        { name: SORT_OPTIONS.DEFAULT, styles: 'default' },
        { name: SORT_OPTIONS.RATING, styles: 'rating' },
        { name: SORT_OPTIONS.COMMENTS, styles: 'comments' },
        { name: SORT_OPTIONS.RATIO, styles: 'hybrid' }
    ],
    select: [30, 60, 100, 200, 500]
};

