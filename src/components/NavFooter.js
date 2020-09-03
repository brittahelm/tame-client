import React from 'react';
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div>
      <nav className="nav-footer">
        <Link className="history-link" to="/migraines/history"><span>History</span></Link>
        <Link to="/migraines/stats"><i className="fas fa-chart-pie"></i> <span>Stats</span></Link>
        <Link to="/migraines/new"><i className="fas fa-plus"></i><span>New</span></Link>
        <Link className="history-link" to="/recommendations"><span>Tips</span></Link>
        <Link to="/explore"><i className="fas fa-book-open"></i><span>Explore</span></Link>
      </nav>
    </div>
  );
}