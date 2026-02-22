import React, { useState, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
    const [year, setYear] = useState<string>('2023');
    const [status, setStatus] = useState<'idle' | 'running' | 'done'>('idle');
    const [progress, setProgress] = useState<{ current: number, total: number, message: string }>({ current: 0, total: 0, message: '' });

    useEffect(() => {
        // Listen for progress updates from background script
        const listener = (msg: any) => {
            if (msg.type === 'PROGRESS_UPDATE') {
                setProgress({ current: msg.current, total: msg.total, message: msg.message });
                if (msg.status === 'done') {
                    setStatus('done');
                }
            }
        };
        chrome.runtime.onMessage.addListener(listener);
        return () => chrome.runtime.onMessage.removeListener(listener);
    }, []);

    const handleStart = () => {
        setStatus('running');
        setProgress({ current: 0, total: 0, message: 'Initializing export...' });
        chrome.runtime.sendMessage({ type: 'START_EXPORT', payload: { year } });
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => (currentYear - i).toString());

    return (
        <div className="container">
            <div className="header">
                <h1>Order Exporter</h1>
                <p>for Amazon</p>
            </div>

            <div className="card">
                <div className="form-group">
                    <label htmlFor="year-select">Extract orders from year</label>
                    <div className="select-wrapper">
                        <select
                            id="year-select"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            disabled={status === 'running'}
                        >
                            {years.map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {status === 'idle' && (
                <button className="btn-primary" onClick={handleStart}>
                    Extract & Export CSV
                </button>
            )}

            {status === 'running' && (
                <div className="progress-container">
                    <div className="progress-bar-wrapper">
                        <div
                            className="progress-bar"
                            style={{ width: `${progress.total > 0 ? (progress.current / progress.total) * 100 : 0}%` }}
                        ></div>
                    </div>
                    <div className="status-text">
                        {progress.message}
                    </div>
                </div>
            )}

            {status === 'done' && (
                <div className="progress-container">
                    <div style={{ color: '#4caf50', fontSize: '2rem', marginBottom: '4px' }}>✓</div>
                    <div className="status-text" style={{ color: '#fff', fontWeight: 500 }}>
                        Export Complete!
                    </div>
                    <button className="btn-primary" style={{ marginTop: '12px', background: 'rgba(255,255,255,0.1)', color: '#fff', boxShadow: 'none' }} onClick={() => setStatus('idle')}>
                        Start New Export
                    </button>
                </div>
            )}
        </div>
    );
};

export default App;
