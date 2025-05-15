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
      <div className='flex'>
        <Sidebar />
        <div className='w-full'>
          <Navbar />
          <EmployeeCard />
      <EmployeeTabs />
        </div>
      </div>
    </Provider>
  );
}

export default App;
