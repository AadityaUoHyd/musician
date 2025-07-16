const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#212121] space-y-4">
      <div className="relative w-24 h-24">
        {/* Pink Circle Border */}
        <div className="absolute inset-0 w-full h-full border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        
        {/* Musician Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="/musician.png" 
            alt="Loading..." 
            className="w-16 h-16 rounded-full object-cover animate-spin" 
            style={{ animationDirection: 'reverse', animationDuration: '3s' }}
          />
        </div>
      </div>
      <p className="text-pink-500 text-lg font-semibold">Loading...</p>
    </div>
  );
};

export default Loading;
