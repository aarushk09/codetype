'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// Mock data for the demo
const languages = ['javascript', 'python', 'java', 'cpp', 'typescript', 'rust', 'go'];
const difficulties = ['easy', 'medium', 'hard'];

const codeSnippets = [
  {
    id: 1,
    language: 'javascript',
    difficulty: 'medium',
    code: `const fibonacci = (n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

const result = fibonacci(10);
console.log(result);`
  },
  {
    id: 2,
    language: 'python',
    difficulty: 'easy',
    code: `def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`
  }
];

const getRandomSnippet = (language?: string, difficulty?: string) => {
  let filtered = codeSnippets;
  if (language) filtered = filtered.filter(s => s.language === language);
  if (difficulty) filtered = filtered.filter(s => s.difficulty === difficulty);
  return filtered[Math.floor(Math.random() * filtered.length)] || codeSnippets[0];
};

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
  interface CodeSnippet {
    id: number;
    language: string;
    difficulty: string;
    code: string;
  }

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
  const [showOverlay, setShowOverlay] = useState<boolean>(true);
  
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
    setShowOverlay(true);
    
    setTimeout(() => {
      codeDisplayRef.current?.focus();
    }, 100);
  }, [selectedLanguage, selectedDifficulty]);

  useEffect(() => {
    resetTest();
  }, [resetTest]);

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

    if (!testState.isActive && value.length > 0) {
      setShowOverlay(false);
      setTestState(prev => ({
        ...prev,
        isActive: true,
        startTime: Date.now(),
      }));
    }

    if (value.length >= snippet.code.length) {
      setTestState(prev => ({
        ...prev,
        isActive: false,
        isComplete: true,
        userInput: value.slice(0, snippet.code.length),
      }));
      return;
    }

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

  const handleOverlayClick = () => {
    setShowOverlay(false);
    codeDisplayRef.current?.focus();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (testState.isComplete || 
          (e.target as HTMLElement)?.tagName?.toLowerCase() === 'select' ||
          (e.target as HTMLElement)?.tagName?.toLowerCase() === 'button') {
        return;
      }

      if (!e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
      }

      if (e.key === 'Backspace') {
        if (testState.userInput.length > 0) {
          const newInput = testState.userInput.slice(0, -1);
          handleInputChange(newInput);
        }
      } else if (e.key === 'Tab') {
        handleInputChange(testState.userInput + '  ');
      } else if (e.key === 'Enter') {
        handleInputChange(testState.userInput + '\n');
      } else if (e.key.length === 1) {
        handleInputChange(testState.userInput + e.key);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

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
        if (testState.errors.has(index)) {
          className += 'text-red-400 bg-red-500/10 border-b-2 border-red-500';
        } else {
          className += 'text-green-400';
        }
      } else if (index === testState.currentIndex && testState.isActive) {
        className += 'text-white border-b-2 border-cyan-400 bg-cyan-400/10 animate-pulse';
      } else {
        className += 'text-gray-500';
      }

      return (
        <span key={index} className={className}>
          {char === '\n' ? (
            <>
              {'\n'}
              <br />
            </>
          ) : char === ' ' ? (
            '\u00A0'
          ) : (
            char
          )}
        </span>
      );
    });
  };

  if (!snippet) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <div>
            <h1 className="text-4xl font-thin tracking-wider text-white mb-2">
              TYPECODE
            </h1>
            <div className="w-16 h-px bg-white/30"></div>
          </div>
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <div className="text-xs text-gray-400 uppercase tracking-widest">TIME</div>
              <div className="text-2xl font-mono font-light text-cyan-400 mt-1">{stats.timeElapsed}</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar - Controls */}
          <div className="col-span-3 space-y-6 mt-[-10px]">
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-widest mb-3">
                Language
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full bg-black border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-cyan-400 transition-colors"
                disabled={testState.isActive}
              >
                <option value="">All</option>
                {languages.map(lang => (
                  <option key={lang} value={lang}>
                    {lang.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-widest mb-3">
                Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full bg-black border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-cyan-400 transition-colors"
                disabled={testState.isActive}
              >
                <option value="">All</option>
                {difficulties.map(diff => (
                  <option key={diff} value={diff}>
                    {diff.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={resetTest}
              className="w-full bg-cyan-500 text-black py-3 px-6 hover:bg-cyan-400 transition-colors focus:outline-none font-medium"
              disabled={false}
            >
              NEW TEST
            </button>

            {/* Stats Sidebar */}
            <div className="pt-8 space-y-6">
              <div className="border-t border-gray-800 pt-6">
                <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">WPM</div>
                <div className="text-3xl font-mono font-light text-cyan-400">{stats.wpm}</div>
              </div>
              
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">Accuracy</div>
                <div className="text-3xl font-mono font-light text-green-400">{stats.accuracy}%</div>
              </div>
              
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">Characters</div>
                <div className="text-xl font-mono font-light text-purple-400">{stats.correctChars}/{stats.totalChars}</div>
              </div>
            </div>
          </div>

          {/* Main Code Area */}
          <div className="col-span-9">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-xs text-gray-400 uppercase tracking-widest">
                  {snippet.language} • {snippet.difficulty}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <div className="text-xs text-gray-400">
                  {testState.isActive ? 'ACTIVE' : testState.isComplete ? 'COMPLETE' : 'READY'}
                </div>
              </div>
            </div>

            <div className="relative">
              <div 
                ref={codeDisplayRef}
                tabIndex={0}
                className="bg-black border border-gray-700 p-8 min-h-96 focus:outline-none focus:border-cyan-400 transition-colors cursor-text"
                onClick={() => codeDisplayRef.current?.focus()}
              >
                <pre className="font-mono text-base leading-loose whitespace-pre-wrap">
                  {renderCode()}
                </pre>
              </div>

              {/* Overlay with blur effect */}
              {showOverlay && (
                <div 
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-black/70"
                  onClick={handleOverlayClick}
                >
                  <div className="text-center">
                    <div className="text-3xl font-thin tracking-wider text-white mb-4">Click to Begin</div>
                    <div className="text-sm text-gray-400">Start typing to activate the test</div>
                    <div className="w-24 h-px bg-white/30 mx-auto mt-4"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Modal */}
        {testState.isComplete && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-black border border-white p-12 max-w-2xl w-full mx-4">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-thin tracking-wider mb-2">TEST COMPLETE</h2>
                <div className="w-24 h-px bg-white mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">WORDS/MIN</div>
                  <div className="text-4xl font-mono font-light text-cyan-400">{stats.wpm}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">ACCURACY</div>
                  <div className="text-4xl font-mono font-light text-green-400">{stats.accuracy}%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">TIME</div>
                  <div className="text-4xl font-mono font-light text-purple-400">{stats.timeElapsed}s</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 text-sm mb-8">
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">PERFORMANCE</div>
                  <div className="space-y-1">
                    <div>Total Characters: {stats.totalChars}</div>
                    <div>Correct: {stats.correctChars}</div>
                    <div>Errors: {stats.incorrectChars}</div>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">DETAILS</div>
                  <div className="space-y-1">
                    <div>Language: {snippet.language.toUpperCase()}</div>
                    <div>Difficulty: {snippet.difficulty.toUpperCase()}</div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={resetTest}
                  className="bg-cyan-500 text-black py-3 px-8 hover:bg-cyan-400 transition-colors focus:outline-none font-medium"
                >
                  START NEW TEST
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}