import React, { lazy } from 'react'
import { Loadable } from '@/shared/components'
import { BrowserRouter } from 'react-router-dom'
import {
  Route,
  Routes
} from 'react-router'

const Demos = Loadable(lazy(async () => import('@/pages/demos/demos')))

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Demos />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
