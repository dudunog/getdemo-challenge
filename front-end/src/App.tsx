import React from 'react'
import { Toaster } from "react-hot-toast";
import { Router } from '@/shared/components'
import { Provider } from 'react-redux';
import { store } from '@/shared/store';
import 'react-loading-skeleton/dist/skeleton.css';

function App() {
  return (
    <Provider store={store}>
      <Toaster position="top-center" reverseOrder={false} />
      <Router />
    </Provider>
  )
}

export default App
