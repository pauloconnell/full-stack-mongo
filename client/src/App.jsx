import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import UsersList from './components/UsersList';
import UserForm from './components/UserForm';
import ThemeToggle from './components/ThemeToggle';

function App() {
   const [count, setCount] = useState(0);

   return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
         <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-3 items-center mb-6">
               <div className="col"> </div>
               <div className="flex justify-center space-x-4">
                  <a href="https://vite.dev" target="_blank">
                     <img src={viteLogo} className="logo" alt="Vite logo" />
                  </a>
                  <a href="https://react.dev" target="_blank">
                     <img src={reactLogo} className="logo react" alt="React logo" />
                  </a>
               </div>
               <div className="flex justify-end">
                  <ThemeToggle />
               </div>
            </div>

            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
               Vite + React
            </h1>

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 mb-8">
               <button
                  onClick={() => setCount((count) => count + 1)}
                  className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded mb-6 transition-colors"
               >
                  count is {count}
               </button>

               <UsersList />
               <UserForm />
            </div>

            <p className="text-center text-gray-600 dark:text-gray-400">
               Click on the Vite and React logos to learn more
            </p>
         </div>
      </div>
   );
}

export default App;
