'use client';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { useState } from 'react';
import FactForm from '@/components/FactForm';
import ResultDisplay from '@/components/ResultDisplay';
import HistorySidebar from '@/components/HistorySidebar';

export default function Home() {
  const [result, setResult] = useState<string | null>(null);
  const [isWarning, setIsWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSubmit = async (topic: string) => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/fact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();

      if (data.message) {
        setResult(data.message);
        setIsWarning(data.message.startsWith('⚠️'));
        setRefreshTrigger(prev => prev + 1); // Trigger history refresh
      } else if (data.error) {
        setResult(`Error: ${data.error}`);
        setIsWarning(true);
      }
    } catch {
      setResult('Failed to connect to server. Please try again.');
      setIsWarning(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SignedOut>
        {/* Landing page for unauthenticated users */}
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
          <div className="text-center max-w-2xl">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Factly
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover fascinating facts about any topic. Get interesting,
              non-obvious insights powered by AI.
            </p>
            <SignInButton>
              <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        {/* Protected main app */}
        <div className="h-screen relative">
          {/* User profile button - top right corner, aligned with sidebar toggle */}
          <div className="fixed top-6 right-6 z-50">
            <UserButton />
          </div>

          {/* History sidebar component (handles its own positioning) */}
          <HistorySidebar
            refreshTrigger={refreshTrigger}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={setIsSidebarCollapsed}
          />

          {/* Main content area - adjusts based on sidebar state */}
          <div className={`h-full flex flex-col items-center justify-start p-8 transition-all duration-300 ${
            isSidebarCollapsed ? 'ml-0' : 'ml-80'
          }`}>
            <div className="w-full max-w-4xl">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Factly
                </h1>
                <p className="text-lg text-gray-600">
                  What would you like to learn about today?
                </p>
              </div>

              <div className="flex flex-col items-center">
                <FactForm onSubmit={handleSubmit} isLoading={isLoading} />
                <ResultDisplay result={result} isWarning={isWarning} />
              </div>
            </div>
          </div>
        </div>
      </SignedIn>
    </div>
  );
}
