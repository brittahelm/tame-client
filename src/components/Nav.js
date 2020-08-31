import React from 'react';

export default function MyNav(props) {
  return (
    <div>
      <nav className="nav-bar">
        <div>
        <p>tame</p>
        </div>
        <div>
        <button
          className="button log-out-button"
          onClick={() => props.onLogout()}
        >
          Log out
        </button>
        </div>
      </nav>
    </div>
  );
}
