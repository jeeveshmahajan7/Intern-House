import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useJobContext from "../context/JobContext";

const JobDetails = () => {
  const { API, jobsList, jobsLoading } = useJobContext();
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loadingSingle, setLoadingSingle] = useState(false);

  // check if job exists in context first
  useEffect(() => {
    const found = jobsList.find((j) => j._id === jobId);
    if (found) {
      setJob(found);
      return;
    }

    // otherwise fetch from backend
    const fetchJob = async () => {
      setLoadingSingle(true);
      try {
        const res = await fetch(`${API}/jobs/${jobId}`);
        const data = await res.json();
        if (data.job) setJob(data.job);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingSingle(false);
      }
    };

    fetchJob();
  }, [jobId, jobsList, API]);

  if (jobsLoading || loadingSingle)
    return <p className="text-center text-muted fs-5 py-5">Loading job details...</p>;

  if (!job)
    return <p className="text-center text-muted fs-5 py-5">No job found.</p>;

  return (
    <div className="container">
      <h1 className="my-3">{job.title}</h1>
      <div className="card">
        <div className="card-body">
          <p><strong>Company Name:</strong> {job.companyName}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Salary:</strong> ₹{job.salary}</p>
          <p><strong>Job Type:</strong> {job.jobType}</p>
          <p><strong>Description:</strong> {job.jobDescription}</p>
          <strong>Qualifications:</strong>
          <ol className="mt-2">
            {job.qualifications.map((q, i) => <li key={i}>{q}</li>)}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
