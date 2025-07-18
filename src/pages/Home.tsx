import AlbumCard from "../components/AlbumCard";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import SongCard from "../components/SongCard";
import { useSongData } from "../context/SongContext";

const Home = () => {
  const { albums, songs, loading } = useSongData();
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Layout>
          <div className="mb-4">
            <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
            <div className="flex overflow-auto">
              {Array.isArray(albums) && albums.length > 0 ? (
                albums.map((e, i) => (
                  <AlbumCard
                    key={i}
                    image={e.thumbnail}
                    name={e.title}
                    desc={e.description}
                    id={e.id}
                  />
                ))
              ) : (
                <p>No albums found</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
            <div className="flex overflow-auto">
              {Array.isArray(songs) && songs.length > 0 ? (
                songs.map((e, i) => (
                  <SongCard
                    key={i}
                    image={e.thumbnail}
                    name={e.title}
                    desc={e.description}
                    id={e.id}
                  />
                ))
              ) : (
                <p>No songs found</p>
              )}
            </div>
          </div>
        </Layout>
      )}
    </div>
  );
};

export default Home;
