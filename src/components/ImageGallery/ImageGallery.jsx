const ImageGallery = ({ photos }) => {
  return (
    <div>
      <ul>
        {photos &&
          photos.map((photo) => {
            return (
              <li key={photo.id}>
                <img
                  width={350}
                  src={photo.urls.small}
                  alt={photo.alt_description}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ImageGallery;
