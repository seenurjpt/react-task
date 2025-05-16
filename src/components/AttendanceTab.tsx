import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAttendance } from "../store/employeeTabsSlice";
import { RootState, AppDispatch } from "../store";

const AttendanceTab = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { attendance, loading, error } = useSelector(
    (state: RootState) => state.employeeTabs
  );

  useEffect(() => {
    dispatch(fetchAttendance());
  }, [dispatch]);

  if (loading)
    return <div className='p-6 text-center'>Loading attendance...</div>;
  if (error)
    return <div className='p-6 text-red-600 text-center'>Error: {error}</div>;

  return (
    <div className='bg-white rounded-lg p-6 border border-gray-200'>
      <div className='overflow-x-auto'>
        <table className='min-w-full'>
          <thead className='bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Date
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {attendance.length === 0 ? (
              <tr>
                <td
                  colSpan={2}
                  className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center'
                >
                  No attendance records found.
                </td>
              </tr>
            ) : (
              attendance.map(({ date, status }) => (
                <tr key={date}>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                    {date}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      status === "Present"
                        ? "text-green-600"
                        : status === "Absent"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTab;
