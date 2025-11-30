import { useParams } from "react-router";
import useJobContext from "../context/JobContext";

const JobDetails = () => {
  const { jobsList, jobsLoading, jobsError } = useJobContext();
  const { jobId } = useParams();
  const jobToRender = jobsList?.find((job) => job._id === jobId);

  const jobListing = jobToRender && (
    <>
      <h1 className="my-3">{jobToRender.title}</h1>
      <div className="card">
        <div className="card-body">
          <p className="card-text">
            <strong>Company Name:</strong> {jobToRender.companyName}
          </p>
          <p className="card-text">
            <strong>Location:</strong> {jobToRender.location}
          </p>
          <p className="card-text">
            <strong>Salary:</strong> ₹{jobToRender.salary}
          </p>
          <p className="card-text">
            <strong>Job Type:</strong> {jobToRender.jobType}
          </p>
          <p className="card-text">
            <strong>Description:</strong> {jobToRender.jobDescription}
          </p>
          <div className="card-text">
            <strong>Qualifications:</strong>
            <ol className="mt-2">
              {jobToRender.qualifications.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="container">
      {jobsLoading ? (
        <p className="text-center text-muted fs-5 py-5">
          Loading job details...
        </p>
      ) : jobsError ? (
        <p className="text-center text-muted fs-5 py-5">
          Error Loading job details.
        </p>
      ) : jobToRender ? (
        jobListing
      ) : (
        <p className="text-center text-muted fs-5 py-5">No job found.</p>
      )}
    </div>
  );
};

export default JobDetails;
