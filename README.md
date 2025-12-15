# Visual Hacker News

A better visual representation of Hacker News (https://news.ycombinator.com/) built with React.

Live demo: https://hn-react-9n5bahhwo-malevinson.vercel.app/

## Features

- 📊 Visual representation of story ratings and comments with bar charts
- 🔄 Multiple sorting options: Default, Rating, Comments, and Ratio
- 🎯 Configurable story count display (30, 60, 100, 200, 500)
- 💾 Local storage persistence for faster subsequent loads
- ⚡ Optimized API fetching (only fetches what's needed)
- 📱 Responsive design

## Prerequisites

- **Node.js**: v16+ (v18+ recommended)
- **npm**: v6+ or **yarn**: v1+

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd HNReact
```

2. Install dependencies:
```bash
npm install
```

or if using yarn:
```bash
yarn install
```

## Local Development

### Starting the Development Server

```bash
npm start
```

or with yarn:
```bash
yarn start
```

This will start the development server at `http://localhost:3000`.

**Note for Node.js 18+**: The project includes `NODE_OPTIONS=--openssl-legacy-provider` flag in the start script to handle OpenSSL compatibility. This is automatically included, so no additional configuration is needed.

### Available Scripts

- `npm start` - Starts the development server
- `npm run build` - Creates an optimized production build in the `build` folder
- `npm test` - Runs the test suite
- `npm run eject` - Ejects from Create React App (⚠️ irreversible)

## Project Structure

```
src/
├── components/          # React components
│   ├── Button.js       # Sort button component
│   ├── Controls.js     # Controls (select + buttons)
│   ├── Header.js       # App header
│   ├── LoadingIndicator.js  # Loading state
│   ├── Story.js        # Individual story component
│   └── StoryList.js    # Stories list container
├── containers/         # Container components
│   └── App.js          # Main app component
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.js  # localStorage persistence hook
│   └── useStories.js   # Stories data fetching hook
├── utils/              # Utility functions
│   ├── constants.js    # App constants and configuration
│   └── storyUtils.js   # Story-related utilities (sorting, domain extraction)
└── index.js            # App entry point
```

## Tech Stack

- **React** 16.14.0 - UI library
- **React Scripts** 3.4.1 - Build tooling
- **Hacker News API** - Data source (https://github.com/HackerNews/API)

## API Usage

The app fetches data from the Hacker News Firebase API:
- Top stories: `https://hacker-news.firebaseio.com/v0/topstories.json`
- Story details: `https://hacker-news.firebaseio.com/v0/item/{id}.json`

The app optimizes API calls by:
- Only fetching the number of stories needed based on display count
- Caching fetched stories to avoid duplicate requests
- Using localStorage to persist data between sessions

## Browser Support

- Chrome (last version)
- Firefox (last version)
- Safari (last version)
- Edge (last version)

## Development Notes

- Stories are cached in localStorage for 2 minutes
- The app automatically fetches more stories when increasing the display count
- Sorting by Rating/Comments/Ratio requires fetching additional stories for accuracy
- Default sort only requires fetching the exact number of stories requested

## License

MIT
