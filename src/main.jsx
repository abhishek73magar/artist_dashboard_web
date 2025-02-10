import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "styles/main.css"
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retry: 3,
      staleTime: 1000 * 60 * 10, // 10 minutes,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 1000 * 30), // 2, 4, 8, 16, 30 seconds
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>,
)
