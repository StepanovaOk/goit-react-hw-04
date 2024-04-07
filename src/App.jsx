import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import axios from "axios";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

function App() {
  const [photos, setPhotos] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    async function fetchImages() {
      setIsLoading(true);
      try {
        const { data } = await axios.get("https://api.unsplash.com/photos", {
          headers: {
            Authorization:
              "Client-ID a9z8qT1M8PxYiw2VDJFKFbmrBG_lR3Bwanizu8ioCKg",
          },
        });
        setPhotos(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        console.error("Error fetching images:", error);
      }
    }

    fetchImages();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!searchValue) return;

    setIsLoading(true);
    try {
      const { data } = await axios.get(
        "https://api.unsplash.com/search/photos/",
        {
          headers: {
            Authorization:
              "Client-ID a9z8qT1M8PxYiw2VDJFKFbmrBG_lR3Bwanizu8ioCKg",
          },
          params: {
            query: searchValue,
          },
        }
      );

      if (Array.isArray(data.results)) {
        setPhotos(data.results);
      } else {
        setPhotos(data.results.photos);
      }
    } catch (error) {
      setError(error);
      console.error("Error fetching images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <SearchBar
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
        onSubmit={onSubmit}
      />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {photos && !photos.length && <ErrorMessage />}
      <ImageGallery photos={photos} />
    </div>
  );
}

export default App;
