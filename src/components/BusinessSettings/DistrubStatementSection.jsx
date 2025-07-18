import React, { useState } from "react";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import "../../styles/components/DistrubStatementSection.css";

const initialStatements = [
  { id: 1, message: "Scheduled maintenance on Sunday 2AM-4AM.", status: true },
];

const DistrubStatementSection = () => {
  const [statements, setStatements] = useState(initialStatements);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [newValue, setNewValue] = useState("");
  const [saving, setSaving] = useState(false);

  const handleToggleStatus = (id) => {
    setStatements((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: !s.status } : s))
    );
  };
  const handleEdit = (id, message) => {
    setEditingId(id);
    setEditValue(message);
  };
  const handleEditSave = (id) => {
    setStatements((prev) =>
      prev.map((s) => (s.id === id ? { ...s, message: editValue } : s))
    );
    setEditingId(null);
    setEditValue("");
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this statement?")) {
      setStatements((prev) => prev.filter((s) => s.id !== id));
    }
  };
  const handleAdd = () => {
    if (!newValue.trim()) return;
    const newId = statements.length > 0 ? Math.max(...statements.map(s => s.id)) + 1 : 1;
    setStatements([...statements, { id: newId, message: newValue, status: true }]);
    setNewValue("");
  };
  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 500);
    // Save logic here (API/localStorage)
  };

  return (
    <div className="distrub-statement-section-card">
      <div className="distrub-statement-header">
        <span>Disturb Statement List</span>
      </div>
      <div className="distrub-statement-add-row">
        <input
          className="business-settings-input"
          type="text"
          value={newValue}
          onChange={e => setNewValue(e.target.value)}
          placeholder="Add new disturb statement..."
        />
        <button className="distrub-statement-add-btn" onClick={handleAdd} title="Add">
          <MdAdd size={22} />
        </button>
      </div>
      <table className="distrub-statement-table">
        <thead>
          <tr>
            <th>Sl</th>
            <th>Message</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {statements.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>No statements found.</td>
            </tr>
          ) : (
            statements.map((s, idx) => (
              <tr key={s.id}>
                <td data-label="Sl">{idx + 1}</td>
                <td data-label="Message">
                  {editingId === s.id ? (
                    <input
                      className="business-settings-input"
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      onBlur={() => handleEditSave(s.id)}
                      onKeyDown={e => { if (e.key === "Enter") handleEditSave(s.id); }}
                      autoFocus
                    />
                  ) : (
                    s.message
                  )}
                </td>
                <td data-label="Status">
                  <label className="switch">
                    <input
                      className="business-settings-checkbox"
                      type="checkbox"
                      checked={s.status}
                      onChange={() => handleToggleStatus(s.id)}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td data-label="Actions">
                  <button className="distrub-statement-action-edit" onClick={() => handleEdit(s.id, s.message)} title="Edit">
                    <MdEdit color="#4CAF50" />
                  </button>
                  <button className="distrub-statement-action-delete" onClick={() => handleDelete(s.id)} title="Delete">
                    <MdDelete color="#F44336" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="distrub-statement-btn-row">
        <button className="distrub-statement-save-btn" onClick={handleSave} disabled={saving}>Save</button>
      </div>
    </div>
  );
};

export default DistrubStatementSection; 