'use client';

import React, { useState } from 'react';

export default function CreateJob() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyLogo, setCompanyLogo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('acf[company_name]', companyName);
    formData.append('acf[company_logo]', companyLogo!);
    formData.append('status', 'draft'); // Set the status to 'draft' or 'publish'

    const response = await fetch('/api/jobs', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(data);
  };

  const handleFileChange = (e) => {
    setCompanyLogo(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300"
        required
      />

      {/* You can replace this textarea with a rich text editor of your choice */}
      <textarea
        placeholder="Job Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border border-gray-300"
        required
      />

      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        className="w-full p-2 border border-gray-300"
        required
      />

      <input
        type="file"
        onChange={handleFileChange}
        className="w-full p-2 border border-gray-300"
        required
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
}
