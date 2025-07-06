export interface CodeSnippet {
  id: string;
  language: string;
  code: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const codeSnippets: CodeSnippet[] = [
  // JavaScript - Easy
  {
    id: 'js-1',
    language: 'javascript',
    code: 'function greet(name) {\n  return `Hello, ${name}!`;\n}',
    difficulty: 'easy'
  },
  {
    id: 'js-2', 
    language: 'javascript',
    code: 'const numbers = [1, 2, 3, 4, 5];\nconst sum = numbers.reduce((acc, num) => acc + num, 0);',
    difficulty: 'easy'
  },
  {
    id: 'js-3',
    language: 'javascript',
    code: 'if (user.isActive && user.age >= 18) {\n  console.log("User can access the content");\n} else {\n  console.log("Access denied");\n}',
    difficulty: 'easy'
  },

  // JavaScript - Medium
  {
    id: 'js-4',
    language: 'javascript',
    code: 'async function fetchUserData(userId) {\n  try {\n    const response = await fetch(`/api/users/${userId}`);\n    const userData = await response.json();\n    return userData;\n  } catch (error) {\n    console.error("Failed to fetch user data:", error);\n    throw error;\n  }\n}',
    difficulty: 'medium'
  },
  {
    id: 'js-5',
    language: 'javascript',
    code: 'class TaskManager {\n  constructor() {\n    this.tasks = [];\n  }\n\n  addTask(task) {\n    this.tasks.push({ ...task, id: Date.now(), completed: false });\n  }\n\n  completeTask(id) {\n    const task = this.tasks.find(t => t.id === id);\n    if (task) task.completed = true;\n  }\n}',
    difficulty: 'medium'
  },

  // Python - Easy
  {
    id: 'py-1',
    language: 'python',
    code: 'def calculate_area(radius):\n    return 3.14159 * radius ** 2\n\narea = calculate_area(5)\nprint(f"Area: {area}")',
    difficulty: 'easy'
  },
  {
    id: 'py-2',
    language: 'python',
    code: 'numbers = [1, 2, 3, 4, 5]\nsquared = [x**2 for x in numbers if x % 2 == 0]\nprint(squared)',
    difficulty: 'easy'
  },

  // Python - Medium
  {
    id: 'py-3',
    language: 'python',
    code: 'import json\n\ndef process_data(filename):\n    try:\n        with open(filename, "r") as file:\n            data = json.load(file)\n            return [item for item in data if item.get("active", False)]\n    except FileNotFoundError:\n        print(f"File {filename} not found")\n        return []',
    difficulty: 'medium'
  },

  // TypeScript - Medium
  {
    id: 'ts-1',
    language: 'typescript',
    code: 'interface User {\n  id: number;\n  name: string;\n  email: string;\n  isActive: boolean;\n}\n\nfunction getUserById(users: User[], id: number): User | undefined {\n  return users.find(user => user.id === id);\n}',
    difficulty: 'medium'
  },

  // React - Medium
  {
    id: 'react-1',
    language: 'tsx',
    code: 'import { useState, useEffect } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    document.title = `Count: ${count}`;\n  }, [count]);\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}',
    difficulty: 'medium'
  },

  // CSS - Easy
  {
    id: 'css-1',
    language: 'css',
    code: '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n}',
    difficulty: 'easy'
  },

  // SQL - Easy
  {
    id: 'sql-1',
    language: 'sql',
    code: 'SELECT u.name, COUNT(o.id) as order_count\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nWHERE u.created_at >= "2024-01-01"\nGROUP BY u.id, u.name\nORDER BY order_count DESC;',
    difficulty: 'easy'
  }
];

export function getRandomSnippet(language?: string, difficulty?: string): CodeSnippet {
  let filteredSnippets = codeSnippets;
  
  if (language) {
    filteredSnippets = filteredSnippets.filter(snippet => snippet.language === language);
  }
  
  if (difficulty) {
    filteredSnippets = filteredSnippets.filter(snippet => snippet.difficulty === difficulty);
  }
  
  const randomIndex = Math.floor(Math.random() * filteredSnippets.length);
  return filteredSnippets[randomIndex] || codeSnippets[0];
}

export const languages = ['javascript', 'python', 'typescript', 'tsx', 'css', 'sql'];
export const difficulties = ['easy', 'medium', 'hard']; 