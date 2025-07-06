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
  {
    id: 'js-4',
    language: 'javascript',
    code: 'const fruits = ["apple", "banana", "orange"];\nfor (let i = 0; i < fruits.length; i++) {\n  console.log(`${i + 1}: ${fruits[i]}`);\n}',
    difficulty: 'easy'
  },
  {
    id: 'js-5',
    language: 'javascript',
    code: 'function isEven(num) {\n  return num % 2 === 0;\n}\n\nconsole.log(isEven(4));\nconsole.log(isEven(7));',
    difficulty: 'easy'
  },
  {
    id: 'js-6',
    language: 'javascript',
    code: 'const person = {\n  name: "John",\n  age: 30,\n  city: "New York"\n};\n\nconsole.log(person.name);',
    difficulty: 'easy'
  },
  {
    id: 'js-7',
    language: 'javascript',
    code: 'let count = 0;\nwhile (count < 5) {\n  console.log(`Count is: ${count}`);\n  count++;\n}',
    difficulty: 'easy'
  },
  {
    id: 'js-8',
    language: 'javascript',
    code: 'function findMax(arr) {\n  return Math.max(...arr);\n}\n\nconst nums = [3, 7, 2, 9, 1];\nconsole.log(findMax(nums));',
    difficulty: 'easy'
  },

  // JavaScript - Medium
  {
    id: 'js-medium-1',
    language: 'javascript',
    code: 'async function fetchUserData(userId) {\n  try {\n    const response = await fetch(`/api/users/${userId}`);\n    const userData = await response.json();\n    return userData;\n  } catch (error) {\n    console.error("Failed to fetch user data:", error);\n    throw error;\n  }\n}',
    difficulty: 'medium'
  },
  {
    id: 'js-medium-2',
    language: 'javascript',
    code: 'class TaskManager {\n  constructor() {\n    this.tasks = [];\n  }\n\n  addTask(task) {\n    this.tasks.push({ ...task, id: Date.now(), completed: false });\n  }\n\n  completeTask(id) {\n    const task = this.tasks.find(t => t.id === id);\n    if (task) task.completed = true;\n  }\n}',
    difficulty: 'medium'
  },
  {
    id: 'js-medium-3',
    language: 'javascript',
    code: 'function debounce(func, wait) {\n  let timeout;\n  return function executedFunction(...args) {\n    const later = () => {\n      clearTimeout(timeout);\n      func(...args);\n    };\n    clearTimeout(timeout);\n    timeout = setTimeout(later, wait);\n  };\n}',
    difficulty: 'medium'
  },
  {
    id: 'js-medium-4',
    language: 'javascript',
    code: 'const apiCall = (url) => {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      if (url.includes("error")) {\n        reject(new Error("API call failed"));\n      } else {\n        resolve({ data: "Success", url });\n      }\n    }, 1000);\n  });\n};',
    difficulty: 'medium'
  },
  {
    id: 'js-medium-5',
    language: 'javascript',
    code: 'function memoize(fn) {\n  const cache = new Map();\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) {\n      return cache.get(key);\n    }\n    const result = fn.apply(this, args);\n    cache.set(key, result);\n    return result;\n  };\n}',
    difficulty: 'medium'
  },
  {
    id: 'js-medium-6',
    language: 'javascript',
    code: 'const EventEmitter = {\n  events: {},\n  on(event, callback) {\n    if (!this.events[event]) {\n      this.events[event] = [];\n    }\n    this.events[event].push(callback);\n  },\n  emit(event, data) {\n    if (this.events[event]) {\n      this.events[event].forEach(callback => callback(data));\n    }\n  }\n};',
    difficulty: 'medium'
  },

  // JavaScript - Hard
  {
    id: 'js-hard-1',
    language: 'javascript',
    code: 'class Observable {\n  constructor(subscribeFn) {\n    this.subscribeFn = subscribeFn;\n  }\n\n  subscribe(observer) {\n    return this.subscribeFn(observer);\n  }\n\n  map(transformFn) {\n    return new Observable(observer => {\n      return this.subscribe({\n        next: value => observer.next(transformFn(value)),\n        error: err => observer.error(err),\n        complete: () => observer.complete()\n      });\n    });\n  }\n}',
    difficulty: 'hard'
  },
  {
    id: 'js-hard-2',
    language: 'javascript',
    code: 'function createAdvancedClosure() {\n  const privateVar = new WeakMap();\n  \n  return class AdvancedClass {\n    constructor(value) {\n      privateVar.set(this, { value, history: [] });\n    }\n    \n    setValue(newValue) {\n      const data = privateVar.get(this);\n      data.history.push(data.value);\n      data.value = newValue;\n      return this;\n    }\n    \n    getValue() {\n      return privateVar.get(this).value;\n    }\n    \n    getHistory() {\n      return [...privateVar.get(this).history];\n    }\n  };\n}',
    difficulty: 'hard'
  },
  {
    id: 'js-hard-3',
    language: 'javascript',
    code: 'function* fibonacciGenerator() {\n  let [prev, curr] = [0, 1];\n  while (true) {\n    yield curr;\n    [prev, curr] = [curr, prev + curr];\n  }\n}\n\nfunction createAsyncIterator(generator, delay = 100) {\n  return {\n    async *[Symbol.asyncIterator]() {\n      for (const value of generator) {\n        await new Promise(resolve => setTimeout(resolve, delay));\n        yield value;\n      }\n    }\n  };\n}',
    difficulty: 'hard'
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
  {
    id: 'py-3',
    language: 'python',
    code: 'def greet(name, age=None):\n    if age:\n        return f"Hello {name}, you are {age} years old!"\n    return f"Hello {name}!"\n\nprint(greet("Alice", 25))',
    difficulty: 'easy'
  },
  {
    id: 'py-4',
    language: 'python',
    code: 'fruits = ["apple", "banana", "cherry"]\nfor i, fruit in enumerate(fruits):\n    print(f"{i + 1}. {fruit.upper()}")',
    difficulty: 'easy'
  },
  {
    id: 'py-5',
    language: 'python',
    code: 'student_grades = {"Alice": 85, "Bob": 92, "Charlie": 78}\nfor name, grade in student_grades.items():\n    status = "Pass" if grade >= 80 else "Fail"\n    print(f"{name}: {grade} - {status}")',
    difficulty: 'easy'
  },
  {
    id: 'py-6',
    language: 'python',
    code: 'def is_palindrome(text):\n    cleaned = text.lower().replace(" ", "")\n    return cleaned == cleaned[::-1]\n\nprint(is_palindrome("A man a plan a canal Panama"))',
    difficulty: 'easy'
  },
  {
    id: 'py-7',
    language: 'python',
    code: 'import random\n\ndef roll_dice():\n    return random.randint(1, 6)\n\nfor i in range(3):\n    print(f"Roll {i+1}: {roll_dice()}")',
    difficulty: 'easy'
  },
  {
    id: 'py-8',
    language: 'python',
    code: 'def count_vowels(text):\n    vowels = "aeiouAEIOU"\n    return sum(1 for char in text if char in vowels)\n\nsentence = "Hello World"\nprint(f"Vowels: {count_vowels(sentence)}")',
    difficulty: 'easy'
  },

  // Python - Medium
  {
    id: 'py-medium-1',
    language: 'python',
    code: 'import json\n\ndef process_data(filename):\n    try:\n        with open(filename, "r") as file:\n            data = json.load(file)\n            return [item for item in data if item.get("active", False)]\n    except FileNotFoundError:\n        print(f"File {filename} not found")\n        return []',
    difficulty: 'medium'
  },
  {
    id: 'py-medium-2',
    language: 'python',
    code: 'class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self._balance = balance\n        self._transaction_history = []\n    \n    def deposit(self, amount):\n        if amount > 0:\n            self._balance += amount\n            self._transaction_history.append(f"Deposited ${amount}")\n            return True\n        return False\n    \n    def withdraw(self, amount):\n        if 0 < amount <= self._balance:\n            self._balance -= amount\n            self._transaction_history.append(f"Withdrew ${amount}")\n            return True\n        return False\n    \n    @property\n    def balance(self):\n        return self._balance',
    difficulty: 'medium'
  },
  {
    id: 'py-medium-3',
    language: 'python',
    code: 'from functools import wraps\nimport time\n\ndef timer(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        start_time = time.time()\n        result = func(*args, **kwargs)\n        end_time = time.time()\n        print(f"{func.__name__} took {end_time - start_time:.4f} seconds")\n        return result\n    return wrapper\n\n@timer\ndef slow_function():\n    time.sleep(1)\n    return "Done!"',
    difficulty: 'medium'
  },
  {
    id: 'py-medium-4',
    language: 'python',
    code: 'def fibonacci_generator(n):\n    a, b = 0, 1\n    count = 0\n    while count < n:\n        yield a\n        a, b = b, a + b\n        count += 1\n\ndef memoize(func):\n    cache = {}\n    def wrapper(*args):\n        if args in cache:\n            return cache[args]\n        result = func(*args)\n        cache[args] = result\n        return result\n    return wrapper\n\n@memoize\ndef factorial(n):\n    return 1 if n <= 1 else n * factorial(n - 1)',
    difficulty: 'medium'
  },
  {
    id: 'py-medium-5',
    language: 'python',
    code: 'import asyncio\nimport aiohttp\n\nasync def fetch_url(session, url):\n    try:\n        async with session.get(url) as response:\n            return await response.text()\n    except Exception as e:\n        return f"Error fetching {url}: {e}"\n\nasync def fetch_multiple_urls(urls):\n    async with aiohttp.ClientSession() as session:\n        tasks = [fetch_url(session, url) for url in urls]\n        return await asyncio.gather(*tasks)',
    difficulty: 'medium'
  },

  // Python - Hard
  {
    id: 'py-hard-1',
    language: 'python',
    code: 'class MetaSingleton(type):\n    _instances = {}\n    \n    def __call__(cls, *args, **kwargs):\n        if cls not in cls._instances:\n            cls._instances[cls] = super(MetaSingleton, cls).__call__(*args, **kwargs)\n        return cls._instances[cls]\n\nclass DatabaseConnection(metaclass=MetaSingleton):\n    def __init__(self):\n        self.connection = None\n        self.is_connected = False\n    \n    def connect(self, host, port, database):\n        if not self.is_connected:\n            self.connection = f"Connected to {database}@{host}:{port}"\n            self.is_connected = True\n        return self.connection',
    difficulty: 'hard'
  },
  {
    id: 'py-hard-2',
    language: 'python',
    code: 'from abc import ABC, abstractmethod\nfrom typing import Generic, TypeVar, Iterator\n\nT = TypeVar("T")\n\nclass DataStructure(ABC, Generic[T]):\n    @abstractmethod\n    def add(self, item: T) -> None:\n        pass\n    \n    @abstractmethod\n    def remove(self, item: T) -> bool:\n        pass\n    \n    @abstractmethod\n    def __iter__(self) -> Iterator[T]:\n        pass\n\nclass OptimizedSet(DataStructure[T]):\n    def __init__(self):\n        self._data = {}\n        self._size = 0\n    \n    def add(self, item: T) -> None:\n        if item not in self._data:\n            self._data[item] = True\n            self._size += 1\n    \n    def remove(self, item: T) -> bool:\n        if item in self._data:\n            del self._data[item]\n            self._size -= 1\n            return True\n        return False\n    \n    def __iter__(self) -> Iterator[T]:\n        return iter(self._data.keys())',
    difficulty: 'hard'
  },

  // TypeScript - Easy
  {
    id: 'ts-easy-1',
    language: 'typescript',
    code: 'interface Person {\n  name: string;\n  age: number;\n}\n\nfunction greetPerson(person: Person): string {\n  return `Hello, ${person.name}!`;\n}',
    difficulty: 'easy'
  },
  {
    id: 'ts-easy-2',
    language: 'typescript',
    code: 'type Status = "pending" | "completed" | "failed";\n\ninterface Task {\n  id: number;\n  title: string;\n  status: Status;\n}\n\nconst task: Task = {\n  id: 1,\n  title: "Learn TypeScript",\n  status: "pending"\n};',
    difficulty: 'easy'
  },
  {
    id: 'ts-easy-3',
    language: 'typescript',
    code: 'function add(a: number, b: number): number {\n  return a + b;\n}\n\nfunction multiply(a: number, b: number): number {\n  return a * b;\n}\n\nconst result = add(5, multiply(2, 3));',
    difficulty: 'easy'
  },
  {
    id: 'ts-easy-4',
    language: 'typescript',
    code: 'enum Color {\n  Red = "red",\n  Green = "green",\n  Blue = "blue"\n}\n\nfunction getColorCode(color: Color): string {\n  return `#${color}`;\n}\n\nconsole.log(getColorCode(Color.Red));',
    difficulty: 'easy'
  },

  // TypeScript - Medium
  {
    id: 'ts-medium-1',
    language: 'typescript',
    code: 'interface User {\n  id: number;\n  name: string;\n  email: string;\n  isActive: boolean;\n}\n\nfunction getUserById(users: User[], id: number): User | undefined {\n  return users.find(user => user.id === id);\n}',
    difficulty: 'medium'
  },
  {
    id: 'ts-medium-2',
    language: 'typescript',
    code: 'type ApiResponse<T> = {\n  success: true;\n  data: T;\n} | {\n  success: false;\n  error: string;\n};\n\nfunction processApiResponse<T>(response: ApiResponse<T>): T | null {\n  if (response.success) {\n    return response.data;\n  } else {\n    console.error("API Error:", response.error);\n    return null;\n  }\n}',
    difficulty: 'medium'
  },
  {
    id: 'ts-medium-3',
    language: 'typescript',
    code: 'class EventEmitter<T extends Record<string, any[]>> {\n  private listeners: { [K in keyof T]?: Array<(...args: T[K]) => void> } = {};\n\n  on<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void {\n    if (!this.listeners[event]) {\n      this.listeners[event] = [];\n    }\n    this.listeners[event]!.push(listener);\n  }\n\n  emit<K extends keyof T>(event: K, ...args: T[K]): void {\n    const eventListeners = this.listeners[event];\n    if (eventListeners) {\n      eventListeners.forEach(listener => listener(...args));\n    }\n  }\n}',
    difficulty: 'medium'
  },
  {
    id: 'ts-medium-4',
    language: 'typescript',
    code: 'interface Repository<T> {\n  findById(id: string): Promise<T | null>;\n  save(entity: T): Promise<T>;\n  delete(id: string): Promise<boolean>;\n}\n\nclass InMemoryRepository<T extends { id: string }> implements Repository<T> {\n  private data: Map<string, T> = new Map();\n\n  async findById(id: string): Promise<T | null> {\n    return this.data.get(id) || null;\n  }\n\n  async save(entity: T): Promise<T> {\n    this.data.set(entity.id, entity);\n    return entity;\n  }\n\n  async delete(id: string): Promise<boolean> {\n    return this.data.delete(id);\n  }\n}',
    difficulty: 'medium'
  },

  // TypeScript - Hard
  {
    id: 'ts-hard-1',
    language: 'typescript',
    code: 'type DeepReadonly<T> = {\n  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];\n};\n\ntype KeysOfType<T, U> = {\n  [K in keyof T]: T[K] extends U ? K : never;\n}[keyof T];\n\ntype OptionalKeys<T> = {\n  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;\n}[keyof T];\n\ntype RequiredKeys<T> = {\n  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;\n}[keyof T];\n\ntype PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;',
    difficulty: 'hard'
  },
  {
    id: 'ts-hard-2',
    language: 'typescript',
    code: 'abstract class BaseBuilder<T> {\n  protected abstract build(): T;\n  \n  public pipe<U>(fn: (value: T) => U): BaseBuilder<U> {\n    return new (class extends BaseBuilder<U> {\n      protected build(): U {\n        return fn(this.build());\n      }\n    })();\n  }\n}\n\nclass ConfigBuilder extends BaseBuilder<Config> {\n  private config: Partial<Config> = {};\n  \n  setHost(host: string): this {\n    this.config.host = host;\n    return this;\n  }\n  \n  setPort(port: number): this {\n    this.config.port = port;\n    return this;\n  }\n  \n  protected build(): Config {\n    return this.config as Config;\n  }\n}\n\ninterface Config {\n  host: string;\n  port: number;\n}',
    difficulty: 'hard'
  },

  // React/TSX - Easy
  {
    id: 'tsx-easy-1',
    language: 'tsx',
    code: 'import React from "react";\n\ninterface GreetingProps {\n  name: string;\n}\n\nfunction Greeting({ name }: GreetingProps) {\n  return <h1>Hello, {name}!</h1>;\n}\n\nexport default Greeting;',
    difficulty: 'easy'
  },
  {
    id: 'tsx-easy-2',
    language: 'tsx',
    code: 'import React, { useState } from "react";\n\nfunction ToggleButton() {\n  const [isOn, setIsOn] = useState(false);\n\n  return (\n    <button onClick={() => setIsOn(!isOn)}>\n      {isOn ? "ON" : "OFF"}\n    </button>\n  );\n}',
    difficulty: 'easy'
  },
  {
    id: 'tsx-easy-3',
    language: 'tsx',
    code: 'import React from "react";\n\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\ninterface UserListProps {\n  users: User[];\n}\n\nfunction UserList({ users }: UserListProps) {\n  return (\n    <ul>\n      {users.map(user => (\n        <li key={user.id}>{user.name} - {user.email}</li>\n      ))}\n    </ul>\n  );\n}',
    difficulty: 'easy'
  },

  // React/TSX - Medium
  {
    id: 'tsx-medium-1',
    language: 'tsx',
    code: 'import { useState, useEffect } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    document.title = `Count: ${count}`;\n  }, [count]);\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}',
    difficulty: 'medium'
  },
  {
    id: 'tsx-medium-2',
    language: 'tsx',
    code: 'import React, { useReducer, useContext, createContext } from "react";\n\ntype Action = { type: "increment" } | { type: "decrement" } | { type: "reset" };\n\ninterface State {\n  count: number;\n}\n\nconst CounterContext = createContext<{\n  state: State;\n  dispatch: React.Dispatch<Action>;\n} | null>(null);\n\nfunction counterReducer(state: State, action: Action): State {\n  switch (action.type) {\n    case "increment":\n      return { count: state.count + 1 };\n    case "decrement":\n      return { count: state.count - 1 };\n    case "reset":\n      return { count: 0 };\n    default:\n      return state;\n  }\n}',
    difficulty: 'medium'
  },
  {
    id: 'tsx-medium-3',
    language: 'tsx',
    code: 'import React, { useState, useCallback, useMemo } from "react";\n\ninterface Todo {\n  id: string;\n  text: string;\n  completed: boolean;\n}\n\nfunction TodoApp() {\n  const [todos, setTodos] = useState<Todo[]>([]);\n  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");\n\n  const addTodo = useCallback((text: string) => {\n    const newTodo: Todo = {\n      id: Date.now().toString(),\n      text,\n      completed: false\n    };\n    setTodos(prev => [...prev, newTodo]);\n  }, []);\n\n  const filteredTodos = useMemo(() => {\n    return todos.filter(todo => {\n      if (filter === "active") return !todo.completed;\n      if (filter === "completed") return todo.completed;\n      return true;\n    });\n  }, [todos, filter]);\n\n  return (\n    <div>\n      <h1>Todo App</h1>\n      {/* Rest of component */}\n    </div>\n  );\n}',
    difficulty: 'medium'
  },

  // React/TSX - Hard
  {
    id: 'tsx-hard-1',
    language: 'tsx',
    code: 'import React, { useRef, useImperativeHandle, forwardRef } from "react";\n\ninterface CustomInputHandle {\n  focus: () => void;\n  getValue: () => string;\n  setValue: (value: string) => void;\n}\n\ninterface CustomInputProps {\n  placeholder?: string;\n  onChange?: (value: string) => void;\n}\n\nconst CustomInput = forwardRef<CustomInputHandle, CustomInputProps>(\n  ({ placeholder, onChange }, ref) => {\n    const inputRef = useRef<HTMLInputElement>(null);\n    const [value, setValue] = React.useState("");\n\n    useImperativeHandle(ref, () => ({\n      focus: () => inputRef.current?.focus(),\n      getValue: () => value,\n      setValue: (newValue: string) => {\n        setValue(newValue);\n        onChange?.(newValue);\n      }\n    }));\n\n    return (\n      <input\n        ref={inputRef}\n        value={value}\n        placeholder={placeholder}\n        onChange={(e) => {\n          setValue(e.target.value);\n          onChange?.(e.target.value);\n        }}\n      />\n    );\n  }\n);',
    difficulty: 'hard'
  },

  // CSS - Easy
  {
    id: 'css-1',
    language: 'css',
    code: '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n}',
    difficulty: 'easy'
  },
  {
    id: 'css-2',
    language: 'css',
    code: '.button {\n  padding: 12px 24px;\n  background-color: #3498db;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n}\n\n.button:hover {\n  background-color: #2980b9;\n}',
    difficulty: 'easy'
  },
  {
    id: 'css-3',
    language: 'css',
    code: '.grid-container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n  padding: 20px;\n}\n\n.grid-item {\n  background-color: #f0f0f0;\n  padding: 20px;\n  text-align: center;\n  border-radius: 8px;\n}',
    difficulty: 'easy'
  },
  {
    id: 'css-4',
    language: 'css',
    code: '.card {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  padding: 20px;\n  margin-bottom: 20px;\n}\n\n.card-title {\n  font-size: 1.5em;\n  margin-bottom: 10px;\n  color: #333;\n}',
    difficulty: 'easy'
  },

  // CSS - Medium
  {
    id: 'css-medium-1',
    language: 'css',
    code: '.loading-spinner {\n  width: 40px;\n  height: 40px;\n  border: 4px solid #f3f3f3;\n  border-top: 4px solid #3498db;\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n}\n\n@keyframes spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}',
    difficulty: 'medium'
  },
  {
    id: 'css-medium-2',
    language: 'css',
    code: '.responsive-layout {\n  display: grid;\n  grid-template-columns: 1fr 3fr 1fr;\n  grid-template-areas:\n    "sidebar main aside";\n  gap: 20px;\n  min-height: 100vh;\n}\n\n@media (max-width: 768px) {\n  .responsive-layout {\n    grid-template-columns: 1fr;\n    grid-template-areas:\n      "main"\n      "sidebar"\n      "aside";\n  }\n}',
    difficulty: 'medium'
  },
  {
    id: 'css-medium-3',
    language: 'css',
    code: '.tooltip {\n  position: relative;\n  display: inline-block;\n}\n\n.tooltip::before {\n  content: attr(data-tooltip);\n  position: absolute;\n  bottom: 125%;\n  left: 50%;\n  transform: translateX(-50%);\n  background-color: #333;\n  color: white;\n  padding: 8px 12px;\n  border-radius: 4px;\n  font-size: 14px;\n  white-space: nowrap;\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity 0.3s, visibility 0.3s;\n}\n\n.tooltip:hover::before {\n  opacity: 1;\n  visibility: visible;\n}',
    difficulty: 'medium'
  },

  // CSS - Hard
  {
    id: 'css-hard-1',
    language: 'css',
    code: '.complex-animation {\n  width: 100px;\n  height: 100px;\n  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);\n  border-radius: 50%;\n  position: relative;\n  animation: complexMove 4s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;\n}\n\n.complex-animation::before {\n  content: "";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 20px;\n  height: 20px;\n  background: white;\n  border-radius: 50%;\n  transform: translate(-50%, -50%) scale(0);\n  animation: pulse 2s ease-in-out infinite;\n}\n\n@keyframes complexMove {\n  0%, 100% {\n    transform: translateX(0) rotate(0deg) scale(1);\n  }\n  25% {\n    transform: translateX(200px) rotate(90deg) scale(1.2);\n  }\n  50% {\n    transform: translateX(200px) translateY(200px) rotate(180deg) scale(0.8);\n  }\n  75% {\n    transform: translateX(0) translateY(200px) rotate(270deg) scale(1.1);\n  }\n}\n\n@keyframes pulse {\n  0%, 100% { transform: translate(-50%, -50%) scale(0); }\n  50% { transform: translate(-50%, -50%) scale(1); }\n}',
    difficulty: 'hard'
  },

  // SQL - Easy
  {
    id: 'sql-1',
    language: 'sql',
    code: 'SELECT u.name, COUNT(o.id) as order_count\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nWHERE u.created_at >= "2024-01-01"\nGROUP BY u.id, u.name\nORDER BY order_count DESC;',
    difficulty: 'easy'
  },
  {
    id: 'sql-2',
    language: 'sql',
    code: 'SELECT product_name, price\nFROM products\nWHERE category = "Electronics"\n  AND price BETWEEN 100 AND 500\nORDER BY price ASC;',
    difficulty: 'easy'
  },
  {
    id: 'sql-3',
    language: 'sql',
    code: 'UPDATE users\nSET last_login = CURRENT_TIMESTAMP,\n    login_count = login_count + 1\nWHERE email = "user@example.com";',
    difficulty: 'easy'
  },
  {
    id: 'sql-4',
    language: 'sql',
    code: 'INSERT INTO customers (name, email, phone, created_at)\nVALUES \n  ("John Doe", "john@example.com", "555-1234", NOW()),\n  ("Jane Smith", "jane@example.com", "555-5678", NOW());',
    difficulty: 'easy'
  },

  // SQL - Medium
  {
    id: 'sql-medium-1',
    language: 'sql',
    code: 'WITH monthly_sales AS (\n  SELECT \n    DATE_FORMAT(order_date, "%Y-%m") as month,\n    SUM(total_amount) as total_sales\n  FROM orders\n  WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)\n  GROUP BY month\n)\nSELECT \n  month,\n  total_sales,\n  LAG(total_sales, 1) OVER (ORDER BY month) as prev_month_sales,\n  ROUND(\n    (total_sales - LAG(total_sales, 1) OVER (ORDER BY month)) / \n    LAG(total_sales, 1) OVER (ORDER BY month) * 100, 2\n  ) as growth_percentage\nFROM monthly_sales\nORDER BY month;',
    difficulty: 'medium'
  },
  {
    id: 'sql-medium-2',
    language: 'sql',
    code: 'SELECT \n  p.category,\n  p.product_name,\n  p.price,\n  RANK() OVER (PARTITION BY p.category ORDER BY p.price DESC) as price_rank,\n  AVG(p.price) OVER (PARTITION BY p.category) as category_avg_price\nFROM products p\nINNER JOIN order_items oi ON p.id = oi.product_id\nINNER JOIN orders o ON oi.order_id = o.id\nWHERE o.order_date >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)\nGROUP BY p.id, p.category, p.product_name, p.price\nHAVING COUNT(oi.id) >= 5\nORDER BY p.category, price_rank;',
    difficulty: 'medium'
  },

  // SQL - Hard
  {
    id: 'sql-hard-1',
    language: 'sql',
    code: 'WITH RECURSIVE employee_hierarchy AS (\n  -- Base case: top-level managers\n  SELECT \n    id,\n    name,\n    manager_id,\n    department,\n    salary,\n    1 as level,\n    CAST(name AS CHAR(1000)) as hierarchy_path\n  FROM employees\n  WHERE manager_id IS NULL\n  \n  UNION ALL\n  \n  -- Recursive case: employees with managers\n  SELECT \n    e.id,\n    e.name,\n    e.manager_id,\n    e.department,\n    e.salary,\n    eh.level + 1,\n    CONCAT(eh.hierarchy_path, " > ", e.name)\n  FROM employees e\n  INNER JOIN employee_hierarchy eh ON e.manager_id = eh.id\n)\nSELECT \n  hierarchy_path,\n  level,\n  department,\n  salary,\n  AVG(salary) OVER (PARTITION BY level) as avg_salary_at_level,\n  COUNT(*) OVER (PARTITION BY department, level) as peers_in_dept\nFROM employee_hierarchy\nORDER BY level, department, salary DESC;',
    difficulty: 'hard'
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