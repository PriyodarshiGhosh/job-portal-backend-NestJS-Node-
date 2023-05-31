import { useState } from 'react';
import axios from 'axios';

function AdminForm() {
  const [applicants, setApplicants] = useState([]);
  const [applican, setApplican] = useState([]); 
  const [recruiterId, setRecruiterId] = useState('');
  const [applicantId, setapplicantId] = useState('');
  const fetchCandidates = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(`http://localhost:5005/api/v1/admin/applicants`,config);
      setApplicants(response.data); // set the state with the fetched data
    } catch (error) {
      console.error(error);
    }
  }
  const fetchRecruiters = async (event) => {
    event.preventDefault();
    try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(`http://localhost:5005/api/v1/admin/recruiter`,config);
        setApplicants(response.data); // set the state with the fetched data
      } catch (error) {
        console.error(error);
      }
  }
  const deleteCandidates = async (event) => {
    event.preventDefault();
    try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.delete(`http://localhost:5005/api/v1/admin/candidate`,{ headers: { Authorization: `Bearer ${token}` },data:{ id:applicantId }});
        
      } catch (error) {
        console.error(error);
      }
  }
  const deleteRecruiters = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      console.log(config)
        const response = await axios.delete(`http://localhost:5005/api/v1/admin/recruiter`,{ headers: { Authorization: `Bearer ${token}` },data:{ id:recruiterId }});
     
      } catch (error) {
        console.error(error);
      }
  }

  return (
    <div>
    <form onSubmit={fetchCandidates}>
        <button type="submit">Fetch Applicants</button>
    </form>
    <ul>
        {applicants.map((applicant) => (
          <li key={applicant.id}>
            <p>ID: {applicant.id}</p>
            <p>Email: {applicant.email}</p>
            <p>Password: {applicant.password}</p>
            <p>Role: {applicant.role}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={fetchRecruiters}>
        <button type="submit">Fetch recruiters</button>
    </form>
    <ul>
        {applican.map((applicant) => (
          <li key={applicant.id}>
            <p>ID: {applicant.id}</p>
            <p>Email: {applicant.email}</p>
            <p>Password: {applicant.password}</p>
            <p>Role: {applicant.role}</p>
            
          </li>
        ))}
      </ul>
      <form onSubmit={deleteCandidates}>
      <input type="number" id="applicantId" name="applicantId" value={applicantId} onChange={(event) => setapplicantId(event.target.value)} />
        <button type="submit">Delete Applicants</button>
    </form>
      <form onSubmit={deleteRecruiters}>
      <input type="number" id="recruiterId" name="recruiterId" value={recruiterId} onChange={(event) => setRecruiterId(event.target.value)} />
        <button type="submit">Delete Recruiters</button>
    </form>
    </div>
    
  );
}
export default AdminForm;