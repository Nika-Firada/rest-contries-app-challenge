import React from 'react'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';

function Header({onClick, darkMode}) {
  return (
    <div className={`header ${darkMode ? `darkMode` : ""}`}>
        <div className="header_container">
            <h2 className="logo">Where in the world?</h2>
            <div className="switch_mode" onClick={onClick}>
                <SettingsBrightnessIcon />
                <h3>Dark Mode</h3>
            </div>
        </div>
    </div>
  )
}

export default Header