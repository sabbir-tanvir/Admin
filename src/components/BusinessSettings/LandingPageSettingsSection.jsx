import React, { useState, useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdOutlineInfo } from "react-icons/md";
import "../../styles/components/LandingPageSettingsSection.css";
import placeholderImg from "../../assets/image.png";

const defaultState = {
  useDefault: false,
  method: "url", // "url" | "file" | "none"
  url: "",
  file: null,
};

const LandingPageSettingsSection = () => {
  const [state, setState] = useState(defaultState);
  const [fileError, setFileError] = useState("");
  const [urlError, setUrlError] = useState("");
  const fileInputRef = useRef();

  const handleToggleDefault = () => {
    setState((prev) => ({ ...prev, useDefault: !prev.useDefault }));
  };

  const handleMethodChange = (method) => {
    setState((prev) => ({ ...prev, method }));
    setFileError("");
    setUrlError("");
  };

  const handleUrlChange = (e) => {
    setState((prev) => ({ ...prev, url: e.target.value }));
    setUrlError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/zip") {
      setState((prev) => ({ ...prev, file }));
      setFileError("");
    } else {
      setFileError("Please upload a valid ZIP file.");
      setState((prev) => ({ ...prev, file: null }));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/zip") {
      setState((prev) => ({ ...prev, file }));
      setFileError("");
    } else {
      setFileError("Please upload a valid ZIP file.");
      setState((prev) => ({ ...prev, file: null }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setState(defaultState);
    setFileError("");
    setUrlError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = () => {
    // Validation
    if (state.method === "url") {
      if (!state.url.trim()) {
        setUrlError("Landing page URL is required.");
        return;
      }
      // Simple URL validation
      try {
        new URL(state.url);
      } catch {
        setUrlError("Please enter a valid URL.");
        return;
      }
    }
    if (state.method === "file" && !state.file) {
      setFileError("Please upload a ZIP file.");
      return;
    }
    // Simulate save (API call)
    alert("Landing page settings saved!");
  };

  return (
    <div className="landing-settings-root">
      <div className="landing-toggle-card">
        <div className="toggle-label">Admin default landing page</div>
        <label className="switch">
          <input
            type="checkbox"
            checked={state.useDefault}
            onChange={handleToggleDefault}
          />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="landing-custom-card">
        <div className="custom-title">
          Want to Integrate Your Own Customised Landing Page ?
        </div>
        <div className="custom-method-row">
          <span className="custom-method-label">Integrate Your Landing Page Via</span>
          <div className="custom-method-group">
            <label className={`custom-radio ${state.method === "url" ? "active" : ""}`}>
              <input
                type="radio"
                name="method"
                checked={state.method === "url"}
                onChange={() => handleMethodChange("url")}
              />
              <span className="custom-radio-text">Url</span>
            </label>
            <label className={`custom-radio ${state.method === "file" ? "active" : ""}`}>
              <input
                type="radio"
                name="method"
                checked={state.method === "file"}
                onChange={() => handleMethodChange("file")}
              />
              <span className="custom-radio-text">File upload</span>
            </label>
            <label className={`custom-radio ${state.method === "none" ? "active" : ""}`}>
              <input
                type="radio"
                name="method"
                checked={state.method === "none"}
                onChange={() => handleMethodChange("none")}
              />
              <span className="custom-radio-text">None</span>
            </label>
          </div>
        </div>
        {/* URL Input */}
        {state.method === "url" && (
          <div className="custom-url-box">
            <label className="custom-url-label">Landing page url</label>
            <input
              className="custom-url-input"
              type="text"
              placeholder=""
              value={state.url}
              onChange={handleUrlChange}
            />
            {urlError && <div className="form-error">{urlError}</div>}
          </div>
        )}
        {/* File Upload */}
        {state.method === "file" && (
          <div className="custom-file-row">
            <div
              className="custom-file-drop"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
            >
              <FaCloudUploadAlt size={32} style={{ marginBottom: 8, color: '#19b800' }} />
              <div className="custom-file-drop-text">Drag & drop or Browse file</div>
              <input
                type="file"
                accept=".zip"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              {state.file && <div className="file-name">{state.file.name}</div>}
            </div>
            <div className="custom-file-instructions">
              <div className="custom-file-instructions-title">Instructions</div>
              <ul>
                <li>Upload content as a single ZIP file and the file name must be <b>index.blade.php</b></li>
              </ul>
            </div>
            {fileError && <div className="form-error">{fileError}</div>}
          </div>
        )}
        {/* None Info */}
        {state.method === "none" && (
          <div className="custom-none-box">
            <div className="custom-none-img-wrap">
              <img src={placeholderImg} alt="Landing page" className="custom-none-img" />
            </div>
            <div className="custom-none-text">
              Currently you are using Safe Default Admin Landing Page Theme.{' '}
              <a href="/landing" target="_blank" rel="noopener noreferrer" className="custom-none-link">Visit Landing Page</a>
            </div>
          </div>
        )}
      </div>
      <div className="landing-actions-row">
        <button className="reset-btn" onClick={handleReset}>Reset</button>
        <button className="save-btn" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default LandingPageSettingsSection; 