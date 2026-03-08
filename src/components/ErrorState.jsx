const ErrorState = ({ message }) => (
  <div className="flex items-center justify-center min-h-screen bg-background text-destructive">
    <p className="font-medium">
  {message === "Too many requests. Please try again."
    ? "Server is busy. Retrying..."
    : `Error: ${message}`}
</p>
  </div>
);

export default ErrorState;