import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './containers/App';

// Log git commit hash for deployment tracking
const gitCommitHash = process.env.REACT_APP_GIT_COMMIT_HASH || 'unknown';
console.log(`Deployment commit hash: ${gitCommitHash}`);

ReactDOM.render(
  <>
    <CssBaseline />
    <App />
  </>,
  document.getElementById('root')
);
