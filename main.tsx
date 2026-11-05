
import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

class ErrorBoundary extends Component<
  { children: React.ReactNode },
  { error: string | null }
> {
  state = { error: null as string | null };

  static getDerivedStateFromError(error: Error) {
    return { error: error.message };
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, color: 'red' }}>
          <h2>Website Error</h2>
          <pre>{this.state.error}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename="/GATE-DEGREE-COLLEGE-DIGITAL-STUDENT-HUB">
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
    
