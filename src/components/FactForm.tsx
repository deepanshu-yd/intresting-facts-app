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
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic (e.g., space, history, nature...)"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading}
          maxLength={120}
        />
        <button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Getting fact...' : 'Get Fact'}
        </button>
      </div>
    </form>
  );
}
