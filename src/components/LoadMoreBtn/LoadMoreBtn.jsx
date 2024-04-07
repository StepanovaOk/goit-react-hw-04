const LoadMoreBtn = ({ onNextPage }) => {
  return (
    <div>
      <button onClick={onNextPage} type="button">
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
