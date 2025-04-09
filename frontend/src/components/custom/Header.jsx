import React, { useEffect } from 'react'
import { Button } from '../ui/button'

const Header = () => {
  const user=JSON.parse(localStorage.getItem('user'))
  useEffect(()=>{
  console.log("user",user)
  },[])
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