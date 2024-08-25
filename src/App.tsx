import React from 'react'
import { Toaster } from "react-hot-toast";
import { Router } from '@/shared/components'
import { Provider } from 'react-redux';
import { store } from '@/shared/store';

function App() {
  return (
    <Provider store={store}>
      <Toaster position="top-center" reverseOrder={false} />
      <Router />
    </Provider>
  )
}

export default App
