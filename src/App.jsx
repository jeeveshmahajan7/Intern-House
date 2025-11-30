import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

import { JobProvider } from "./context/JobContext";
import Navbar from "./components/Navbar";
import JobPostings from "./pages/JobPostings";
import PostJob from "./pages/PostJob";
import JobDetails from "./pages/JobDetails";

function App() {
  return (
    <>
      <JobProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<JobPostings />} />
            <Route path="/post" element={<PostJob />} />
            <Route path="/post/:jobId" element={<JobDetails />} />
          </Routes>

          <ToastContainer position="top-right" autoClose={2000} />
        </Router>
      </JobProvider>
    </>
  );
}

export default App;
