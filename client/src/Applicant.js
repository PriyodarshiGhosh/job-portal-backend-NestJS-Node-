import { useState } from 'react';
import axios from 'axios';

function ApplicationForm() {
  const [resume, setResume] = useState('');
  const [jobId, setjobId] = useState(0);
  const [applicants, setApplicants] = useState([]);
  const [role, setRole] = useState('');
  const [applican, setApplican] = useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:5005/api/v1/user/jobs', {resume,jobId},{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data); // do something with response if needed
    } catch (error) {
      console.error(error);
    }
  }
  const handleApplication = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5005/api/v1/user/jobs/application',{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setApplicants(response.data);
      console.log(response.data); // do something with response if needed
    } catch (error) {
      console.error(error);
    }
  }
  const handleJobSearch = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:5005/api/v1/user/jobs?search=${role}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setApplican(response.data);
      console.log(response.data); // do something with response if needed
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="resume">Resume:</label>
        <input type="text" id="resume" name="resume" value={resume} onChange={(event) => setResume(event.target.value)} />
      </div>
      <div>
        <label htmlFor="jobId">jobId</label>
        <input type="number" id="jobId" name="jobId" value={jobId} onChange={(event) => setjobId(event.target.value)} />
      </div>
      <button type="submit">Create Application</button>
    </form>
    <form onSubmit={handleApplication}>
      <button type="Get your Application">Fetch Application</button>
    </form>
    <ul>
        {applicants.map((applicant) => (
          <li key={applicant.id}>
            <p>ID: {applicant.id}</p>
            <p>Resume: {applicant.resume}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleJobSearch}>
      <input type="text" id="role" name="role" value={role} onChange={(event) => setRole(event.target.value)} />
      <button type="Get list of jobs">Search</button>
    </form>
    <ul>
        {applican.map((applicant) => (
          <li key={applicant.id}>
            <p>ID: {applicant.id}</p>
            <p>title: {applicant.tile}</p>
            <p>description: {applicant.description}</p>
            <p>location: {applicant.location}</p>
            <p>salary: {applicant.salary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ApplicationForm;