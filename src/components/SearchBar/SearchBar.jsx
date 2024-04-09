import styles from "./SearchBar.module.css";

const SearchBar = ({ onSubmit, searchValue, handleSearchChange }) => {
  return (
    <header>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit}>
          <button className={styles.btn} type="submit">
            &#x1F50D;
          </button>
          <input
            className={styles.inputField}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </form>
      </div>
    </header>
  );
};

export default SearchBar;
