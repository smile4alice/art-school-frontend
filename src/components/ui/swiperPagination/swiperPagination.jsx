import s from './swiperPagination.module.scss';

const SwiperPagination = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <div className={s.customPagination}>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={currentPage === i + 1 ? s.active : ''}
          onClick={() => handlePageChange(i + 1)}
        >
        </button>
      ))}
    </div>
  );
};

export default SwiperPagination;
