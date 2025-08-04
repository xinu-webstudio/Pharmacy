interface FormLoaderProps {
  isLoading: boolean;
  text?: string;
  subText?: string;
}

export function FormLoader({
  isLoading,
  text = 'Processing Request...',
  subText = 'Please wait while we process your information',
}: FormLoaderProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
      <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-8 shadow-xl max-w-md w-full border-t-4 border-teal-600">
        <div className="flex items-center justify-center w-full mb-2">
          <div className="relative h-16 w-16">
            {/* Outer ring animation */}
            <div className="absolute inset-0 rounded-full border-4 border-teal-200 opacity-30"></div>

            {/* Spinning arc */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-teal-600 animate-spin"></div>

            {/* Inner pulse */}
            <div className="absolute inset-[6px] rounded-full bg-teal-50 flex items-center justify-center">
              <div className="h-6 w-6 rounded-full bg-teal-600 animate-pulse"></div>
            </div>
          </div>
        </div>

        {text && (
          <h3 className="text-center text-lg font-semibold text-gray-800">
            {text}
          </h3>
        )}

        {subText && (
          <p className="text-center text-sm text-gray-500 max-w-xs">
            {subText}
          </p>
        )}

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
          <div className="bg-teal-600 h-1.5 rounded-full animate-progress"></div>
        </div>
      </div>
    </div>
  );
}
