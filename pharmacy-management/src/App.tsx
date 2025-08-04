import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { routesConfig } from "./routes/Routes-config";
import { SideBar } from "./layouts/Sidebar";
import { Navbar } from "./layouts/Navbar";

function App() {
  const [miniSidebar, setMiniSidebar] = useState(false);

  return (
    <Router>
      <div className="flex bg-[#eff7f9]">
        {/* Sidebar */}
        <aside
          className={`fixed left-0 bg-primary ${
            !miniSidebar ? "w-20" : "w-72 z-[30]"
          } h-screen overflow-y-auto`}>
          <SideBar miniSidebar={miniSidebar} setMiniSidebar={setMiniSidebar} />
        </aside>

        {/* Main Content */}
        <div
          className={`flex-1 flex flex-col ${
            !miniSidebar ? "pl-20" : "pl-72"
          }`}>
          {/* Navbar */}
          <header
            className={`fixed top-0 pl-2 right-0 ${
              miniSidebar ? " left-[216px]" : "left-[60px]"
            } bg-white z-20`}>
            <Navbar />
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto mt-16 pt-4 bg-[#eff7f9] min-h-screen">
            <div className="px-5">
              <Routes>
                {routesConfig.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
            </div>
          </main>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
