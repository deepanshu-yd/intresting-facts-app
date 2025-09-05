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
    <div className="w-full max-w-2xl mt-8">
      <div className={`p-6 rounded-lg border ${
        isWarning
          ? 'border-orange-200 bg-orange-50 text-orange-800'
          : 'border-green-200 bg-green-50 text-green-800'
      }`}>
        <div className="flex justify-between items-start gap-4">
          <p className="flex-1 text-lg leading-relaxed">{result}</p>
          {!isWarning && (
            <button
              onClick={handleCopy}
              className="px-3 py-1 text-sm bg-white border border-green-300 rounded hover:bg-green-100 transition-colors flex-shrink-0"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
