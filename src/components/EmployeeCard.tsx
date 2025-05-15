
import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { FaPencilAlt, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateEmployee, EmployeeData } from '../store/employeeSlice';
import Modal from "react-modal"
Modal.setAppElement('#root');

const EmployeeCard = () => {
  const dispatch = useDispatch();
  const employee = useSelector((state: RootState) => state.employee.employeeData);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState<EmployeeData>(employee);
  const [previewImage, setPreviewImage] = useState<string | null>(employee.image);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (modalIsOpen) {
      setFormData(employee);
      setPreviewImage(employee.image);
    }
  }, [employee, modalIsOpen]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
  };

  const handleSave = () => {
    dispatch(updateEmployee({ ...formData, image: previewImage }));
    closeModal();
  };

  return (
    <>
      <section className="bg-white rounded-lg shadow p-6 flex space-x-6 mb-6 relative max-w-4xl mx-auto">
        <div className="relative">
          <img
            src={employee.image || 'https://via.placeholder.com/128'}
            alt={employee.name}
            className="w-32 h-32 rounded-lg object-cover"
          />
          <button
            onClick={openModal}
            aria-label="Edit"
            className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow hover:bg-gray-200 transition"
          >
            <FaPencilAlt size={18} />
          </button>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold flex items-center space-x-2">
            <span>{employee.name}</span>
            <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded">Active</span>
          </h1>
          <a
            href={employee.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 text-sm block mb-1 flex items-center gap-2"
          >
            <FaLinkedin /> {employee.position}
          </a>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <FaEnvelope /> {employee.email}
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <FaPhone /> {employee.phone}
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <FaMapMarkerAlt /> {employee.address}
          </p>
        </div>
      </section>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Employee Details"
        className="max-w-lg mx-auto mt-20 bg-white rounded-lg shadow-lg p-6 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex items-start justify-center z-50"
      >
        <h2 className="text-xl font-semibold mb-4">Edit Employee Details</h2>

        {/* Image Upload */}
        <div className="mb-4 flex flex-col items-center relative">
          {previewImage ? (
            <div className="relative inline-block">
              <img
                src={previewImage}
                alt="Preview"
                className="w-32 h-32 rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-0 right-0 bg-white rounded-full p-1 shadow hover:bg-gray-200 text-gray-600"
                aria-label="Remove Image"
              >
                ×
              </button>
            </div>
          ) : (
            <p className="text-gray-500 mb-2">No image selected</p>
          )}

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-indigo-600 hover:underline mt-2"
          >
            Change Image
          </button>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Position</span>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">LinkedIn URL</span>
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-3 py-2"
              placeholder="https://linkedin.com/in/username"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Phone</span>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Address</span>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-3 py-2 resize-none"
              rows={2}
            />
          </label>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </Modal>
    </>
  );
};

export default EmployeeCard;
