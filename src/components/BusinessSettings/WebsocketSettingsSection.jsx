import React, { useState } from "react";
import "../../styles/components/WebsocketSettingsSection.css";

const defaultState = {
  websocketEnabled: false,
  websocketUrl: "",
  websocketUrlEnabled: false,
  websocketPortEnabled: false,
};

const WebsocketSettingsSection = () => {
  const [state, setState] = useState(defaultState);

  const handleToggle = (field) => {
    setState((prev) => {
      if (field === "websocketEnabled") {
        // If disabling websocket, also disable url/port toggles
        if (prev.websocketEnabled) {
          return {
            ...prev,
            websocketEnabled: false,
            websocketUrlEnabled: false,
            websocketPortEnabled: false,
          };
        } else {
          return {
            ...prev,
            websocketEnabled: true,
          };
        }
      }
      return { ...prev, [field]: !prev[field] };
    });
  };

  const handleInputChange = (e) => {
    setState((prev) => ({ ...prev, websocketUrl: e.target.value }));
  };

  const handleReset = () => {
    setState(defaultState);
  };

  const handleSave = () => {
    // Simulate save (API call)
    alert("Websocket settings saved!");
  };

  return (
    <div className="websocket-settings-card">
      <div className="websocket-settings-grid">
        <div className="websocket-settings-row">
          <label className="websocket-label">Websocket</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={state.websocketEnabled}
              onChange={() => handleToggle("websocketEnabled")}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="websocket-settings-row">
          <label className="websocket-label">Websocket url</label>
          <div className="websocket-url-input-wrap">
            <input
              className="websocket-url-input"
              type="text"
              placeholder=""
              value={state.websocketUrl}
              onChange={handleInputChange}
              disabled={!state.websocketEnabled}
            />
            <label className="switch">
              <input
                type="checkbox"
                checked={state.websocketUrlEnabled}
                onChange={() => handleToggle("websocketUrlEnabled")}
                disabled={!state.websocketEnabled}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <div className="websocket-settings-row">
          <label className="websocket-label">Websocket Port</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={state.websocketPortEnabled}
              onChange={() => handleToggle("websocketPortEnabled")}
              disabled={!state.websocketEnabled}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <div className="websocket-actions-row">
        <button className="reset-btn" onClick={handleReset}>Reset</button>
        <button className="save-btn" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default WebsocketSettingsSection; 