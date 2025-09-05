'use client';

import { useEffect, useState } from 'react';

interface LogEntry {
  id: string;
  topic: string;
  responseText: string;
  isWarning: boolean;
  createdAt: string;
}

interface HistorySidebarProps {
  refreshTrigger: number;
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function HistorySidebar({ refreshTrigger, isCollapsed, onToggle }: HistorySidebarProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, [refreshTrigger]);

  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/logs');
      if (response.ok) {
        const data = await response.json();
        setLogs(data.logs || []);
      }
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      {/* Collapsed state - floating button */}
      {isCollapsed && (
        <button
          onClick={onToggle}
          className="fixed top-6 left-6 z-50 p-3 bg-surface border border-custom rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:bg-surface-hover"
          title="Expand sidebar"
        >
          <svg
            className="w-5 h-5 text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}

      {/* Expanded state - full sidebar */}
      {!isCollapsed && (
        <div className="fixed top-0 left-0 w-80 h-full bg-surface border-r border-custom p-6 overflow-y-auto z-40">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-primary">Recent History</h2>
            <button
              onClick={onToggle}
              className="p-2 hover:bg-surface-hover rounded-lg transition-colors"
              title="Collapse sidebar"
            >
              <svg
                className="w-5 h-5 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>

          {loading ? (
            <div className="text-center text-secondary animate-fade-in">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-accent-primary"></div>
              <p className="mt-2">Loading...</p>
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center text-tertiary animate-fade-in">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>No history yet</p>
              <p className="text-sm mt-1">Your fact requests will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className={`card p-4 rounded-lg transition-all duration-200 hover:scale-[1.01] cursor-pointer group ${
                    log.isWarning
                      ? 'bg-warning border-warning'
                      : 'hover:border-accent-primary/30'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-primary truncate flex-1">
                      {log.topic}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      log.isWarning
                        ? 'text-warning bg-warning/10 border border-warning/20'
                        : 'text-accent-primary bg-accent-primary/10 border border-accent-primary/20'
                    }`}>
                      {log.isWarning ? '⚠️ Warning' : '✓ Fact'}
                    </span>
                  </div>
                  <p className="text-sm text-secondary mb-3 line-clamp-3 leading-relaxed">
                    {log.responseText}
                  </p>
                  <div className="text-xs text-tertiary flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatDate(log.createdAt)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
