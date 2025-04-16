import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const data = await api.getClients();
        setClients(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching clients');
        setLoading(false);
        console.error(err);
      }
    };

    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await api.deleteClient(id);
        setClients(clients.filter(client => client._id !== id));
      } catch (err) {
        setError('Error deleting client');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="text-center py-10">Loading clients...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clients</h1>
        <Link to="/clients/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add New Client
        </Link>
      </div>

      {clients.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-500">No clients found. Add your first client to get started.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map(client => (
                <tr key={client._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/clients/${client._id}`} className="text-blue-600 hover:underline">
                      {client.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{client.email || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{client.phone || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {client.address && client.address.city ? client.address.city : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={`/clients/edit/${client._id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(client._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClientsList;