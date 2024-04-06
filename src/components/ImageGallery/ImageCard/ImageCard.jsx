const ImageCard = ({ photo }) => {
  return (
    <li>
      <img width={350} src={photo.urls.small} alt={photo.alt_description} />
    </li>
  );
};

export default ImageCard;
