import TicTacToe from "@/components/TicTacToe";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f7e7d3]">
      <div className="relative flex flex-col items-center justify-center w-full max-w-xl min-h-[600px] py-8">
        {/* Circle background that stretches with content */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 z-0 transition-all duration-500 h-full flex items-center justify-center">
          <div className="bg-animated-brown-gradient rounded-full w-[420px] h-full max-h-[700px] blur-[2px] opacity-60" />
        </div>
        {/* White box for the game */}
        <div className="relative z-10 bg-white rounded-3xl shadow-2xl px-4 sm:px-8 py-6 sm:py-10 w-full max-w-lg transition-all duration-500 flex flex-col items-center">
          <TicTacToe />
        </div>
      </div>
    </div>
  );
}
