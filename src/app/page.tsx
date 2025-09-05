'use client';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { useState } from 'react';
import FactForm from '@/components/FactForm';
import ResultDisplay from '@/components/ResultDisplay';
import HistorySidebar from '@/components/HistorySidebar';
import { cn } from '@/lib/utils';

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
    <>
      <SignedOut>
        <div className="min-h-screen bg-surface flex flex-col items-center justify-center">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-5xl font-bold text-primary">
              Welcome to Factly
            </h1>
            <p className="text-xl text-secondary max-w-2xl leading-relaxed">
              Your AI-powered fact finder. Get instant, accurate information on any topic.
            </p>
            <div className="pt-6">
              <SignInButton>
                <button className="btn-primary px-8 py-3 rounded-lg text-lg font-medium">
                  Get Started
                </button>
              </SignInButton>
            </div>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="min-h-screen bg-surface flex">
          {/* Sidebar */}
          <HistorySidebar
            isCollapsed={isSidebarCollapsed}
            onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            refreshTrigger={refreshTrigger}
          />

          {/* Main content */}
          <div className={cn(
            "flex-1 transition-all duration-300 ease-in-out",
            isSidebarCollapsed ? "ml-16" : "ml-80"
          )}>
            <div className="flex flex-col min-h-screen">
              {/* User Button positioned in top-right */}
              <div className="absolute top-4 right-4 z-50">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-10 h-10"
                    },
                    variables: {
                      colorPrimary: '#3b82f6',
                      colorBackground: '#111111',
                      colorText: '#ffffff',
                      colorTextSecondary: '#a1a1a1',
                      colorNeutral: '#222222',
                      colorShimmer: '#1a1a1a'
                    }
                  }}
                />
              </div>

              {/* Main content area */}
              <main className="flex-1 flex flex-col justify-center items-center p-8">
                {/* Welcome Message */}
                <div className="text-center mb-8 animate-fade-in">
                  <h1 className="text-4xl font-bold text-primary mb-4">
                    Welcome to Factly
                  </h1>
                  <p className="text-lg text-secondary max-w-2xl leading-relaxed">
                    Get instant, AI-powered facts on any topic. Simply type your question
                    and receive accurate, concise information in seconds.
                  </p>
                </div>

                {/* Fact Form */}
                <div className="w-full max-w-2xl mb-8">
                  <FactForm
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                  />
                </div>

                {/* Result Display */}
                {result && (
                  <div className="w-full max-w-4xl animate-fade-in">
                    <ResultDisplay
                      result={result}
                      isWarning={isWarning}
                    />
                  </div>
                )}
              </main>
            </div>
          </div>
        </div>
      </SignedIn>
    </>
  );
}
