import React from 'react';
import { Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function MyNav(props) {
  return (
    <div>
      <Nav>
        <Nav.Item>
          <Link to="/migraines/stats">Stats</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/migraines/new">New</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/explore/media">Explore</Link>
        </Nav.Item>
        <Button onClick={() => props.onLogout}>Log out</Button>
      </Nav>
    </div>
  );
}
