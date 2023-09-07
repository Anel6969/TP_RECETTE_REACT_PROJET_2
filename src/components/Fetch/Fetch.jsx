import React from 'react';

function Fetch({ isLoading = true, isError = false, error = new Error(), children }) {
  const LoadingSpinner = () => (
    <div className='loader'>
      Loading...
    </div>
  );

  const ErrorDisplay = ({ errorMessage }) => (
    <div>
      <p>{errorMessage}</p>
    </div>
  );

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (isError) {
      return <ErrorDisplay errorMessage={`Error: ${error.message}`} />;
    }

    return children;
  };

  return (
    <div className='fetch-container'>
      {renderContent()}
    </div>
  );
}

export default Fetch;
