import React from 'react'
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="flex items-center justify-center flex-col h-screen bg-red-500 text-white">
        <h1>Page Not found</h1><br />
        <Link to="/">Go to Home page</Link>
    </div>
  )
}

export default Error404