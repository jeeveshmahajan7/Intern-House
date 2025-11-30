import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const JobContext = createContext();
const useJobContext = () => useContext(JobContext);

export default useJobContext;

export const JobProvider = ({ children }) => {
  const API = "https://intern-house-backend-nine.vercel.app";
  const [jobsList, setJobsList] = useState([]);
  const [refreshJobs, setRefreshJobs] = useState(false); // state to manage auto refresh of jobs

  // logic to auto refresh jobs on job deleted
  const autoRefreshJobs = () => {
    setRefreshJobs((prev) => !prev);
  };

  // 1. Fetching Jobs' List
  const {
    data: jobsData,
    loading: jobsLoading,
    error: jobsError,
  } = useFetch(`${API}/jobs`, [refreshJobs]);

  // to remove flickering on initial load
  // const isInitialLoading = jobsLoading && jobsList.length === 0;

  useEffect(() => {
    if (jobsData?.jobs) {
      setJobsList(jobsData.jobs);
    }
  }, [jobsData]);

  return (
    <JobContext.Provider
      value={{ API, jobsList, jobsLoading, jobsError, autoRefreshJobs }}
    >
      {children}
    </JobContext.Provider>
  );
};
