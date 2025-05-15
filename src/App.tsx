import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import EmployeeCard from "./components/EmployeeCard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import EmployeeTabs from "./components/EmployeeTabs";

function App() {
  return (
    <Provider store={store}>
      <div className='flex h-screen'>
        {/* Sidebar - sticky full height */}
        <div className='sticky top-0 h-screen w-80 overflow-auto bg-white shadow'>
          <Sidebar />
        </div>

        {/* Main content area */}
        <div className='flex-1 flex flex-col bg-slate-100'>
          {/* Navbar sticky at top */}
          <div className='sticky top-0 z-10 bg-white'>
            <Navbar />
          </div>

          {/* Scrollable content below navbar */}
          <div className='flex-1 overflow-auto p-4'>
            <EmployeeCard />
            <EmployeeTabs />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
