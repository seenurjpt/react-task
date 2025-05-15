import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import EmployeeCard from "./components/EmployeeCard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Provider store={store}>
      <div className='flex'>
        <Sidebar />
        <div className='w-full'>
          <Navbar />
          <EmployeeCard />
        </div>
      </div>
      {/* <EmployeeTabs /> */}
    </Provider>
  );
}

export default App;
