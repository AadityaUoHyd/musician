import { useState, useEffect } from "react";
import { useSongData } from "../context/SongContext";
import axios from "axios";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const AdminSongs = () => {
  const { albums, songs, fetchAlbums, fetchSongs } = useSongData();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [album, setAlbum] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [artist, setArtist] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>("");

  const server = import.meta.env.VITE_ADMIN_API;

  useEffect(() => {
    fetchAlbums();
    fetchSongs();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSongHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !coverImage) {
      toast.error("Please select both song and cover image");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("album", album);
    formData.append("genre", genre);
    formData.append("duration", duration);
    formData.append("artist", artist);
    formData.append("file", file);
    formData.append("coverImage", coverImage);

    try {
      setBtnLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(`${server}/song/new`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Song added successfully");
        fetchSongs();
        // Reset form
        setTitle("");
        setDescription("");
        setAlbum("");
        setGenre("");
        setDuration("");
        setArtist("");
        setFile(null);
        setCoverImage(null);
        setCoverImagePreview("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding song:", error);
      toast.error("Failed to add song");
    } finally {
      setBtnLoading(false);
    }
  };

  const deleteSong = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`${server}/song/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          toast.success("Song deleted successfully");
          fetchSongs();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error deleting song:", error);
        toast.error("Failed to delete song");
      }
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold">Add New Song</h2>
      <form onSubmit={addSongHandler} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="auth-input"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="auth-input"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label>Album</label>
            <select
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              className="auth-input"
              required
            >
              <option value="">Select Album</option>
              {albums.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label>Genre</label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="auth-input"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Duration (mm:ss)</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="auth-input"
              placeholder="3:45"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Artist</label>
            <input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="auth-input"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label>Song File</label>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="auth-input p-2"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverImageChange}
              className="auth-input p-2"
              required
            />
            {coverImagePreview && (
              <div className="mt-2">
                <img
                  src={coverImagePreview}
                  alt="Cover Preview"
                  className="h-20 w-20 object-cover rounded"
                />
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={btnLoading}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-400"
        >
          {btnLoading ? "Adding..." : "Add Song"}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">All Songs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {songs.map((song) => (
            <div
              key={song.id}
              className="border p-4 rounded-lg flex items-center justify-between"
            >
              <div>
                <h4 className="font-bold">{song.title}</h4>
                <p className="text-sm text-gray-600">{song.album}</p>
              </div>
              <button
                onClick={() => deleteSong(song.id)}
                className="text-red-500 hover:text-red-700"
                disabled={btnLoading}
              >
                <MdDelete size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSongs;
