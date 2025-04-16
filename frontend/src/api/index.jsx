import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = {
  // Client endpoints
  getClients: async () => {
    try {
      const response = await axios.get(`${API_URL}/clients`);
      return response.data;
    } catch (error) {
      console.error('Error fetching clients:', error);
      throw error;
    }
  },
  
  getClient: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/clients/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching client ${id}:`, error);
      throw error;
    }
  },
  
  createClient: async (clientData) => {
    try {
      const response = await axios.post(`${API_URL}/clients`, clientData);
      return response.data;
    } catch (error) {
      console.error('Error creating client:', error);
      throw error;
    }
  },
  
  updateClient: async (id, clientData) => {
    try {
      const response = await axios.put(`${API_URL}/clients/${id}`, clientData);
      return response.data;
    } catch (error) {
      console.error(`Error updating client ${id}:`, error);
      throw error;
    }
  },
  
  deleteClient: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/clients/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting client ${id}:`, error);
      throw error;
    }
  },
  
  // Project endpoints
  getProjects: async () => {
    try {
      const response = await axios.get(`${API_URL}/projects`);
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },
  
  getProject: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching project ${id}:`, error);
      throw error;
    }
  },
  
  createProject: async (projectData) => {
    try {
      const response = await axios.post(`${API_URL}/projects`, projectData);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },
  
  updateProject: async (id, projectData) => {
    try {
      const response = await axios.put(`${API_URL}/projects/${id}`, projectData);
      return response.data;
    } catch (error) {
      console.error(`Error updating project ${id}:`, error);
      throw error;
    }
  },
  
  deleteProject: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting project ${id}:`, error);
      throw error;
    }
  },
  
  getClientProjects: async (clientId) => {
    try {
      const response = await axios.get(`${API_URL}/projects/client/${clientId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching projects for client ${clientId}:`, error);
      throw error;
    }
  }
};

export default api;