import React from 'react';

export default function MyNav(props) {
  return (
    <div>
      <nav className="nav-bar">
        <div>
        <p>tame</p>
        </div>
        <div><i onClick={() => props.onNightmode()} className="fas fa-moon"></i></div>
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
