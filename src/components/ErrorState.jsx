const ErrorState = ({ message }) => (
  <div className="flex items-center justify-center min-h-screen bg-background text-destructive">
    Error: {message}
  </div>
);

export default ErrorState;