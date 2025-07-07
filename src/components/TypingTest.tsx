'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// Mock data for the demo
const languages = ['javascript', 'python', 'java', 'cpp', 'typescript', 'rust', 'go'];
const difficulties = ['easy', 'medium', 'hard'];

const codeSnippets = [
  // JavaScript snippets
  {
    id: 1,
    language: 'javascript',
    difficulty: 'easy',
    code: `function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("World"));`
  },
  {
    id: 2,
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
    id: 3,
    language: 'javascript',
    difficulty: 'hard',
    code: `class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
}

const emitter = new EventEmitter();
emitter.on('test', (data) => console.log(data));
emitter.emit('test', 'Hello Events!');`
  },
  
  // Python snippets
  {
    id: 4,
    language: 'python',
    difficulty: 'easy',
    code: `def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`
  },
  {
    id: 5,
    language: 'python',
    difficulty: 'medium',
    code: `class Calculator:
    def __init__(self):
        self.history = []
    
    def add(self, a, b):
        result = a + b
        self.history.append(f"{a} + {b} = {result}")
        return result
    
    def get_history(self):
        return self.history

calc = Calculator()
print(calc.add(5, 3))`
  },
  {
    id: 6,
    language: 'python',
    difficulty: 'hard',
    code: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)

numbers = [3, 6, 8, 10, 1, 2, 1]
sorted_numbers = quick_sort(numbers)
print(f"Sorted: {sorted_numbers}")`
  },
  
  // Java snippets
  {
    id: 7,
    language: 'java',
    difficulty: 'easy',
    code: `public class Hello {
    public static void main(String[] args) {
        String message = "Hello, Java!";
        System.out.println(message);
    }
}`
  },
  {
    id: 8,
    language: 'java',
    difficulty: 'medium',
    code: `public class ArraySum {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5};
        int sum = 0;
        
        for (int num : numbers) {
            sum += num;
        }
        
        System.out.println("Sum: " + sum);
    }
}`
  },
  {
    id: 9,
    language: 'java',
    difficulty: 'hard',
    code: `import java.util.*;

public class QuickSort {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
    
    public static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = (low - 1);
        
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        
        return i + 1;
    }
}`
  },
  
  // C++ snippets
  {
    id: 10,
    language: 'cpp',
    difficulty: 'easy',
    code: `#include <iostream>
using namespace std;

int main() {
    string message = "Hello, C++!";
    cout << message << endl;
    return 0;
}`
  },
  {
    id: 11,
    language: 'cpp',
    difficulty: 'medium',
    code: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> nums = {1, 2, 3, 4, 5};
    int sum = 0;
    
    for (const auto& num : nums) {
        sum += num;
    }
    
    std::cout << "Sum: " << sum << std::endl;
    return 0;
}`
  },
  {
    id: 12,
    language: 'cpp',
    difficulty: 'hard',
    code: `#include <iostream>
#include <vector>
#include <algorithm>

class QuickSort {
public:
    static void sort(std::vector<int>& arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            sort(arr, low, pi - 1);
            sort(arr, pi + 1, high);
        }
    }
    
private:
    static int partition(std::vector<int>& arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                std::swap(arr[i], arr[j]);
            }
        }
        std::swap(arr[i + 1], arr[high]);
        return i + 1;
    }
};`
  },
  
  // TypeScript snippets
  {
    id: 13,
    language: 'typescript',
    difficulty: 'easy',
    code: `function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet("TypeScript"));`
  },
  {
    id: 14,
    language: 'typescript',
    difficulty: 'medium',
    code: `interface User {
  id: number;
  name: string;
  email: string;
}

function createUser(name: string, email: string): User {
  return {
    id: Math.floor(Math.random() * 1000),
    name,
    email
  };
}

const user = createUser("John Doe", "john@example.com");
console.log(user);`
  },
  {
    id: 15,
    language: 'typescript',
    difficulty: 'hard',
    code: `abstract class Shape {
  abstract area(): number;
  abstract perimeter(): number;
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }
  
  area(): number {
    return this.width * this.height;
  }
  
  perimeter(): number {
    return 2 * (this.width + this.height);
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }
  
  area(): number {
    return Math.PI * this.radius * this.radius;
  }
  
  perimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

const rect = new Rectangle(5, 3);
console.log(\`Rectangle area: \${rect.area()}\`);`
  },
  
  // Rust snippets
  {
    id: 16,
    language: 'rust',
    difficulty: 'easy',
    code: `fn main() {
    let message = "Hello, Rust!";
    println!("{}", message);
}`
  },
  {
    id: 17,
    language: 'rust',
    difficulty: 'medium',
    code: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    
    let doubled: Vec<i32> = numbers
        .iter()
        .map(|x| x * 2)
        .collect();
    
    println!("Original: {:?}", numbers);
    println!("Doubled: {:?}", doubled);
}`
  },
  {
    id: 18,
    language: 'rust',
    difficulty: 'hard',
    code: `use std::collections::HashMap;

