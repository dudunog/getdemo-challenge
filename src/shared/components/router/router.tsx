import React, { lazy } from 'react'
import { Loadable } from '@/shared/components'
import { BrowserRouter } from 'react-router-dom'
import {
  Route,
  Routes
} from 'react-router'

const Demos = Loadable(lazy(async () => import('@/modules/demos/pages/demos/demos')))
const Demo = Loadable(lazy(async () => import('@/modules/demos/pages/demo/demo')))

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Demos />} />
        <Route path='/demos/:id' element={<Demo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
