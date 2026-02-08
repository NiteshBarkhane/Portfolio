import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/api';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({});

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await api.get('/settings');
                const settingsMap = res.data.reduce((acc, curr) => {
                    acc[curr.key] = curr.value;
                    return acc;
                }, {});
                setSettings(settingsMap);
            } catch (err) {
                console.error('Failed to fetch settings:', err);
            }
        };
        fetchSettings();
    }, []);

    const getSetting = (key, defaultValue) => {
        return settings[key] || defaultValue;
    };

    return (
        <SettingsContext.Provider value={{ settings, getSetting, setSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);
