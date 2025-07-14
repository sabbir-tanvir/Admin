import React, { useEffect, useState, useRef } from "react";
import { FaGlobe, FaEdit, FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import "../../styles/components/LanguageSettingsSection.css";

const LANGUAGE_DATA_URL = "/languageData.json";

const initialForm = { code: "", status: true, default: false };

const LanguageSettingsSection = () => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const tableWrapperRef = useRef(null);
  const [showScrollbar, setShowScrollbar] = useState(false);

  useEffect(() => {
    fetch(LANGUAGE_DATA_URL)
      .then((res) => res.json())
      .then((data) => {
        setLanguages(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      if (tableWrapperRef.current) {
        setShowScrollbar(tableWrapperRef.current.scrollWidth > tableWrapperRef.current.clientWidth);
      }
    };
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [languages]);

  const handleToggle = (id, field) => {
    setLanguages((prev) =>
      prev.map((lang) => {
        if (lang.id === id) {
          if (field === "default") {
            // Only one default allowed
            return { ...lang, default: true };
          }
          return { ...lang, [field]: !lang[field] };
        } else if (field === "default") {
          return { ...lang, default: false };
        }
        return lang;
      })
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this language?")) {
      setLanguages((prev) => prev.filter((lang) => lang.id !== id));
    }
  };

  const openModal = (lang = null) => {
    setEditId(lang ? lang.id : null);
    setForm(lang ? { ...lang } : initialForm);
    setShowModal(true);
    setError("");
  };

  const closeModal = () => {
    setShowModal(false);
    setForm(initialForm);
    setEditId(null);
    setError("");
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.code.trim()) {
      setError("Language code is required");
      return;
    }
    if (editId) {
      setLanguages((prev) =>
        prev.map((lang) =>
          lang.id === editId ? { ...lang, ...form } : lang
        )
      );
    } else {
      const newId =
        languages.length > 0 ? Math.max(...languages.map((l) => l.id)) + 1 : 1;
      setLanguages((prev) => [
        ...prev,
        { ...form, id: newId },
      ]);
    }
    closeModal();
  };

  return (
    <div className="language-settings-card">
      <div className="language-settings-header">
        <span>Language list</span>
        <button
          className="add-language-btn"
          onClick={() => openModal()}
        >
          <IoMdAdd size={18} style={{ marginRight: 6 }} />Add New Language
        </button>
      </div>
      <div className="language-table-wrapper" ref={tableWrapperRef}>
        <table className="language-table">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Code</th>
              <th>Status</th>
              <th>Default Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            ) : languages.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  No languages found.
                </td>
              </tr>
            ) : (
              languages.map((lang, idx) => (
                <tr key={lang.id}>
                  <td data-label="Sl">{idx + 1}</td>
                  <td data-label="Code">{lang.code}</td>
                  <td data-label="Status">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={lang.status}
                        onChange={() => handleToggle(lang.id, "status")}
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>
                  <td data-label="Default Status">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={lang.default}
                        onChange={() => handleToggle(lang.id, "default")}
                        disabled={lang.default}
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>
                  <td className="actions" data-label="Actions">
                    <button
                      className="icon-btn"
                      title="Edit"
                      onClick={() => openModal(lang)}
                    >
                      <FaEdit color="#4CAF50" />
                    </button>
                    <button
                      className="icon-btn"
                      title="Delete"
                      onClick={() => handleDelete(lang.id)}
                    >
                      <FaTrash color="#F44336" />
                    </button>
                    <button
                      className="icon-btn"
                      title="Set as Default"
                      onClick={() => handleToggle(lang.id, "default")}
                      disabled={lang.default}
                    >
                      <FaGlobe color={lang.default ? "#4CAF50" : "#888"} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {showScrollbar && <div className="language-table-scrollbar" />}
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editId ? "Edit Language" : "Add New Language"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Language Code</label>
                <input
                  type="text"
                  name="code"
                  value={form.code}
                  onChange={handleFormChange}
                  placeholder="e.g. en, fr, es"
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="status"
                    checked={form.status}
                    onChange={handleFormChange}
                  />
                  &nbsp;Active
                </label>
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="default"
                    checked={form.default}
                    onChange={handleFormChange}
                    disabled={form.default}
                  />
                  &nbsp;Default
                </label>
              </div>
              {error && <div className="form-error">{error}</div>}
              <div className="modal-actions">
                <button type="submit" className="save-btn">
                  {editId ? "Save Changes" : "Add Language"}
                </button>
                <button type="button" className="cancel-btn" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSettingsSection; 