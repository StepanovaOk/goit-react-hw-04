import styles from "./ImageModal.module.css";
import ReactModal from "react-modal";

const ImageModal = ({ photo, closeModal }) => {
  return (
    <ReactModal isOpen={true} onRequestClose={closeModal} style={customStyles}>
      <img src={photo.urls.regular} alt={photo.alt_description} />
    </ReactModal>
  );
};

export default ImageModal;
