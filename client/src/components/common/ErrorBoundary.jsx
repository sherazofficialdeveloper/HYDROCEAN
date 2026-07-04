import React from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[200px] flex flex-col items-center justify-center p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
          <h3 className="text-lg font-bold text-dark-200">Something went wrong</h3>
          <p className="text-sm text-slate-500 mt-2">
            We're sorry, but something went wrong. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;