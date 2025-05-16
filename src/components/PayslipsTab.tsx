import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPayslips } from "../store/employeeTabsSlice";
import { RootState, AppDispatch } from "../store";
import { FaFileInvoiceDollar, FaEye } from "react-icons/fa";
import Loader from "./Loader";

const PayslipsTab = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { payslips, loading, error } = useSelector(
    (state: RootState) => state.employeeTabs
  );

  useEffect(() => {
    dispatch(fetchPayslips());
  }, [dispatch]);

  if (loading)
    return (
      <div className='bg-white rounded-lg p-6 border border-gray-200 text-center'>
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className='bg-white rounded-lg p-6 border border-gray-200 text-red-600 text-center'>
        Error: {error}
      </div>
    );

  return (
    <div className='bg-white rounded-lg p-6 border border-gray-200'>
      {payslips.length === 0 ? (
        <p className='text-sm text-gray-500 text-center'>
          No payslips available.
        </p>
      ) : (
        <div className='space-y-3'>
          {payslips.map(({ id, month, year, amount, url }) => (
            <div
              key={id}
              className='flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors duration-150'
            >
              <div className='flex items-center space-x-3'>
                <FaFileInvoiceDollar className='text-gray-400 h-5 w-5 flex-shrink-0' />
                <div>
                  <p className='text-sm font-medium text-gray-800'>
                    {month} {year}
                  </p>
                  <a
                    href={url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-xs text-indigo-600 hover:text-indigo-700 hover:underline flex items-center space-x-1'
                  >
                    <FaEye className='h-3 w-3' />
                    <span>View Payslip</span>
                  </a>
                </div>
              </div>
              <div className='text-sm font-semibold text-gray-800'>
                ${amount}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PayslipsTab;
