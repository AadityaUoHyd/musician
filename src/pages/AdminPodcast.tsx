import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

interface PodcastSeries {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  createdAt: string;
}

const AdminPodcast = () => {
  const [podcastForm, setPodcastForm] = useState({
    title: "",
    description: "",
    host: "",
  });
  const [podcastFile, setPodcastFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>("");
  const [allSeries, setAllSeries] = useState<PodcastSeries[]>([]);
  const [isServiceAvailable, setIsServiceAvailable] = useState<boolean>(true);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const server = import.meta.env.VITE_PODCAST_API;

  // Fetch all podcast series
  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const apiUrl = `${server}/api/v1/series/all`;
        console.log('Fetching podcast series from:', apiUrl);
        
        const response = await axios.get(apiUrl, {
          validateStatus: (status) => status < 500
        });
        
        console.log('Podcast series response:', response);
        
        if (response.status === 200) {
          setAllSeries(response.data || []);
          setIsServiceAvailable(true);
        } else {
          console.error('Failed to fetch podcast series. Status:', response.status);
          setIsServiceAvailable(false);
        }
      } catch (error) {
        console.error('Error fetching podcast series:', error);
        setIsServiceAvailable(false);
      }
    };

    // Initial fetch
    fetchSeries();
    
    // Set up polling to check service availability
    const intervalId = setInterval(fetchSeries, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  const handlePodcastFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPodcastFile(e.target.files[0]);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPodcastForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addPodcastHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!podcastFile || !coverImage) {
      toast.error("Please select both podcast file and cover image");
      return;
    }

    const formData = new FormData();
    formData.append("title", podcastForm.title);
    formData.append("description", podcastForm.description);
    formData.append("host", podcastForm.host);
    formData.append("file", podcastFile);
    formData.append("thumbnail", coverImage);

    try {
      setBtnLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(`/api/api/v1/series/new`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Podcast added successfully");
        // Reset form
        setPodcastForm({ title: "", description: "", host: "" });
        setPodcastFile(null);
        setCoverImage(null);
        setCoverImagePreview("");
        // Refresh the list
        const seriesResponse = await axios.get('/api/api/v1/series/all');
        setAllSeries(seriesResponse.data || []);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding podcast:", error);
      toast.error("Failed to add podcast");
    } finally {
      setBtnLoading(false);
    }
  };

  const deleteSeries = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this series?")) {
      try {
        setBtnLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.delete(`/api/api/v1/series/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          toast.success("Series deleted successfully");
          setAllSeries(prev => prev.filter(series => series._id !== id));
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error deleting series:", error);
        toast.error("Failed to delete series");
      } finally {
        setBtnLoading(false);
      }
    }
  };

  if (!isServiceAvailable) {
    return (
      <div className="p-4 bg-yellow-100 text-yellow-800 rounded">
        <p>Podcast service is currently unavailable. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold">Add New Podcast</h2>
      
      <form onSubmit={addPodcastHandler} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={podcastForm.title}
            onChange={handleInputChange}
            className="auth-input"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Description</label>
          <textarea
            name="description"
            value={podcastForm.description}
            onChange={handleInputChange}
            className="auth-input"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Host</label>
          <input
            type="text"
            name="host"
            value={podcastForm.host}
            onChange={handleInputChange}
            className="auth-input"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label>Podcast File</label>
            <input
              type="file"
              accept="audio/*"
              onChange={handlePodcastFileChange}
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
          {btnLoading ? "Adding..." : "Add Podcast"}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">All Podcast Series</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allSeries.map((series) => (
            <div
              key={series._id}
              className="border p-4 rounded-lg flex items-center justify-between"
            >
              <div>
                <h4 className="font-bold">{series.title}</h4>
                <p className="text-sm text-gray-600">{series.description.substring(0, 50)}...</p>
              </div>
              <button
                onClick={() => deleteSeries(series._id)}
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

export default AdminPodcast;
