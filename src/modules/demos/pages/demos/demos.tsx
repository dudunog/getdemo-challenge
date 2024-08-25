import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetDemosQuery } from '@/modules/demos/services/demos-api'

const Demos = () => {
  const navigate = useNavigate();
  const { data: demos } = useGetDemosQuery();

  const handleGoToDemo = useCallback((id: string) => {
    navigate(`/demos/${id}`)
  }, [navigate]);

  return (
    <div style={{width: '100%', height: '100%', padding: '2rem', boxSizing: 'border-box'}}>
      {demos && demos.map(demo => (
        <div key={demo.id} className="p-4 rounded-lg border border-primary-standard max-w-xs flex flex-col justify-center items-center">
          <h2>{demo.name}</h2>
          <button
            className='bg-primary-standard text-white px-4 py-2 rounded-lg mt-4'
            onClick={() => handleGoToDemo(demo.id)}
          >
            Visualizar
          </button>
        </div>
      ))}
    </div>
  )
}

export default Demos
