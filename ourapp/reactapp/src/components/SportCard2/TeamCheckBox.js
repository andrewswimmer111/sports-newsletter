import React from 'react';

export default function TeamCheckbox({ team, onChange }) {
  return (
    <label 
      htmlFor={`team-${team.id}`} 
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start', 
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        marginBottom: '8px',
        cursor: 'pointer',
        minWidth: '222px'
      }}
    >
      <input 
        type="checkbox" 
        id={`team-${team.id}`} 
        value={team.id} 
        onChange={onChange} 
        style={{ marginRight: '15px' }}
      />
      <span>{team.name}</span>
    </label>
  );
}
