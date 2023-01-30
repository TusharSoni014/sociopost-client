import { Button } from 'antd'
import './notfound.scss'
import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='not-found'>
        <h1>404 Not Found</h1>
        <Link to='/'>
        <Button>Go to Home</Button>
        </Link>
    </div>
  )
}
