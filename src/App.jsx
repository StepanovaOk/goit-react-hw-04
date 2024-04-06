import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import axios from "axios";
import ImageGallery from "./components/ImageGallery/ImageGallery";

function App() {
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const { data } = await axios.get("https://api.unsplash.com/photos", {
          headers: {
            Authorization:
              "Client-ID a9z8qT1M8PxYiw2VDJFKFbmrBG_lR3Bwanizu8ioCKg",
          },
        });
        console.log("data: ", data);
        setPhotos(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchImages();
  }, []);

  return <ImageGallery photos={photos} />;
}

export default App;
