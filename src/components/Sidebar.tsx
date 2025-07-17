import { useNavigate } from "react-router-dom";
import PlayListCard from "./PlayListCard";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <div
          className="flex items-center gap-3 pl-8 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="relative w-6 h-6">
            <img src="/home.png" alt="Home" className="w-6 h-6 absolute group-hover:opacity-0 transition-opacity" />
            <img src="/home.png" alt="Home" className="w-6 h-6 absolute opacity-0 group-hover:opacity-100" style={{ filter: 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(300deg) brightness(100%) contrast(93%)' }} />
          </div>
          <p className="font-bold group-hover:text-pink-400">Home</p>
        </div>
        <div 
          className="flex items-center gap-3 pl-8 cursor-pointer group"
          onClick={() => navigate("/search")}
        >
          <div className="relative w-6 h-6">
            <img src="/search.png" alt="Search" className="w-6 h-6 absolute group-hover:opacity-0 transition-opacity" />
            <img src="/search.png" alt="Search" className="w-6 h-6 absolute opacity-0 group-hover:opacity-100" style={{ filter: 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(300deg) brightness(100%) contrast(93%)' }} />
          </div>
          <p className="font-bold group-hover:text-pink-400">Search</p>
        </div>
      </div>

      <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/stack.png" className="w-8"  alt="" />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <img src="/arrow.png" className="w-8" alt="" />
            <img src="/plus.png" className="w-8" alt="" />
          </div>
        </div>
        <div onClick={() => navigate("/playlist")}>
          <PlayListCard />
        </div>

        <div className="p-4 m-2 bg-[#121212] rounded font-semibold flex flex-col items-start gap-1 pl-4 mt-4">
          <h1>Let's find some podcasts to follow</h1>
          <p className="font-light">we'll keep you update on new episodes</p>
          <button className="px-4 py-1.5 bg-white text-black hover:bg-pink-400 hover:text-white text-[15px] rounded-full mt-4">
            Browse Podcasts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
