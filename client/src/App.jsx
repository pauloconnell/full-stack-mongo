import { useState } from 'react';
import { useSelector } from 'react-redux';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import UsersList from './components/UsersList';
import UserForm from './components/UserForm';
import LoginForm from './components/LoginForm';
import TodoApp from './components/TodoApp';
import ThemeToggle from './components/ThemeToggle';

function App() {
   const [count, setCount] = useState(0);
   const { currentUser } = useSelector(state => state.auth);

   return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
         <div className="container mx-auto px-4 py-8">
            <div className="flex justify-end mb-6">
               <ThemeToggle />
            </div>

            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
               Todo App
            </h1>

            {currentUser ? (
               <TodoApp />
            ) : (
               <>
                  <LoginForm />
                  
                  <div className="mt-12 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
                     <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">User Management</h3>
                     <UsersList />
                     <UserForm />
                  </div>
               </>
            )}
         </div>
      </div>
   );
}

export default App;
