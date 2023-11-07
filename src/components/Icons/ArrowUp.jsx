const ArrowLeft = ({ hovered }) => {
  return (
    <svg
      width="24"
      height="15"
      viewBox="0 0 24 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.707107 11.4729C0.316583 11.8634 0.316582 12.4966 0.707107 12.8871L2.11366 14.2937C2.50389 14.6839 3.13646 14.6842 3.52711 14.2944L12 5.84L20.4729 14.2944C20.8635 14.6842 21.4961 14.6839 21.8863 14.2937L23.2929 12.8871C23.6834 12.4966 23.6834 11.8634 23.2929 11.4729L12 0.18L0.707107 11.4729Z"
        fill={!hovered ? 'black' : '#d66600'}
        fillOpacity="0.7"
      />
    </svg>
  );
};

export default ArrowLeft;
