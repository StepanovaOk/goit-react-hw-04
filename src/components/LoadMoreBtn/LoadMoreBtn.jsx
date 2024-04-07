const LoadMoreBtn = ({ onNextPage }) => {
  return (
    <div>
      <button onClick={onNextPage} type="submit">
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
