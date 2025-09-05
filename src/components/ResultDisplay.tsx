'use client';

import { useState } from 'react';

interface ResultDisplayProps {
  result: string | null;
  isWarning: boolean;
}

export default function ResultDisplay({ result, isWarning }: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (result && !isWarning) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!result) return null;

  return (
    <div className="w-full">
      <div className={`card p-8 rounded-2xl transition-all duration-300 ${
        isWarning
          ? 'bg-warning border-warning'
          : 'border-accent-primary/20 bg-surface hover:border-accent-primary/40'
      }`}>
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              {isWarning ? (
                <div className="flex items-center gap-2 text-warning">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L5.368 15.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="font-semibold">Content Warning</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-accent-primary">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className="font-semibold text-primary">Fact Generated</span>
                </div>
              )}
            </div>

            <p className={`text-lg leading-relaxed ${
              isWarning ? 'text-warning' : 'text-primary'
            }`}>
              {result}
            </p>
          </div>

          {!isWarning && (
            <button
              onClick={handleCopy}
              className={`btn-secondary px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium flex-shrink-0 transition-all duration-200 ${
                copied ? 'text-success border-success/30 bg-success/10' : ''
              }`}
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Action buttons for non-warning results */}
      {!isWarning && (
        <div className="flex justify-center gap-3 mt-4">
          <button className="btn-secondary px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:border-accent-primary/50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            Share
          </button>
          <button className="btn-secondary px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:border-accent-primary/50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Save
          </button>
        </div>
      )}
    </div>
  );
}
