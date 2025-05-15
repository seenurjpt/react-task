import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import EmployeeCard from "./components/EmployeeCard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import EmployeeTabs from "./components/EmployeeTabs";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import NoPageFound from "./components/NoPageFound";
import EmployeeDetailsPage from "./components/EmployeeDetailsPage";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
     <div className='flex h-screen'>
      <div className='sticky top-0 h-screen w-80 overflow-auto bg-white shadow'>
          <Sidebar />
        </div>
      <div className="flex-1 flex flex-col bg-slate-100">
        <div className='sticky top-0 z-10 bg-white'>
            <Navbar />
          </div>
          {/* flex-1 overflow-auto p-4 */}
        <main className="p-6 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/employee-management" replace />} />
            <Route path="/employee-management" element={<EmployeeDetailsPage />} />
            <Route path="*" element={<NoPageFound />} />
          </Routes>
        </MainLayout>
      </Router>
    </Provider>
  );
}

export default App;
