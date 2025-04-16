import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const Dashboard = () => {
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [clientsData, projectsData] = await Promise.all([
          api.getClients(),
          api.getProjects()
        ]);
        setClients(clientsData);
        setProjects(projectsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-10">Loading dashboard...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Clients Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Clients</h2>
            <Link to="/clients/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Add Client
            </Link>
          </div>
          
          {clients.length === 0 ? (
            <p className="text-gray-500">No clients yet</p>
          ) : (
            <ul className="divide-y">
              {clients.slice(0, 5).map(client => (
                <li key={client._id} className="py-3">
                  <Link to={`/clients/${client._id}`} className="hover:text-blue-500">
                    <span className="font-medium">{client.name}</span>
                    {client.phone && <span className="text-gray-500 ml-2">({client.phone})</span>}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          
          <div className="mt-4">
            <Link to="/clients" className="text-blue-500 hover:underline">View all clients →</Link>
          </div>
        </div>
        
        {/* Active Projects Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Active Projects</h2>
            <Link to="/projects/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Add Project
            </Link>
          </div>
          
          {projects.length === 0 ? (
            <p className="text-gray-500">No projects yet</p>
          ) : (
            <ul className="divide-y">
              {projects
                .filter(project => project.status === 'in-progress')
                .slice(0, 5)
                .map(project => (
                  <li key={project._id} className="py-3">
                    <Link to={`/projects/${project._id}`} className="hover:text-blue-500">
                      <span className="font-medium">{project.name}</span>
                      {project.client && project.client.name && (
                        <span className="text-gray-500 ml-2">({project.client.name})</span>
                      )}
                    </Link>
                  </li>
                ))}
            </ul>
          )}
          
          <div className="mt-4">
            <Link to="/projects" className="text-blue-500 hover:underline">View all projects →</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;