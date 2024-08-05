interface IFormBtn {
  text: string;
  loading: boolean;
}

const FormBtn = ({ text, loading }: IFormBtn) => {
  return (
    <button
      disabled={loading}
      className='primary-btn py-2 disabled:cursor-not-allowed disabled:bg-neutral-600 disabled:text-pink-400'
    >
      {loading ? 'LOADING' : text}
    </button>
  );
};
export default FormBtn;
