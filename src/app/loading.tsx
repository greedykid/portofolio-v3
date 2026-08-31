export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex items-center gap-2 text-primary">
        <span className="h-3 w-3 animate-bounce rounded-full bg-primary" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-primary [animation-delay:0.1s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-primary [animation-delay:0.2s]" />
      </div>
    </div>
  );
}
