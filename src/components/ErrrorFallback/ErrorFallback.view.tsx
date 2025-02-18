import { FC, memo } from "react";
import { ErrorFallbackProps } from "./ErrorFallback.type";

const ErrorFallbackView: FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="alert alert-error shadow-lg max-w-md w-full">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Something went wrong:</span>
      </div>
      <div className="text-sm text-error-content">
        <pre className="whitespace-pre-wrap break-words">{error.message}</pre>
      </div>
      <div className="flex-none">
        <button className="btn btn-sm btn-primary" onClick={resetErrorBoundary}>
          Try again
        </button>
      </div>
    </div>
  </div>
);

export default memo(ErrorFallbackView);
