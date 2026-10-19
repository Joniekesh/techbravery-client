interface LoaderProps {
  type: string;
}

const Loader = ({ type }: LoaderProps) => {
  if (type !== "bounce") return null;

  return (
    <>
      <style>
        {`
          @keyframes move {
            0% { transform: translateY(0); }
            100% { transform: translateY(-10px); }
          }
        `}
      </style>

      <div className="fixed inset-0 flex items-center justify-center">
        <div
        // className="flex flex-col items-center justify-center border-2 border-orange-500 bg-zdc-bg-primary w-20 h-20 rounded-full gap-2 p-2"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-1 h-6 bg-gray-300"
              style={{
                animation: "move 1s ease-in-out infinite alternate",
                animationDelay: "0s",
              }}
            />

            <div
              className="w-1 h-6 bg-teal-600"
              style={{
                animation: "move 1s ease-in-out infinite alternate",
                animationDelay: "0.3s",
              }}
            />

            <div
              className="w-1 h-6 bg-gray-300"
              style={{
                animation: "move 1s ease-in-out infinite alternate",
                animationDelay: "0.6s",
              }}
            />
          </div>

          {/* <span className="text-xs font-bold text-gray-200">Loading...</span> */}
        </div>
      </div>
    </>
  );
};

export default Loader;
