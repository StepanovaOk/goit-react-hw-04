const ImageCard = ({ photo, openModal }) => {
  return (
    <li>
      <img
        width={350}
        src={photo.urls.small}
        alt={photo.alt_description}
        onClick={() => {
          openModal(photo);
        }}
      />
    </li>
  );
};

export default ImageCard;
