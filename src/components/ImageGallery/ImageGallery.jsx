import ImageCard from "./ImageCard/ImageCard";

const ImageGallery = ({ photos, openModal }) => {
  return (
    <div>
      <ul>
        {photos &&
          photos.map((photo) => {
            return (
              <ImageCard key={photo.id} photo={photo} openModal={openModal} />
            );
          })}
      </ul>
    </div>
  );
};

export default ImageGallery;
