import React from 'react'

const Navbar = () => {
  return (
    <>
    <div className="navbar flex bg-blue-600 text-white p-2">
      <div className='flex justify-between w-3/4 m-auto'>
        <li className="logo list-none font-bold text-lg">iTask</li>
        <ul className="nav flex  gap-5 ">
          <li className="items cursor-pointer">Home</li>
          <li className="items cursor-pointer">Your Todos</li>
        </ul>
      </div>
    </div>
    </>
  )
}

export default Navbar
