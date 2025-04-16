import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectForm = () => {
  const navigate = useNavigate();
  
  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-6">Add New Project</h1>
      
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <p className="text-gray-500 mb-4">Project form coming soon.</p>
        <button
          onClick={() => navigate('/projects')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Projects
        </button>
      </div>
    </div>
  );
};

export default ProjectForm;