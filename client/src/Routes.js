import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminForm from './Admin';
import App from './App';
import ApplicationForm from './Applicant';
import JobForm from './Job';

function Rout() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App/>} />
        <Route path="/jobform" element={<JobForm/>} />
        <Route path="/applicationform" element={<ApplicationForm/>} />
        <Route path="/adminform" element={<AdminForm/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Rout;
