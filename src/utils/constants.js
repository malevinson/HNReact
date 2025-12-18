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

export const DATE_FILTER_OPTIONS = {
    ALL: 'all',
    DAYS_1: '1',
    DAYS_2: '2',
    DAYS_3: '3',
    DAYS_4: '4',
    DAYS_5: '5',
    DAYS_7: '7',
    DAYS_10_PLUS: '10+'
};

export const UI_CONFIG = {
    buttons: [
        { name: SORT_OPTIONS.DEFAULT, styles: 'default' },
        { name: SORT_OPTIONS.RATING, styles: 'rating' },
        { name: SORT_OPTIONS.COMMENTS, styles: 'comments' },
        { name: SORT_OPTIONS.RATIO, styles: 'hybrid' }
    ],
    select: [30, 60, 100, 200, 500],
    dateFilter: [
        { value: DATE_FILTER_OPTIONS.ALL, label: 'All' },
        { value: DATE_FILTER_OPTIONS.DAYS_1, label: 'Newer than 1 day' },
        { value: DATE_FILTER_OPTIONS.DAYS_2, label: 'Newer than 2 days' },
        { value: DATE_FILTER_OPTIONS.DAYS_3, label: 'Newer than 3 days' },
        { value: DATE_FILTER_OPTIONS.DAYS_4, label: 'Newer than 4 days' },
        { value: DATE_FILTER_OPTIONS.DAYS_5, label: 'Newer than 5 days' },
        { value: DATE_FILTER_OPTIONS.DAYS_7, label: 'Newer than 7 days' },
        { value: DATE_FILTER_OPTIONS.DAYS_10_PLUS, label: 'Newer than 10+ days' }
    ]
};

