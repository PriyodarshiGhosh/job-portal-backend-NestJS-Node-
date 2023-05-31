import { useState } from 'react';
import axios from 'axios';

function JobForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [applicants, setApplicants] = useState([]);
  const [jobId, setJobId] = useState('');
  const [applican, setApplican] = useState([]);
  const [recruiterId, setRecruiterId] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:5005/api/v1/recruiter/jobs', {title, description, location,salary},{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data); // do something with response if needed
    } catch (error) {
      console.error(error);
    }
  }
  const handleJobs = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(`http://localhost:5005/api/v1/recruiter/jobs/id?id=${jobId}`,config);
      setApplicants(response.data); // set the state with the fetched data
    } catch (error) {
      console.error(error);
    }
  }
  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(`http://localhost:5005/api/v1/recruiter/jobs?recruiterId=${recruiterId}`,config);
      setApplican(response.data.data); // set the state with the fetched data
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={title} onChange={(event) => setTitle(event.target.value)} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input type="text" id="description" name="description" value={description} onChange={(event) => setDescription(event.target.value)} />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input type="text" id="location" name="location" value={location} onChange={(event) => setLocation(event.target.value)} />
      </div>
      <div>
        <label htmlFor="salary">Salary:</label>
        <input type="text" id="salary" name="salary" value={salary} onChange={(event) => setSalary(event.target.value)} />
      </div>
      <button type="submit">Create Job</button>
    </form>
    <form onSubmit={handleJobs}>
    <div>
          <label htmlFor="jobId">Job ID:</label>
          <input type="text" id="jobId" name="jobId" value={jobId} onChange={(event) => setJobId(event.target.value)} />
        </div>
        <button type="submit">Fetch Applicants</button>
    </form>
    <ul>
        {applicants.map((applicant) => (
          <li key={applicant.id}>
            <p>ID: {applicant.id}</p>
            <p>Resume: {applicant.resume}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSearch}>
    <div>
          <label htmlFor="recruiterId">Recruiter ID:</label>
          <input type="text" id="recruiterId" name="recruiterId" value={recruiterId} onChange={(event) => setRecruiterId(event.target.value)} />
        </div>
        <button type="submit">Search</button>
    </form>
    <ul>
        {applican.map((applicant) => (
          <li key={applicant.id}>
            <p>ID: {applicant.id}</p>
            <p>Title: {applicant.title}</p>
            <p>Description: {applicant.description}</p>
            <p>Location: {applicant.location}</p>
            <p>Salary: {applicant.salary}</p>
          </li>
        ))}
      </ul>
    </div>
    
  );
}
export default JobForm;