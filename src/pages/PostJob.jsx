import { useState } from "react";
import { toast } from "react-toastify";

import useJobContext from "../context/JobContext";

const PostJob = () => {
  const { API, autoRefreshJobs } = useJobContext();
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobQualifications, setJobQualifications] = useState("");
  const [loading, setLoading] = useState(false);

  const qualificationsArray = jobQualifications.split(". ");
  const trimmedQualifications = qualificationsArray.map((qual) => qual.trim());
  const finalQualificationsList = trimmedQualifications.filter(
    (qual) => qual.length > 0
  );

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // validation before submitting
    if (
      !title ||
      !companyName ||
      !location ||
      !salary ||
      !jobType ||
      !jobDescription ||
      !finalQualificationsList.length
    ) {
      toast.error("Please fill all fields.");
      setLoading(false);
      return;
    }

    const jobData = {
      title: title,
      companyName: companyName,
      location: location,
      salary: Number(salary),
      jobType: jobType,
      jobDescription: jobDescription,
      qualifications: finalQualificationsList,
    };

    try {
      const response = await fetch(`${API}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        toast.error("Failed to post job.");
        return;
      }

      const result = await response.json();
      toast.success("Job posted successfully.");

      // auto refresh jobs
      autoRefreshJobs();

      // clearing input fields
      setTitle("");
      setCompanyName("");
      setLocation("");
      setSalary("");
      setJobType("");
      setJobDescription("");
      setJobQualifications("");
    } catch (error) {
      toast.error("Failed to post job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="my-3">Post a Job</h1>

      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Job Title:
          </label>
          <input
            value={title}
            id="title"
            type="text"
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="companyName" className="form-label">
            Company Name:
          </label>
          <input
            value={companyName}
            id="companyName"
            type="text"
            className="form-control"
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location:
          </label>
          <input
            value={location}
            id="location"
            type="text"
            className="form-control"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">
            Salary:
          </label>
          <input
            value={salary}
            id="salary"
            type="number"
            min={1}
            className="form-control"
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="jobType" className="form-label">
            Job Type:
          </label>
          <select
            id="jobType"
            className="form-select"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="" disabled hidden></option>
            <option value="Full-time (On-site)">Full-time (On-site)</option>
            <option value="Part-time (On-site)">Part-time (On-site)</option>
            <option value="Full-time (Remote)">Full-time (Remote)</option>
            <option value="Part-time (Remote)">Part-time (Remote)</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="jobDescription" className="form-label">
            Job Description:
          </label>
          <textarea
            value={jobDescription}
            id="jobDescription"
            className="form-control"
            onChange={(e) => setJobDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="jobQualifications" className="form-label">
            Job Qualifications:
          </label>
          <textarea
            value={jobQualifications}
            id="jobQualifications"
            className="form-control"
            onChange={(e) => setJobQualifications(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default PostJob;
