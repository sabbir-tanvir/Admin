import React, { useState } from "react";
import { MdEdit, MdDelete, MdAdd, MdArrowUpward, MdArrowDownward } from "react-icons/md";
import "../../styles/components/PrioritySetupSection.css";

const initialPriorities = [
  { id: 1, name: "High", level: 1, status: true },
  { id: 2, name: "Medium", level: 2, status: true },
  { id: 3, name: "Low", level: 3, status: false },
];

const PrioritySetupSection = () => {
  const [priorities, setPriorities] = useState(initialPriorities);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState({ name: "", level: 1 });
  const [newValue, setNewValue] = useState({ name: "", level: priorities.length + 1 });
  const [saving, setSaving] = useState(false);

  const handleToggleStatus = (id) => {
    setPriorities((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: !p.status } : p))
    );
  };
  const handleEdit = (id, name, level) => {
    setEditingId(id);
    setEditValue({ name, level });
  };
  const handleEditSave = (id) => {
    setPriorities((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name: editValue.name, level: Number(editValue.level) } : p))
    );
    setEditingId(null);
    setEditValue({ name: "", level: 1 });
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this priority?")) {
      setPriorities((prev) => prev.filter((p) => p.id !== id));
    }
  };
  const handleAdd = () => {
    if (!newValue.name.trim()) return;
    const newId = priorities.length > 0 ? Math.max(...priorities.map(p => p.id)) + 1 : 1;
    setPriorities([...priorities, { id: newId, name: newValue.name, level: Number(newValue.level), status: true }]);
    setNewValue({ name: "", level: priorities.length + 2 });
  };
  const handleMove = (idx, direction) => {
    const newArr = [...priorities];
    if (direction === "up" && idx > 0) {
      [newArr[idx - 1], newArr[idx]] = [newArr[idx], newArr[idx - 1]];
    } else if (direction === "down" && idx < newArr.length - 1) {
      [newArr[idx], newArr[idx + 1]] = [newArr[idx + 1], newArr[idx]];
    }
    setPriorities(newArr.map((p, i) => ({ ...p, level: i + 1 })));
  };
  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 500);
    // Save logic here (API/localStorage)
  };

  return (
    <div className="priority-setup-section-card">
      <div className="priority-setup-header">
        <span>Priority List</span>
      </div>
      <div className="priority-setup-add-row">
        <input
          className="priority-setup-input"
          type="text"
          value={newValue.name}
          onChange={e => setNewValue({ ...newValue, name: e.target.value })}
          placeholder="Add new priority name..."
        />
        <input
          className="priority-setup-input-level"
          type="number"
          min={1}
          value={newValue.level}
          onChange={e => setNewValue({ ...newValue, level: e.target.value })}
          placeholder="Level"
        />
        <button className="priority-setup-add-btn" onClick={handleAdd} title="Add">
          <MdAdd size={22} />
        </button>
      </div>
      <table className="priority-setup-table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Name</th>
            <th>Level</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {priorities.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>No priorities found.</td>
            </tr>
          ) : (
            priorities.map((p, idx) => (
              <tr key={p.id}>
                <td data-label="Order">
                  <button className="priority-setup-move-btn" onClick={() => handleMove(idx, "up")} disabled={idx === 0} title="Move Up">
                    <MdArrowUpward />
                  </button>
                  <button className="priority-setup-move-btn" onClick={() => handleMove(idx, "down")} disabled={idx === priorities.length - 1} title="Move Down">
                    <MdArrowDownward />
                  </button>
                </td>
                <td data-label="Name">
                  {editingId === p.id ? (
                    <input
                      value={editValue.name}
                      onChange={e => setEditValue({ ...editValue, name: e.target.value })}
                      onBlur={() => handleEditSave(p.id)}
                      onKeyDown={e => { if (e.key === "Enter") handleEditSave(p.id); }}
                      autoFocus
                    />
                  ) : (
                    p.name
                  )}
                </td>
                <td data-label="Level">
                  {editingId === p.id ? (
                    <input
                      type="number"
                      min={1}
                      value={editValue.level}
                      onChange={e => setEditValue({ ...editValue, level: e.target.value })}
                      onBlur={() => handleEditSave(p.id)}
                      onKeyDown={e => { if (e.key === "Enter") handleEditSave(p.id); }}
                    />
                  ) : (
                    p.level
                  )}
                </td>
                <td data-label="Status">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={p.status}
                      onChange={() => handleToggleStatus(p.id)}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td className="actions" data-label="Actions">
                  <button className="priority-setup-action-edit" onClick={() => handleEdit(p.id, p.name, p.level)} title="Edit">
                    <MdEdit color="#4CAF50" />
                  </button>
                  <button className="priority-setup-action-delete" onClick={() => handleDelete(p.id)} title="Delete">
                    <MdDelete color="#F44336" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="priority-setup-btn-row">
        <button className="priority-setup-save-btn" onClick={handleSave} disabled={saving}>Save</button>
      </div>
    </div>
  );
};

export default PrioritySetupSection; 