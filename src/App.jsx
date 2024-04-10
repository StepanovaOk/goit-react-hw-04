import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import ReactModal from "react-modal";

import Loader from "./components/Loader/Loader";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageCard from "./components/ImageCard/ImageCard";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";

import "./App.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

ReactModal.setAppElement("#root");

function App() {
  const [error, setError] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const perPage = 12;
  let response;

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value.trim());
  };

  const handleClick = () => {
    setPhotos([]);
    setCurrentPage(1);
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onNextPage = async () => {
    setCurrentPage(currentPage + 1);
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
          page: currentPage + 1,
        },
      });

      setPhotos((prevPhotos) => [...prevPhotos, ...response.data.results]);
    } catch (error) {
      setError(error);
      console.error("Error fetching images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async () => {
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

  return (
    <div>
      <SearchBar
        handleClick={handleClick}
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
        onSubmit={onSubmit}
      />
      <ImageGallery photos={photos} openModal={openModal} />
      {photos && photos.length > 0 && <LoadMoreBtn onNextPage={onNextPage} />}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {(!photos || (photos.length === 0 && searchValue)) && !isLoading && (
        <ErrorMessage />
      )}
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {selectedPhoto && (
          <img
            src={selectedPhoto.urls.regular}
            alt={selectedPhoto.alt_description}
          />
        )}
      </ReactModal>
    </div>
  );
}

export default App;
