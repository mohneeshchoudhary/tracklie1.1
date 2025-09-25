import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Placeholder components for Stage 0 testing
function DashboardPage() {
  return (
    <div className="container">
      <h1>🎯 Tracklie CRM</h1>
      <div className="card">
        <h2>Dashboard</h2>
        <p>Welcome to Tracklie CRM - Advanced Customer Relationship Management System</p>
        <div className="mt-2">
          <span className="status-badge status-badge--new">New</span>
          <span className="status-badge status-badge--in-progress">In Progress</span>
          <span className="status-badge status-badge--interested-4">Hot Lead</span>
          <span className="status-badge status-badge--converted">Converted</span>
        </div>
        <div className="mt-2">
          <button className="btn btn--primary">Primary Button</button>
          <button className="btn btn--success">Success Button</button>
        </div>
      </div>
    </div>
  );
}

function LeadsPage() {
  return (
    <div className="container">
      <h1>📋 Leads</h1>
      <div className="card">
        <p>Leads management coming in Stage 4!</p>
      </div>
    </div>
  );
}

function FollowupsPage() {
  return (
    <div className="container">
      <h1>📅 Follow-ups</h1>
      <div className="card">
        <p>Follow-up scheduling coming in Stage 9!</p>
      </div>
    </div>
  );
}

function PaymentsPage() {
  return (
    <div className="container">
      <h1>💰 Payments</h1>
      <div className="card">
        <p>Payment management coming in Stage 12!</p>
      </div>
    </div>
  );
}

function ReportsPage() {
  return (
    <div className="container">
      <h1>📊 Reports</h1>
      <div className="card">
        <p>Reports and analytics coming in Stage 13!</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="nav-bar">
          <div className="container">
            <h3 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
              🎯 Tracklie CRM v1.0
            </h3>
            <div>
              <a href="/dashboard">Dashboard</a>
              <a href="/leads">Leads</a>
              <a href="/followups">Follow-ups</a>
              <a href="/payments">Payments</a>
              <a href="/reports">Reports</a>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/leads" element={<LeadsPage />} />
            <Route path="/followups" element={<FollowupsPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;