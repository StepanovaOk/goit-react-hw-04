import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import axios from "axios";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";

function App() {
  const [photos, setPhotos] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 4;
  let response;

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const onNextPage = (event) => {
    setCurrentPage(currentPage + 1);
    onSubmit(event);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!searchValue) {
      return;
    } else {
      setIsLoading(true);
      try {
        response = await axios.get("https://api.unsplash.com/search/photos/", {
          headers: {
            Authorization:
              "Client-ID a9z8qT1M8PxYiw2VDJFKFbmrBG_lR3Bwanizu8ioCKg",
          },
          params: {
            query: searchValue,
            per_page: perPage,
            page: currentPage,
          },
        });

        if (currentPage === 1) {
          setPhotos(response.data.results);
        } else {
          setPhotos((prevPhotos) => [...prevPhotos, ...response.data.results]);
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    onSubmit();
  }, [currentPage]);

  useEffect(() => {
    setPhotos([]);
    setCurrentPage(1);
  }, [searchValue]);

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
      {photos && photos.length > 0 && <LoadMoreBtn onNextPage={onNextPage} />}
    </div>
  );
}

export default App;
