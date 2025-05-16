import { useState, ChangeEvent, useRef, useEffect } from "react";
import {
  FaPencilAlt,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTimes,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { updateEmployee, EmployeeData } from "../store/employeeSlice";
import Modal from "react-modal";

Modal.setAppElement("#root");

const EmployeeCard = () => {
  const dispatch = useDispatch();
  const employee = useSelector(
    (state: RootState) => state.employee.employeeData
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState<EmployeeData>(employee);
  const [previewImage, setPreviewImage] = useState<string | null>(
    employee.image
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (modalIsOpen) {
      setFormData(employee);
      setPreviewImage(employee.image);
    }
  }, [employee, modalIsOpen]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      <section className='bg-white rounded-lg shadow p-6 flex space-x-6 mb-6 relative mx-auto'>
        <div className='flex-shrink-0'>
          <img
            src={employee.image || "/user.jpg"}
            alt={employee.name}
            className='w-16 h-16 md:w-32 md:h-32 rounded-lg object-cover'
          />
        </div>
        <div className='flex-1'>
          <div className='flex items-center space-x-2 mb-1'>
            <h1 className='text-2xl font-semibold text-gray-800'>
              {employee.name}
            </h1>
            <span className='text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-md'>
              Active
            </span>
            <button
              onClick={openModal}
              aria-label='Edit employee details'
              className='text-gray-400 hover:text-gray-600 transition-colors duration-150'
            >
              <FaPencilAlt size={15} />
            </button>
          </div>
          <p className='text-sm font-medium text-indigo-600 mb-2'>
            {employee.position}
          </p>
          <a
            href={employee.linkedin}
            target='_blank'
            rel='noopener noreferrer'
            className='text-sm text-gray-600 hover:text-indigo-500 flex items-center gap-2 mb-1 truncate' // Added truncate for long URLs
          >
            <FaLinkedin size={14} className='text-gray-400 flex-shrink-0' />
            <span className='truncate'>{employee.linkedin}</span>
          </a>
          <p className='text-sm text-gray-600 flex items-center gap-2 mb-1'>
            <FaEnvelope size={14} className='text-gray-400 flex-shrink-0' />
            {employee.email}
          </p>
          <p className='text-sm text-gray-600 flex items-center gap-2 mb-1'>
            <FaPhone size={14} className='text-gray-400 flex-shrink-0' />
            {employee.phone}
          </p>
          <p className='text-sm text-gray-600 flex items-center gap-2'>
            <FaMapMarkerAlt size={14} className='text-gray-400 flex-shrink-0' />
            {employee.address}
          </p>
        </div>
      </section>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Edit Employee Details'
        overlayClassName='fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50' // Consistent overlay
        className='bg-white rounded-xl shadow-2xl flex flex-col max-w-lg w-full max-h-[95vh] outline-none' // Consistent modal shell
      >
        <div className='px-8 py-5 border-b border-gray-200 flex-shrink-0'>
          {" "}
          <h2 className='text-xl font-semibold text-gray-800 text-center'>
            {" "}
            Edit Employee Details
          </h2>
        </div>

        <div className='px-8 py-6 flex-grow overflow-y-auto custom-scrollbar'>
          {" "}
          {/* Image Upload Section */}
          <div className='mb-6 flex flex-col items-center'>
            <div className='relative inline-block mb-2'>
              <img
                src={previewImage || "user.jpg"}
                alt='Preview'
                className='w-24 h-24 rounded-lg object-cover'
              />
              {previewImage && (
                <button
                  type='button'
                  onClick={handleRemoveImage}
                  className='absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-100 text-red-600 rounded-full p-0.5 shadow hover:bg-red-200 w-5 h-5 flex items-center justify-center text-xs'
                  aria-label='Remove Image'
                >
                  <FaTimes />
                </button>
              )}
            </div>
            <input
              type='file'
              accept='image/*'
              ref={fileInputRef}
              className='hidden'
              onChange={handleImageChange}
            />
            <button
              type='button'
              onClick={() => fileInputRef.current?.click()}
              className='text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:underline' // Added hover:underline
            >
              {previewImage ? "Change Image" : "Upload Image"}
            </button>
          </div>
          {/* Form Inputs */}
          <div className='space-y-5'>
            {" "}
            {/* Adjusted space-y slightly */}
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-semibold text-gray-800 mb-1.5'
              >
                Name
              </label>{" "}
              {/* Consistent label */}
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name} // Assuming formData and handleChange are defined
                onChange={handleChange}
                className='block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500' // Consistent input
              />
            </div>
            <div>
              <label
                htmlFor='position'
                className='block text-sm font-semibold text-gray-800 mb-1.5'
              >
                Position
              </label>
              <input
                type='text'
                id='position'
                name='position'
                value={formData.position}
                onChange={handleChange}
                className='block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>
            <div>
              <label
                htmlFor='linkedin'
                className='block text-sm font-semibold text-gray-800 mb-1.5'
              >
                LinkedIn URL
              </label>
              <input
                type='text'
                id='linkedin'
                name='linkedin'
                value={formData.linkedin}
                onChange={handleChange}
                className='block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400' // Added placeholder style
                placeholder='https://linkedin.com/in/username'
              />
            </div>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-semibold text-gray-800 mb-1.5'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>
            <div>
              <label
                htmlFor='phone'
                className='block text-sm font-semibold text-gray-800 mb-1.5'
              >
                Phone
              </label>
              <input
                type='text'
                id='phone'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                className='block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>
            <div>
              <label
                htmlFor='address'
                className='block text-sm font-semibold text-gray-800 mb-1.5'
              >
                Address
              </label>
              <textarea
                id='address'
                name='address'
                value={formData.address}
                onChange={handleChange}
                className='block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 resize-y' // Changed resize-none to resize-y
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className='px-8 py-5 border-t border-gray-200 flex justify-end items-center space-x-3 flex-shrink-0'>
          {" "}
          {/* Consistent padding */}
          <button
            type='button'
            onClick={closeModal}
            className='px-5 py-2.5 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1' // Consistent button
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={handleSave}
            className='px-5 py-2.5 rounded-lg border border-transparent bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1' // Consistent button
          >
            Save Changes
          </button>
        </div>
      </Modal>
    </>
  );
};

export default EmployeeCard;
