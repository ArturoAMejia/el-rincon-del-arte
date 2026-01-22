export default function LoadingVerifyEmail() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="animate-pulse space-y-4 w-full max-w-md border border-gray-200 rounded-lg p-6">
        <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="flex gap-2 mt-6">
          <div className="h-10 bg-gray-300 rounded w-1/2"></div>
          <div className="h-10 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}
