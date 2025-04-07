import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BicointList from '../pages/cms/bitcoin_list/bitcoin_list'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

function App() {
  const [count, setCount] = useState(0)
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
      <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: "",
        duration: 5000,
        style: {
          background: "#363636",
          color: "#fff",
        },

        // Default options for specific types
        success: {
          duration: 3000,
        },
        error: {
          duration: 5000,
        },

      }}
    />
        <Router>
          <Routes>
              <Route path="/cms/bitcoin_list" element={<BicointList/>} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  )
}

export default App
