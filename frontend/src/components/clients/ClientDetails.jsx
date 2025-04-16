import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../api';

const ClientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [client, setClient] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [clientData, projectsData] = await Promise.all([
          api.getClient(id),
          api.getClientProjects(id)
        ]);
        setClient(clientData);
        setProjects(projectsData);
        setLoading(false);
      } catch (err) {
        setError('Error fetching client data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await api.deleteClient(id);
        navigate('/clients');
      } catch (err) {
        setError('Error deleting client');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="text-center py-10">Loading client details...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!client) return <div className="text-center py-10">Client not found</div>;

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{client.name}</h1>
        <div className="flex space-x-4">
          <Link
            to={`/clients/edit/${id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Client
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete Client
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Client Info Card */}
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold mb-4">Client Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Email</p>
                <p className="font-medium">
                  {client.address && (client.address.street || client.address.city || client.address.state)
                    ? [
                        client.address.street,
                        client.address.city,
                        client.address.state,
                        client.address.zipCode
                      ].filter(Boolean).join(', ')
                    : 'N/A'}
                </p>
              </div>
              
              {client.notes && (
                <div className="md:col-span-2">
                  <p className="text-gray-600">Notes</p>
                  <p className="whitespace-pre-line">{client.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Projects Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Client Projects</h2>
              <Link
                to="/projects/new"
                state={{ clientId: id }}
                className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
              >
                Add Project
              </Link>
            </div>

            {projects.length === 0 ? (
              <p className="text-gray-500">No projects for this client yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {projects.map(project => (
                      <tr key={project._id}>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <Link to={`/projects/${project._id}`} className="text-blue-600 hover:underline">
                            {project.name}
                          </Link>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${project.status === 'completed' ? 'bg-green-100 text-green-800' : 
                              project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                              project.status === 'on-hold' ? 'bg-yellow-100 text-yellow-800' :
                              project.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'}`}
                          >
                            {project.status}
                          </span>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {project.budget ? `${project.budget.toLocaleString()}` : 'N/A'}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                          <Link to={`/projects/edit/${project._id}`} className="text-indigo-600 hover:text-indigo-900 mr-3">
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Client Activity/Stats */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold mb-4">Client Summary</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold">{projects.length}</p>
              </div>
              
              <div>
                <p className="text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold">
                  {projects.filter(p => p.status === 'in-progress').length}
                </p>
              </div>

              <div>
                <p className="text-gray-600">Client Since</p>
                <p className="font-medium">
                  {client.createdAt ? new Date(client.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;