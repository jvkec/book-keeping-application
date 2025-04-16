import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ClientsList from './components/clients/ClientsList';
import ClientForm from './components/clients/ClientForm';
import ClientDetails from './components/clients/ClientDetails';
import ProjectsList from './components/projects/ProjectsList';
import ProjectForm from './components/projects/ProjectForm';
import ProjectDetails from './components/projects/ProjectDetails';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Renovation Bookkeeper</h1>
            <div className="flex space-x-4">
              <Link to="/" className="hover:underline">Dashboard</Link>
              <Link to="/clients" className="hover:underline">Clients</Link>
              <Link to="/projects" className="hover:underline">Projects</Link>
            </div>
          </div>
        </nav>
        
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<ClientsList />} />
            <Route path="/clients/new" element={<ClientForm />} />
            <Route path="/clients/edit/:id" element={<ClientForm />} />
            <Route path="/clients/:id" element={<ClientDetails />} />
            <Route path="/projects" element={<ProjectsList />} />
            <Route path="/projects/new" element={<ProjectForm />} />
            <Route path="/projects/edit/:id" element={<ProjectForm />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;