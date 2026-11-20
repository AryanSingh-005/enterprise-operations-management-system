// Renders the interface and behavior for this application module.

const ErrorMessage = ({
  message = "Something went wrong. Please try again.",
  onRetry,
  title = "Error",
}) => {
  return (
    <div
      role="alert"
      className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-5"
    >
      <div className="flex items-start gap-3">

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-lg text-red-600">
          !
        </div>

        <div>
          <h3 className="font-semibold text-red-800">
            {title}
          </h3>

          <p className="mt-1 text-sm text-red-700">
            {message}
          </p>
        </div>

      </div>

      {onRetry && (
        <div>
          <button
            type="button"
            onClick={onRetry}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
