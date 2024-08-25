import React, { useCallback } from 'react'
import { useGetDemosQuery } from '@/modules/demos/services/demos-api'
import { useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton';

const SkeletonDemos = () => {
  const skeletonItems = Array.from({ length: 6 });

  return (
    <div className="flex flex-row flex-wrap gap-4">
      {skeletonItems.map((_, index) => (
        <div key={index} className="py-7 px-10 rounded-lg border border-gray-600 max-w-xs flex flex-col justify-center items-center">
          <Skeleton height={30} width={100} />
          <Skeleton height={40} width={150} style={{ marginTop: '20px' }} />
        </div>
      ))}
    </div>
  );
};

const Demos = () => {
  const navigate = useNavigate();
  const { data: demos, isLoading } = useGetDemosQuery();

  const handleGoToDemo = useCallback((id: string) => {
    navigate(`/demos/${id}`)
  }, [navigate]);

  return (
    <div className="w-full h-full p-8 box-border">
      {isLoading ? (
        <SkeletonDemos />
      ) : (
        <div className="flex flex-row flex-wrap gap-4">
          {demos && demos.map(demo => (
            <div key={demo.id} className="py-7 px-10 rounded-lg border border-primary-standard max-w-xs flex flex-col justify-center items-center">
              <h2>{demo.name}</h2>
              <button
                className='w-full bg-primary-standard text-white px-4 py-2 rounded-lg mt-4'
                onClick={() => handleGoToDemo(demo.id)}
              >
                Visualizar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Demos
