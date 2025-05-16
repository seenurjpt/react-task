import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDocuments } from '../store/employeeTabsSlice';
import { RootState, AppDispatch } from '../store';
import { FaFileAlt, FaDownload } from 'react-icons/fa';
import Loader from './Loader';

const DocumentsTab = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { documents, loading, error } = useSelector((state: RootState) => state.employeeTabs);

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  if (loading) return <div className="bg-white rounded-lg p-6 border border-gray-200 text-center"><Loader/></div>;
  if (error) return <div className="bg-white rounded-lg p-6 border border-gray-200 text-red-600 text-center">Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      {documents.length === 0 ? (
        <p className="text-sm text-gray-500 text-center">No documents have been uploaded.</p>
      ) : (
        <ul className="space-y-3">
          {documents.map((doc) => (
            <li
              key={doc.id}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex items-center space-x-3">
                <FaFileAlt className="text-gray-400 h-5 w-5 flex-shrink-0" />
                <div>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
                  >
                    {doc.name}
                  </a>
                  {doc.uploadedDate && (
                    <p className="text-xs text-gray-500">
                      Uploaded: {doc.uploadedDate}
                    </p>
                  )}
                </div>
              </div>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="text-gray-400 hover:text-indigo-600 p-1 rounded-full hover:bg-indigo-50"
                aria-label={`Download ${doc.name}`}
              >
                <FaDownload className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DocumentsTab;