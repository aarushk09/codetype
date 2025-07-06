'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { CodeSnippet, getRandomSnippet, languages, difficulties } from '@/data/codeSnippets';

interface TypingStats {
  wpm: number;
  accuracy: number;
  timeElapsed: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
}

interface TestState {
  isActive: boolean;
  isComplete: boolean;
  startTime: number | null;
  currentIndex: number;
  userInput: string;
  errors: Set<number>;
}

export default function TypingTest() {
  const [snippet, setSnippet] = useState<CodeSnippet | null>(null);
  const [testState, setTestState] = useState<TestState>({
    isActive: false,
    isComplete: false,
    startTime: null,
    currentIndex: 0,
    userInput: '',
    errors: new Set(),
  });
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    accuracy: 100,
    timeElapsed: 0,
    correctChars: 0,
    incorrectChars: 0,
    totalChars: 0,
  });
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  
  const codeDisplayRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const updateStats = useCallback((timeElapsed: number) => {
    if (!snippet) return;

    const correctChars = testState.userInput.split('').filter((char, index) => 
      char === snippet.code[index]
    ).length;
    
    const incorrectChars = testState.userInput.length - correctChars;
    const totalChars = testState.userInput.length;
    
    const wpm = totalChars > 0 ? Math.round((correctChars / 5) * (60 / Math.max(timeElapsed, 1))) : 0;
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;

    setStats({
      wpm,
      accuracy,
      timeElapsed: Math.round(timeElapsed * 10) / 10,
      correctChars,
      incorrectChars,
      totalChars,
    });
  }, [snippet, testState.userInput]);

  const resetTest = useCallback(() => {
    const newSnippet = getRandomSnippet(
      selectedLanguage || undefined, 
      selectedDifficulty || undefined
    );
    setSnippet(newSnippet);
    setTestState({
      isActive: false,
      isComplete: false,
      startTime: null,
      currentIndex: 0,
      userInput: '',
      errors: new Set(),
    });
    setStats({
      wpm: 0,
      accuracy: 100,
      timeElapsed: 0,
      correctChars: 0,
      incorrectChars: 0,
      totalChars: 0,
    });
    
    // Focus code display after reset
    setTimeout(() => {
      codeDisplayRef.current?.focus();
    }, 100);
  }, [selectedLanguage, selectedDifficulty]);

  // Load initial snippet
  useEffect(() => {
    resetTest();
  }, [resetTest]);

  // Timer effect
  useEffect(() => {
    if (testState.isActive && testState.startTime) {
      intervalRef.current = setInterval(() => {
        const timeElapsed = (Date.now() - testState.startTime!) / 1000;
        updateStats(timeElapsed);
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [testState.isActive, testState.startTime, updateStats]);

  const handleInputChange = useCallback((value: string) => {
    if (!snippet) return;

    // Start test on first character
    if (!testState.isActive && value.length > 0) {
      setTestState(prev => ({
        ...prev,
        isActive: true,
        startTime: Date.now(),
      }));
    }

    // Check if test is complete
    if (value.length >= snippet.code.length) {
      setTestState(prev => ({
        ...prev,
        isActive: false,
        isComplete: true,
        userInput: value.slice(0, snippet.code.length),
      }));
      return;
    }

    // Update errors
    const newErrors = new Set<number>();
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== snippet.code[i]) {
        newErrors.add(i);
      }
    }

    setTestState(prev => ({
      ...prev,
      userInput: value,
      currentIndex: value.length,
      errors: newErrors,
    }));
  }, [snippet, testState.isActive]);

  // Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if test is complete or we're typing in a form element
      if (testState.isComplete || 
          (e.target as HTMLElement)?.tagName?.toLowerCase() === 'select' ||
          (e.target as HTMLElement)?.tagName?.toLowerCase() === 'button') {
        return;
      }

      // Prevent default behavior for most keys to avoid page navigation
      if (e.key !== 'Tab' && e.key !== 'F5' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
      }

      if (e.key === 'Backspace') {
        // Handle backspace
        if (testState.userInput.length > 0) {
          const newInput = testState.userInput.slice(0, -1);
          handleInputChange(newInput);
        }
      } else if (e.key.length === 1) {
        // Handle regular character input
        handleInputChange(testState.userInput + e.key);
      } else if (e.key === 'Enter') {
        // Handle enter key
        handleInputChange(testState.userInput + '\n');
      }
    };

    // Add event listener to document
    document.addEventListener('keydown', handleKeyDown);

    // Focus the code display when component mounts
    if (codeDisplayRef.current) {
      codeDisplayRef.current.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [testState.userInput, testState.isComplete, handleInputChange]);

  const renderCode = () => {
    if (!snippet) return null;

    return snippet.code.split('').map((char, index) => {
      let className = 'relative ';
      
      if (index < testState.userInput.length) {
        // Character has been typed
        if (testState.errors.has(index)) {
          className += 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200';
        } else {
          className += 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200';
        }
      } else if (index === testState.currentIndex && testState.isActive) {
        // Current character cursor
        className += 'bg-blue-500 text-white animate-pulse';
      } else {
        // Untyped characters
        className += 'text-gray-600 dark:text-gray-400';
      }

      return (
        <span key={index} className={className}>
          {char === '\n' ? (
            <>
              {'\n'}
              <br />
            </>
          ) : char === ' ' ? (
            '\u00A0' // Non-breaking space for visibility
          ) : (
            char
          )}
        </span>
      );
    });
  };

  if (!snippet) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          CodeType
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Test your coding typing speed and accuracy
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 justify-center items-center">
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          disabled={testState.isActive}
        >
          <option value="">All Languages</option>
          {languages.map(lang => (
            <option key={lang} value={lang}>
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          disabled={testState.isActive}
        >
          <option value="">All Difficulties</option>
          {difficulties.map(diff => (
            <option key={diff} value={diff}>
              {diff.charAt(0).toUpperCase() + diff.slice(1)}
            </option>
          ))}
        </select>

        <button
          onClick={resetTest}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          disabled={testState.isActive}
        >
          New Test
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-blue-500">{stats.wpm}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">WPM</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-green-500">{stats.accuracy}%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-purple-500">{stats.timeElapsed}s</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Time</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-orange-500">
            {snippet.language}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Language</div>
        </div>
      </div>

      {/* Code Display */}
      <div 
        ref={codeDisplayRef}
        tabIndex={0}
        className="bg-gray-900 rounded-lg p-6 relative focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
        onClick={() => codeDisplayRef.current?.focus()}
      >
        <div className="absolute top-4 right-4 text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
          {snippet.language} • {snippet.difficulty}
        </div>
        {!testState.isActive && testState.userInput.length === 0 && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none">
            Click here and start typing to begin...
          </div>
        )}
        <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap overflow-hidden">
          {renderCode()}
        </pre>
      </div>

      {/* Results */}
      {testState.isComplete && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4">
            Test Complete! 🎉
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Final WPM:</span> {stats.wpm}
            </div>
            <div>
              <span className="font-medium">Accuracy:</span> {stats.accuracy}%
            </div>
            <div>
              <span className="font-medium">Time:</span> {stats.timeElapsed}s
            </div>
            <div>
              <span className="font-medium">Correct chars:</span> {stats.correctChars}
            </div>
            <div>
              <span className="font-medium">Errors:</span> {stats.incorrectChars}
            </div>
            <div>
              <span className="font-medium">Total chars:</span> {stats.totalChars}
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 space-y-1">
        <p>💡 Click on the code area and start typing to begin the test</p>
        <p>⚡ Your typing speed (WPM) and accuracy are calculated in real-time</p>
        <p>🎯 Challenge yourself with different languages and difficulty levels</p>
      </div>
    </div>
  );
} 