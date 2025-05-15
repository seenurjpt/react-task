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
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="w-full flex flex-col">
        <Navbar />
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
