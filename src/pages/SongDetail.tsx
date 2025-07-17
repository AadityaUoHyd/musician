import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useSongData } from "../context/SongContext";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const SongDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { songs, albums } = useSongData();
  const [song, setSong] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && songs) {
      const foundSong = songs.find((s) => {
        return String(s.id) === String(id);
      });
      setSong(foundSong || null);
      setLoading(false);
    }
  }, [id, songs]);

  if (loading) {
    return <Loading />;
  }

  if (!song) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Song not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <img
              src={song.thumbnail}
              alt={song.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-2/3">
            <h1 className="text-4xl font-bold mb-4">{song.title}</h1>
            <p className="text-gray-600 mb-6">{song.description}</p>
            <div className="space-y-4">
              <p><span className="font-semibold">Artist:</span> {song.artist}</p>
              <p><span className="font-semibold">Album:</span> {albums.find(a => a.id === song.album_id)?.title || 'N/A'}</p>
              <p><span className="font-semibold">Genre:</span> {song.genre}</p>
              <p><span className="font-semibold">Duration:</span> {song.duration}</p>
            </div>
            <div className="mt-8">
              <audio controls className="w-full mt-4">
                <source src={song.audio} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SongDetail;