#[derive(Debug)]
struct Person {
    name: String,
    age: u32,
}

impl Person {
    fn new(name: String, age: u32) -> Self {
        Person { name, age }
    }
    
    fn greet(&self) -> String {
        format!("Hello, I'm {} and I'm {} years old", self.name, self.age)
    }
}

fn main() {
    let mut people: HashMap<u32, Person> = HashMap::new();
    
    people.insert(1, Person::new("Alice".to_string(), 30));
    people.insert(2, Person::new("Bob".to_string(), 25));
    
    for (id, person) in &people {
        println!("ID {}: {}", id, person.greet());
    }
}`
  },
  
  // Go snippets
  {
    id: 19,
    language: 'go',
    difficulty: 'easy',
    code: `package main

import "fmt"

func main() {
    message := "Hello, Go!"
    fmt.Println(message)
}`
  },
  {
    id: 20,
    language: 'go',
    difficulty: 'medium',
    code: `package main

import "fmt"

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    sum := 0
    
    for _, num := range numbers {
        sum += num
    }
    
    fmt.Printf("Sum: %d\n", sum)
}`
  },
  {
    id: 21,
    language: 'go',
    difficulty: 'hard',
    code: `package main

import (
    "fmt"
    "sync"
)

type Counter struct {
    mu    sync.Mutex
    value int
}

func (c *Counter) Increment() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.value++
}

func (c *Counter) Value() int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.value
}

func main() {
    counter := &Counter{}
    var wg sync.WaitGroup
    
    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            counter.Increment()
        }()
    }
    
    wg.Wait()
    fmt.Printf("Final count: %d\n", counter.Value())
}`
  }
];

const getRandomSnippet = (language?: string, difficulty?: string) => {
  // First try to filter by both language and difficulty
  if (language && difficulty) {
    const exactMatch = codeSnippets.filter(s => 
      s.language.toLowerCase() === language.toLowerCase() && 
      s.difficulty.toLowerCase() === difficulty.toLowerCase()
    );
    if (exactMatch.length > 0) {
      return exactMatch[Math.floor(Math.random() * exactMatch.length)];
    }
  }
  
  // If no exact match, try filtering by language only
  if (language) {
    const languageMatch = codeSnippets.filter(s => s.language.toLowerCase() === language.toLowerCase());
    if (languageMatch.length > 0) {
      return languageMatch[Math.floor(Math.random() * languageMatch.length)];
    }
  }
  
  // If no language match, try filtering by difficulty only
  if (difficulty) {
    const difficultyMatch = codeSnippets.filter(s => s.difficulty.toLowerCase() === difficulty.toLowerCase());
    if (difficultyMatch.length > 0) {
      return difficultyMatch[Math.floor(Math.random() * difficultyMatch.length)];
    }
  }
  
  // Final fallback: return any random snippet
  return codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
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