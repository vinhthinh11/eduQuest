import { useState } from 'react';

function PaginateComponent({ users, perPage = 10 }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users?.length / perPage) || 1;

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };
  return (
    <div className="flex justify-center px-10 border-t-2 border-black pt-4">
      <div className="pagination pb-3 flex gap-2">
        <button
          className="min-w-20 bg-customPurple hover:bg-customPurpleLight text-white py-2 px-4 rounded-md"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Trước
        </button>
        <button
          disabled
          className="bg-customPurple hover:bg-customPurpleLight text-white py-2 px-4 rounded-md"
        >
          {`${currentPage}/${totalPages}`}
        </button>
        <button
          className=" min-w-20 bg-customPurple hover:bg-customPurpleLight text-white py-2 px-4 rounded-md"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Sau
        </button>
      </div>
    </div>
  );
}

export default PaginateComponent;
