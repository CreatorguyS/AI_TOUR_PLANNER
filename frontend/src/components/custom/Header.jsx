import React from 'react'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <div className='p-3 shadow-sm px-5 flex items-center justify-between'>
      <div>
        <img src="/logo.svg" alt="Logo" />
      </div>
      <div>
        <Button>Sign up</Button>
      </div>
    </div>
  )
}

export default Header