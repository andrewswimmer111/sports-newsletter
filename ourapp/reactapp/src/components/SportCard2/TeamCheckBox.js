import React from 'react';

export default function TeamCheckbox({ team, onChange }) {
  return (
    <label 
      htmlFor={`team-${team.id}`} 
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        marginBottom: '8px',
        cursor: 'pointer',
      }}
    >
      <input 
        type="checkbox" 
        id={`team-${team.id}`} 
        value={team.id} 
        onChange={onChange} 
        style={{ marginRight: '10px' }}
      />
      <span>{team.name}</span>
    </label>
  );
}
