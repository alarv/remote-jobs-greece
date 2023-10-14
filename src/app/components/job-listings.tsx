'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Job } from '@/app/types/job';

const JobListings = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Replace with your WordPress REST API endpoint
    const apiURL = '';

    axios
      .get(apiURL)
      .then((response) => {
        if (!response.data) {
          setJobs([]);
        } else {
          setJobs(response.data);
        }
      })
      .catch((error) => {
        console.error('There is this ' + { error });
      });
  }, []);

  return (
    <div>
      <h1>Job Listings</h1>
      {jobs.map((job) => (
        <div key={job.id}>
          <h2>{job.title.rendered}</h2>
          <h3>Company: {job.acf.company_name}</h3>
          <div>{job.content.rendered}</div>
        </div>
      ))}
    </div>
  );
};

export default JobListings;
