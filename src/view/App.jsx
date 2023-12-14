import React, { Suspense, useState } from 'react';
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from "@/routes/index.jsx"

function App() {
  return (
    <>
      <h3>app page</h3>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  )
}

export default App
