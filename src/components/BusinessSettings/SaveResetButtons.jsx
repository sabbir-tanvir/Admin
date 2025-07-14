import React from 'react';

const SaveResetButtons = ({ onSave, onReset }) => {
  return (
    <div className="save-reset-buttons">
      <button className="reset-btn modern-reset" type="button" onClick={onReset}>
        Reset
      </button>
      <button className="save-btn modern-save" type="button" onClick={onSave}>
        Save
      </button>
    </div>
  );
};

export default SaveResetButtons; 