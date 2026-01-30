import React from 'react'

export const Login = () => {
  return (
     <div className='border border-dark rounded w-50 p-5 m-5 text-center justify-content-center align-items-center mx-auto d-flex flex-column'>

        <h1 className='display-1'>Login</h1> 
        <input type='text' className='form-control' placeholder='Username' />
        <input type='text' className='form-control mt-3' placeholder='Site id' />
        <button className='btn btn-outline-dark mt-5 px-5'>Login</button>
      </div>
  )
}
