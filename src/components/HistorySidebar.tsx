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
  onToggleCollapse: (collapsed: boolean) => void;
}

export default function HistorySidebar({ refreshTrigger, isCollapsed, onToggleCollapse }: HistorySidebarProps) {
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
          onClick={() => onToggleCollapse(false)}
          className="fixed top-6 left-6 z-50 p-3 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-50"
          title="Expand sidebar"
        >
          <svg
            className="w-5 h-5 text-gray-600"
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
        <div className="fixed top-0 left-0 w-80 h-full bg-gray-50 border-r border-gray-200 p-6 overflow-y-auto z-40">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent History</h2>
            <button
              onClick={() => onToggleCollapse(true)}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              title="Collapse sidebar"
            >
              <svg
                className="w-5 h-5 text-gray-600"
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
            <div className="text-center text-gray-500">Loading...</div>
          ) : logs.length === 0 ? (
            <div className="text-center text-gray-500">No history yet</div>
          ) : (
            <div className="space-y-4">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className={`p-3 rounded-lg border ${
                    log.isWarning
                      ? 'border-orange-200 bg-orange-50'
                      : 'border-blue-200 bg-blue-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-600">
                      {log.topic}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      log.isWarning
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {log.isWarning ? 'Warning' : 'Fact'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2 line-clamp-3">
                    {log.responseText}
                  </p>
                  <div className="text-xs text-gray-500">
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
