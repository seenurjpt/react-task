import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store';
import EmployeeCard from './components/EmployeeCard';

function App() {
  return (
    <>
         <Provider store={store}>
            <EmployeeCard />
            {/* <EmployeeTabs /> */}
         </Provider>
    </>
  );
}

export default App;
