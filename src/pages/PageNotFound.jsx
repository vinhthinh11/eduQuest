import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <img src="../../public/images/404.png" width="350" alt="Page Not Found" className="mx-auto" />
        <h3 className="mt-8 mb-4 text-xl font-bold">Oops! Page not found</h3>
        <p className="mb-8">It's looking like you may have taken a wrong turn. Don't worry... it happens to the best of us. Here's a little tip that might help you get back on track.</p>
        <Link to="/" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full inline-flex items-center">
           Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
