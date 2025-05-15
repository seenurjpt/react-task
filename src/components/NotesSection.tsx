import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { RootState } from '../store';
import { addNote } from '../store/employeeSlice';

Modal.setAppElement('#root'); // or your app root id

const NotesSection = () => {
  const notes = useSelector((state: RootState) => state.employee.notes);
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [noteType, setNoteType] = useState<'positive' | 'negative'>('positive');
  const [noteDate, setNoteDate] = useState(() => new Date().toISOString().split('T')[0]); // yyyy-mm-dd

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setNoteContent('');
    setNoteType('positive');
    setNoteDate(new Date().toISOString().split('T')[0]);
    setModalIsOpen(false);
  };

  const handleAddNote = () => {
    if (noteContent.trim() === '') {
      alert('Please enter note content');
      return;
    }

    dispatch(
      addNote({
        id: Math.random(),
        content: noteContent,
        date: noteDate,
        type: noteType,
      }),
    );
    closeModal();
  };

  return (
    <aside className="max-w-4xl mx-auto mt-8 bg-white rounded-lg p-6 shadow">
      <header className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Notes</h3>
        <button
          onClick={openModal}
          className="px-3 py-1 border rounded hover:bg-indigo-600 hover:text-white transition"
        >
          + Add notes
        </button>
      </header>

      {notes.length === 0 ? (
        <p className="text-gray-500">No notes available.</p>
      ) : (
        notes.map(note => (
          <div
            key={note.id}
            className={`p-4 mb-3 rounded ${
              note.type === 'positive' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            <p className="underline mb-1">{note.content}</p>
            <small>{new Date(note.date).toLocaleDateString()}</small>
          </div>
        ))
      )}

      {/* Add Note Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Note"
        className="max-w-lg mx-auto mt-20 bg-white rounded-lg shadow-lg p-6 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex items-start justify-center z-50"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Add Note</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="noteContent">
            Note Content
          </label>
          <textarea
            id="noteContent"
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={noteContent}
            onChange={e => setNoteContent(e.target.value)}
          />
        </div>

        <div className="mb-4 flex space-x-4">
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={noteType}
              onChange={e => setNoteType(e.target.value as 'positive' | 'negative')}
            >
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={noteDate}
              onChange={e => setNoteDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleAddNote}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Add Note
          </button>
        </div>
      </Modal>
    </aside>
  );
};

export default NotesSection;
