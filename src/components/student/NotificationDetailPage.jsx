import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NotificationDetailPage = () => {
  const location = useLocation();
  const notification = location.state.notification;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false); 
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Chi tiết thông báo</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{notification.notification_title}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{notification.time_sent}</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="sm:flex sm:divide-x sm:divide-gray-200">
                <div className="px-4 py-2 sm:w-1/3 sm:text-right font-semibold">Content:</div>
                <div className="px-4 py-2 sm:w-2/3">{notification.notification_content}</div>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDetailPage;