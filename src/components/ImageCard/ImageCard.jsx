import styles from "./ImageCard.module.css";
import ReactModal from "react-modal";

const ImageCard = ({ photo, openModal }) => {
  return (
    <li>
      <img
        className={styles.ImageCard}
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
