import React, { useState } from 'react';
import DetailsTab from './DetailsTab';
import DocumentsTab from './DocumentsTab';
import AttendanceTab from './AttendanceTab';
import PayslipsTab from './PayslipsTab';

const tabs = ['Details', 'Documents', 'Attendance', 'Payslips'] as const;
type Tab = typeof tabs[number];

const EmployeeTabs = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Details');

  return (
    <div className="max-w-4xl mx-auto rounded-lg">
      <nav className="flex space-x-6 border-b mb-6 text-sm font-medium text-gray-600">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 ${
              activeTab === tab
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'hover:text-indigo-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div>
        {activeTab === 'Details' && <DetailsTab />}
        {activeTab === 'Documents' && <DocumentsTab />}
        {activeTab === 'Attendance' && <AttendanceTab />}
        {activeTab === 'Payslips' && <PayslipsTab />}
      </div>
    </div>
  );
};

export default EmployeeTabs;
