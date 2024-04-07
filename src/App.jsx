import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import axios from "axios";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";

function App() {
  const [photos, setPhotos] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    async function fetchImages() {
      try {
        const { data } = await axios.get("https://api.unsplash.com/photos", {
          headers: {
            Authorization:
              "Client-ID a9z8qT1M8PxYiw2VDJFKFbmrBG_lR3Bwanizu8ioCKg",
          },
        });
        setPhotos(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchImages();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!searchValue) return;
    try {
      const { data } = await axios.get(
        "https://api.unsplash.com/search/photos",
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
      setPhotos(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <div>
      <SearchBar
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
        onSubmit={onSubmit}
      />
      <ImageGallery photos={photos} />
    </div>
  );
}

export default App;
