export default function LoadingVerifyEmail() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md animate-pulse space-y-4 rounded-lg border border-gray-200 p-6">
        <div className="mx-auto h-8 w-3/4 rounded bg-gray-300"></div>
        <div className="h-4 w-full rounded bg-gray-300"></div>
        <div className="h-4 w-full rounded bg-gray-300"></div>
        <div className="h-4 w-5/6 rounded bg-gray-300"></div>
        <div className="mt-6 flex gap-2">
          <div className="h-10 w-1/2 rounded bg-gray-300"></div>
          <div className="h-10 w-1/2 rounded bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}
