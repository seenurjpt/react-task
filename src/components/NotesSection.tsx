import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { RootState } from '../store'; // Ensure this path is correct
import { addNote } from '../store/employeeSlice'; // Ensure this path is correct
import { FaPlus } from 'react-icons/fa'; // For the plus icon

Modal.setAppElement('#root');

interface Note {
  id: number;
  content: string;
  date: string;
  priority: 'important' | 'normal';
}

const NotesSection = () => {
  const notes: Note[] = useSelector((state: RootState) => state.employee.notes || []);
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [priority, setPriority] = useState<'important' | 'normal'>('normal');
  const [noteDate, setNoteDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [noteContentError, setNoteContentError] = useState<string | null>(null);


  const openModal = () => {
    setNoteContentError(null); // Clear error when opening modal
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setNoteContent('');
    setPriority('normal');
    setNoteDate(new Date().toISOString().split('T')[0]);
    setNoteContentError(null); // Clear error on close
    setModalIsOpen(false);
  };

  const handleAddNote = () => {
    if (!noteContent.trim()) {
      setNoteContentError('Note content is required.');
      return;
    }
    setNoteContentError(null); // Clear error if validation passes

    dispatch(
      addNote({
        id: Date.now(),
        content: noteContent,
        date: noteDate,
        priority,
      }),
    );
    closeModal();
  };

  const getPriorityClasses = (notePriority: 'important' | 'normal') => {
    if (notePriority === 'important') {
      return 'bg-red-50';
    }
    return 'bg-green-50';
  };

  const getTextColor = (notePriority: 'important' | 'normal') => {
    if (notePriority === 'important') {
      return 'text-black';
    }
    return 'text-black';
  };

  const formatDate = (dateString: string) => {
    try {
      const dateObj = new Date(dateString);
      if (isNaN(dateObj.getTime())) {
        return "Invalid Date";
      }
      const userTimezoneOffset = dateObj.getTimezoneOffset() * 60000;
      return new Date(dateObj.getTime() + userTimezoneOffset).toLocaleDateString('en-GB', { // en-GB for DD/MM/YYYY
        year: 'numeric',
        month: '2-digit', // Ensures two digits for month
        day: '2-digit',   // Ensures two digits for day
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };

  return (
    <aside className="bg-white rounded-lg shadow p-6 border border-gray-200 mt-14 flex flex-col">
      <header className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Notes</h3>
      </header>

      <div className="flex-grow space-y-3 overflow-y-auto pr-1 custom-scrollbar">
        {notes.length === 0 ? (
          <p className="text-sm text-gray-500 text-center pt-4">No notes available.</p>
        ) : (
          notes.map(note => (
            <div
              key={note.id}
              className={`p-3 rounded-md ${getPriorityClasses(note.priority)}`}
            >
              <p className={`text-sm mb-1 ${getTextColor(note.priority)}`}>
                {note.content}
              </p>
              <small className="text-xs text-gray-500">
                {formatDate(note.date)}
              </small>
            </div>
          ))
        )}
      </div>

      <div className="mt-auto pt-4">
        <button
          onClick={openModal}
          className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
        >
          <FaPlus className="mr-2 h-4 w-4" />
          Add notes
        </button>
      </div>

      {/* --- MODAL --- */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add New Note"
        overlayClassName="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" // Slightly less opacity
        className="bg-white rounded-xl shadow-2xl flex flex-col max-w-lg w-full max-h-[95vh] outline-none" // rounded-xl, shadow-2xl, max-w-lg
      >
        {/* Modal Header */}
        <div className="px-8 py-5 border-b border-gray-200"> {/* Increased padding */}
          <h2 className="text-xl font-semibold text-gray-800 text-center"> {/* font-semibold, text-gray-800 */}
            Add New Note
          </h2>
        </div>

        {/* Modal Body */}
        <div className="px-8 py-6 flex-grow overflow-y-auto custom-scrollbar"> {/* Increased padding */}
          <div className="space-y-6"> {/* Increased space-y */}
            <div>
              <label htmlFor="noteContent" className="block text-sm font-semibold text-gray-800 mb-1.5"> {/* font-semibold, text-gray-800 */}
                Note Content
              </label>
              <textarea
                id="noteContent"
                rows={5} // Adjusted rows
                className={`block w-full rounded-lg border p-2.5 text-sm text-gray-900 placeholder-gray-400 focus:ring-1 resize-y
                                  ${noteContentError
                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                                  }`}
                value={noteContent}
                onChange={e => {
                    setNoteContent(e.target.value);
                    if (e.target.value.trim()) {
                        setNoteContentError(null); // Clear error as user types if content is not empty
                    }
                }}
                placeholder="Enter your note here..."
              />
              {noteContentError && (
                <p className="mt-1.5 text-xs text-red-600">{noteContentError}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6"> {/* Increased gap */}
              <div>
                <label htmlFor="priority" className="block text-sm font-semibold text-gray-800 mb-1.5">Priority</label>
                <select
                  id="priority"
                  className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  value={priority}
                  onChange={e => setPriority(e.target.value as 'important' | 'normal')}
                >
                  <option value="normal">Normal</option>
                  <option value="important">Important</option>
                </select>
              </div>

              <div>
                <label htmlFor="noteDate" className="block text-sm font-semibold text-gray-800 mb-1.5">Date</label>
                <input
                  id="noteDate"
                  type="date"
                  className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  value={noteDate} // Value must be YYYY-MM-DD
                  onChange={e => setNoteDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-5 border-t border-gray-200 flex justify-end items-center space-x-3"> {/* Increased padding */}
          <button
            type="button"
            onClick={closeModal}
            className="px-5 py-2.5 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1" // Adjusted focus ring
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAddNote}
            className="px-5 py-2.5 rounded-lg border border-transparent bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1" // Adjusted focus ring
          >
            Add Note
          </button>
        </div>
      </Modal>
    </aside>
  );
};

export default NotesSection;