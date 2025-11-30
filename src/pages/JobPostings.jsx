import { toast } from "react-toastify";
import useJobContext from "../context/JobContext";
import { useEffect, useState } from "react";

const JobPostings = () => {
  const { API, jobsList, jobsLoading, jobsError, autoRefreshJobs } =
    useJobContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingJobId, setdeletingJobId] = useState(null); // to handle delete button loading state

  const handleJobDeletion = async (jobId) => {
    setdeletingJobId(jobId);
    try {
      const response = await fetch(`${API}/jobs/${jobId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        toast.error("Failed to delete job post.");
        return;
      }

      toast.success("Job deleted successfully.");

      // auto refresh jobs after deletion
      autoRefreshJobs();
    } catch (error) {
      toast.error("Failed to delete job post.");
    } finally {
      setdeletingJobId(null);
    }
  };

  const filteredJobs = jobsList.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const jobsListing = filteredJobs?.map((job) => (
    <div key={job._id} className="col-12 col-md-6 col-lg-4 py-1 px-3 d-flex">
      <div className="card w-100 h-100 d-flex flex-column">
        <div className="card-body d-flex flex-grow-1 flex-column">
          <h5 className="card-title">{job.title}</h5>
          <p className="card-text">
            <strong>Company Name:</strong> {job.companyName}
          </p>
          <p className="card-text">
            <strong>Location:</strong> {job.location}
          </p>
          <p className="card-text">
            <strong>Job Type:</strong> {job.jobType}
          </p>
        </div>

        <div className="p-3 d-flex flex-column flex-md-row gap-1 mt-auto">
          <a
            href={`/post/${job._id}`}
            className="btn btn-primary w-100 w-md-50"
          >
            See Details
          </a>
          <button
            onClick={() => handleJobDeletion(job._id)}
            className="btn btn-danger w-100 w-md-50"
          >
            {deletingJobId === job._id ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container">
      <form>
        <div className="mb-3 col-12 col-md-6 mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by job title..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </form>
      <h1 className="my-3">All Jobs</h1>

      {jobsLoading ? (
        <p className="text-center text-muted fs-5 py-5">Loading jobs...</p>
      ) : jobsError ? (
        <p>Error loading jobs.</p>
      ) : jobsList.length === 0 ? (
        <p className="text-center text-muted fs-5 py-5">No jobs found.</p>
      ) : (
        <div className="row">{jobsListing}</div>
      )}
    </div>
  );
};

export default JobPostings;
