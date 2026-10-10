export default function Loading() {
  return (
    <main
    //   role="status"
      aria-live="polite"
      className="flex min-h-[70vh] items-center justify-center px-5"
    >
      <div className="flex flex-col items-center gap-4">
        <span className="relative flex size-10">
          <span className="absolute inset-0 rounded-full border-2 border-muted" />
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary motion-reduce:animate-none dark:border-t-teal-400" />
        </span>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
      <span className="sr-only">Loading content</span>
    </main>
  );
}