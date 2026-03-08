const Loader = ({ text }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-background">
    <div className="spinner" />

    {text && (
      <p className="text-sm text-muted-foreground mt-2">
        {text}
      </p>
    )}
  </div>
);

export default Loader;