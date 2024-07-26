import React from 'react'
import NavBar from '../sharedComp/navBarComp/NavBar'
import RightSider from '../sharedComp/rightSideHomeComp/RightSider'
import LeftSiderUp from '../sharedComp/LeftSideHomeComp/LeftSiderUp'
import { Box } from '@mui/material'
import { Outlet, useOutletContext } from 'react-router-dom'

const Home = () => {
  const context = useOutletContext();

  return (
    <div className='h-screen bg-zinc-950 text-white overflow-auto'>
      <header className='sticky top-0 z-50'>
        <NavBar context={context}/>
      </header>
      <Box component="main" className="py-1 px-2 overflow-hidden flex">
        <aside className='hidden sm:block flex-1 h-[89vh]'>
          <LeftSiderUp context={context}/>
        </aside>
        <section className='w-full h-vh sm:h-[90vh] md:h-[89vh] rounded-md shrink overflow-auto'>
          <Outlet context={context}/>
        </section>
      </Box>
    </div>
  )
}

export default Home