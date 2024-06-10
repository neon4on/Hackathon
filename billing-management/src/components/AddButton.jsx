import React from 'react';
import '../styles/components/AddButton.module.scss';

const AddButton = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default AddButton;
