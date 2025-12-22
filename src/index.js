import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './containers/App';

// Log git commit hash and message for deployment tracking
const gitCommitHash = process.env.REACT_APP_GIT_COMMIT_HASH || 'unknown';
const gitCommitMessage = process.env.REACT_APP_GIT_COMMIT_MESSAGE || 'unknown';
console.log(`Deployment commit hash: ${gitCommitHash}`);
console.log(`Deployment commit message: ${gitCommitMessage}`);

ReactDOM.render(
  <>
    <CssBaseline />
    <App />
  </>,
  document.getElementById('root')
);
