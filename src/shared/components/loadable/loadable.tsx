import React, { type LazyExoticComponent, Suspense } from 'react'

const Loadable = (Component: LazyExoticComponent<React.FC>): React.FC => (props: any) => {
  return (
    <Suspense>
      <Component {...props} />
    </Suspense>
  )
}

export default Loadable