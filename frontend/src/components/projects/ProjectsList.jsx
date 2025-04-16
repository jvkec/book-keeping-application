import React from 'react';
import { Link } from 'react-router-dom';

const ProjectsList = () => {
  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link to="/projects/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add New Project
        </Link>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <p className="text-gray-500">Projects feature coming soon.</p>
      </div>
    </div>
  );
};

export default ProjectsList;