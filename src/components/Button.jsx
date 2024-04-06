function Button({ children, onClick, disabled, variant }) {
  const style =
    variant === 'solid'
      ? 'bg-customPurple hover:bg-customPurpleLight text-white py-2 px-4 rounded-md'
      : 'bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded';
  return (
    <button
      className="bg-customPurple hover:bg-customPurpleLight text-white py-2 px-4 rounded-md"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
