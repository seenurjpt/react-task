import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store"; // Assuming 'store' is correctly typed in './store.ts'
import Sidebar from "./components/Sidebar"; // Assuming Sidebar and its props are typed in './components/Sidebar.tsx'
import Navbar from "./components/Navbar"; // Assuming Navbar and its props are typed in './components/Navbar.tsx'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NoPageFound from "./components/NoPageFound"; // Assuming NoPageFound is typed in './components/NoPageFound.tsx'
import EmployeeDetailsPage from "./components/EmployeeDetailsPage"; // Assuming EmployeeDetailsPage is typed in './components/EmployeeDetailsPage.tsx'
import { useState, ReactNode } from "react"; // Imported ReactNode for explicit typing

// Define props interface for MainLayout
interface MainLayoutProps {
  children: ReactNode; // Use ReactNode for children prop
}

function MainLayout({ children }: MainLayoutProps): JSX.Element {
  // Explicitly type the state and its setter for clarity, though TypeScript can infer this.
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // Explicitly type the function signature for clarity.
  const toggleSidebar = (): void => setSidebarOpen(!sidebarOpen);

  return (
    <div className='flex h-screen'>
      {/* Sidebar: sticky, always visible on the left */}
      <div className='sticky top-0 h-screen overflow-auto bg-white shadow z-20'>
        {/*
          Assuming SidebarProps are:
          interface SidebarProps {
            sidebarOpen: boolean;
            setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
          }
        */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
      {/* Main content area: flexible width, vertical flex layout */}
      <div className='flex-1 flex flex-col bg-slate-100'>
        {/* Navbar: sticky at the top of the main content area */}
        <div className='sticky top-0 z-10 bg-white'>
          {/*
            Assuming NavbarProps are:
            interface NavbarProps {
              toggleSidebar: () => void;
            }
          */}
          <Navbar toggleSidebar={toggleSidebar} />
        </div>
        {/* Page content: scrollable, takes remaining space */}
        <main className='p-4 flex-1 overflow-auto'>{children}</main>
      </div>
    </div>
  );
}

// App component: returns JSX.Element
function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Router>
        <MainLayout>
          <Routes>
            {/* Redirect from root to employee-management */}
            <Route
              path='/'
              element={<Navigate to='/employee-management' replace />}
            />
            {/* Employee management route */}
            <Route
              path='/employee-management'
              element={<EmployeeDetailsPage />} // Assuming EmployeeDetailsPage is a valid React component
            />
            {/* Catch-all route for 404 */}
            <Route path='*' element={<NoPageFound />} />{" "}
            {/* Assuming NoPageFound is a valid React component */}
          </Routes>
        </MainLayout>
      </Router>
    </Provider>
  );
}

export default App;
