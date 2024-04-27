import React from 'react';

const SelectedNames = ({ label, selected }) => (
  <div>
    <p>{label}:</p>
    <ul>
      {selected.map((item, index) => (
        <li key={index}>{item.label}</li>
      ))}
    </ul>
  </div>
);

export default SelectedNames;
