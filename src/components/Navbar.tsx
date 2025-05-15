import { FaSearch, FaBars, FaBell } from "react-icons/fa";

interface UserData {
  profile?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

const userData: UserData = {
  firstName: "Peter",
  lastName: "West",
  role: "Superadmin",
  // profile: "/logo1.png",
};

const Navbar = () => {
  return (
    <header className='bg-white px-4 py-3 shadow-sm flex justify-between items-center'>
      <div className='flex items-center gap-4 flex-1'>
        {/* Search Input */}
        <div className='relative w-full max-w-xs'>
          {" "}
          {/* max-w-xs or adjust as needed */}
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <FaSearch className='h-4 w-4 text-gray-400' />
          </div>
          <input
            type='text'
            placeholder='Search'
            className='block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md
                       leading-5 bg-white placeholder-gray-400 text-sm
                       focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
          />
        </div>
      </div>

      <div className='flex items-center gap-4 md:gap-5 ml-4'>
        {" "}
        <div className='relative'>
          <button
            className='text-gray-500 hover:text-gray-700 focus:outline-none'
            aria-label='Notifications'
          >
            <FaBell className='h-5 w-5' />{" "}
            <span className='absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-1 ring-white' />
          </button>
        </div>
        <div className='relative w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center overflow-hidden ring-1 ring-gray-300'>
          {userData?.profile ? (
            <img
              src={
                userData.profile.startsWith("http")
                  ? userData.profile
                  : `/${
                      userData.profile.startsWith("/")
                        ? userData.profile.substring(1)
                        : userData.profile
                    }`
              }
              alt='avatar'
              className='object-cover w-full h-full'
            />
          ) : (
            <span className='text-white text-sm font-medium'>
              {userData?.firstName?.charAt(0).toUpperCase()}
              {userData?.lastName?.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
