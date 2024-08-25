import React from 'react';
import { Frame } from '@/entities/Frame';
import Skeleton from 'react-loading-skeleton';

type FrameListProps = {
  frames: Frame[];
  isLoading: boolean;
  onFrameClick: (frameId: string) => void;
};

const SkeletonFrameList = () => {
  const skeletonItems = Array.from({ length: 5 });

  return (
    <div className="fixed bottom-0 w-full bg-gray-100 p-4 flex overflow-x-auto border-t-2 border-gray-500">
      {skeletonItems.map((_, index) => (
        <div key={index} className="mr-4">
          <div className="flex flex-col items-center">
            <Skeleton width={120} height={75} />
            <Skeleton width={60} height={20} style={{ marginTop: '10px' }} />
          </div>
        </div>
      ))}
    </div>
  );
};

const FrameList = ({ frames, isLoading, onFrameClick }: FrameListProps) => {
  if (isLoading) {
    return <SkeletonFrameList />;
  }

  return (
    <div className="fixed bottom-0 w-full bg-gray-100 p-4 flex overflow-x-auto border-t-2 border-gray-500">
      {frames.map(frame => (
        <div key={frame.id} className="mr-4 cursor-pointer" onClick={() => onFrameClick(frame.id)}>
          <div className="flex flex-col items-center">
            {frame.image ? (
              <img
                src={`data:image/png;base64,${frame.image}`}
                alt={`Frame ${frame.order}`}
                className="w-48 h-36 border-2 border-primary-standard"
                style={{ width: '120px', height: '75px', objectFit: 'contain' }}
              />
            ) : (
              <div className="w-42 h-36 border-2 border-primary-standard flex items-center justify-center">
                Carregando...
              </div>
            )}
            <p className="text-center mt-2">{`Frame ${frame.order}`}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FrameList;
