import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import ErrorFallback from './ui/ErrorFallback.jsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { ErrorBoundary } from 'react-error-boundary';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace('/')}
    >
    </ErrorBoundary> */}
    <App />
  </React.StrictMode>
);
