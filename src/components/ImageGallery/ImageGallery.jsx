import ImageCard from "./ImageCard/ImageCard";

const ImageGallery = ({ photos }) => {
  return (
    <div>
      <ul>
        {photos &&
          photos.map((photo) => {
            return <ImageCard key={photo.id} photo={photo} />;
          })}
      </ul>
    </div>
  );
};

export default ImageGallery;
