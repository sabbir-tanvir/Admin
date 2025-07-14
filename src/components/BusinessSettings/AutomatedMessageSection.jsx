import React, { useState } from "react";
import { FaEdit, FaTrash, FaFileExport } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import "../../styles/components/AutomatedMessageSection.css";

const initialReasons = [
  {
    id: 1,
    message: "I ordered the wrong Item",
    status: false,
  },
];

const AutomatedMessageSection = () => {
  const [defaultMessage, setDefaultMessage] = useState("");
  const [reasons, setReasons] = useState(initialReasons);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);

  // Filtered reasons for search
  const filteredReasons = reasons.filter((r) =>
    r.message.toLowerCase().includes(search.toLowerCase()) ||
    r.id.toString().includes(search)
  );

  // Handlers
  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 500);
    // Save logic here (API or localStorage)
  };
  const handleReset = () => {
    setResetting(true);
    setDefaultMessage("");
    setTimeout(() => setResetting(false), 500);
  };
  const handleToggleStatus = (id) => {
    setReasons((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: !r.status } : r))
    );
  };
  const handleEdit = (id, message) => {
    setEditingId(id);
    setEditValue(message);
  };
  const handleEditSave = (id) => {
    setReasons((prev) =>
      prev.map((r) => (r.id === id ? { ...r, message: editValue } : r))
    );
    setEditingId(null);
    setEditValue("");
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this reason?")) {
      setReasons((prev) => prev.filter((r) => r.id !== id));
    }
  };
  const handleExport = () => {
    // Export logic (CSV/JSON)
    const csv = [
      ["Sl", "Message", "Status"],
      ...reasons.map((r, i) => [i + 1, r.message, r.status ? "Active" : "Inactive"]),
    ]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cancellation_reasons.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="automated-message-section-card">
      <div className="automated-message-form-card">
        <div className="automated-message-label">
          Automated Message/Reason (Default)
        </div>
        <input
          className="automated-message-input"
          type="text"
          value={defaultMessage}
          onChange={(e) => setDefaultMessage(e.target.value)}
          placeholder="Enter default automated message..."
        />
        <div className="automated-message-btn-row">
          <button
            className="automated-message-reset-btn"
            onClick={handleReset}
            disabled={resetting}
          >
            Reset
          </button>
          <button
            className="automated-message-save-btn"
            onClick={handleSave}
            disabled={saving}
          >
            Save
          </button>
        </div>
      </div>
      <div className="automated-message-table-card">
        <div className="automated-message-table-header-row">
          <div className="automated-message-table-title">
            Order Cancellation Reason list
          </div>
          <div className="automated-message-table-controls">
            <input
              className="automated-message-table-search"
              placeholder="Ex.10001"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="automated-message-table-export"
              onClick={handleExport}
              title="Export"
            >
              <FaFileExport /> Export
            </button>
          </div>
        </div>
        <table className="automated-message-table">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReasons.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  No reasons found.
                </td>
              </tr>
            ) : (
              filteredReasons.map((r, idx) => (
                <tr key={r.id}>
                  <td data-label="Sl">{idx + 1}</td>
                  <td data-label="Message">
                    {editingId === r.id ? (
                      <>
                        <input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => handleEditSave(r.id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleEditSave(r.id);
                          }}
                          autoFocus
                        />
                      </>
                    ) : (
                      r.message
                    )}
                  </td>
                  <td data-label="Status">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={r.status}
                        onChange={() => handleToggleStatus(r.id)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>
                  <td className="actions" data-label="Actions">
                    <button
                      className="automated-message-action-edit"
                      onClick={() => handleEdit(r.id, r.message)}
                      title="Edit"
                    >
                      <MdEdit color="#4CAF50" />
                    </button>
                    <button
                      className="automated-message-action-delete"
                      onClick={() => handleDelete(r.id)}
                      title="Delete"
                    >
                      <MdDelete color="#F44336" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AutomatedMessageSection; 