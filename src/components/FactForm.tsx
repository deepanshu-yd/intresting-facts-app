'use client';

import { useState } from 'react';

interface FactFormProps {
  onSubmit: (topic: string) => void;
  isLoading: boolean;
}

export default function FactForm({ onSubmit, isLoading }: FactFormProps) {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit(topic.trim());
      setTopic('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ask about anything: space, history, science, technology..."
            className="input-field w-full px-6 py-4 rounded-xl text-lg placeholder:text-tertiary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            disabled={isLoading}
            maxLength={120}
          />
          <div className="absolute bottom-2 right-4 text-xs text-tertiary">
            {topic.length}/120
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className="btn-primary w-full px-8 py-4 rounded-xl text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200 flex items-center justify-center gap-3"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Generating fact...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Discover a Fact
            </>
          )}
        </button>
      </div>

      {/* Suggested topics */}
      {!topic && !isLoading && (
        <div className="mt-6 animate-fade-in">
          <p className="text-sm text-tertiary mb-3 text-center">Popular topics:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['Space exploration', 'Ancient history', 'Ocean mysteries', 'Human brain', 'Climate science'].map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setTopic(suggestion)}
                className="btn-secondary px-3 py-1.5 rounded-full text-sm hover:border-accent-primary/50 transition-all duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </form>
  );
}
