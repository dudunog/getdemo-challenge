import React, { useCallback, useEffect, useState } from 'react'
import { Demo } from '@/entities/Demo';
import { Frame } from '@/entities/Frame';
import EditableIFrame from '@/shared/components/editable-iframe/editable-iframe';
import { useGetDemosQuery } from '@/modules/demos/services/demos-api';
import { useUpdateFrameMutation } from '@/modules/demos/services/frames-api';
import { FrameList } from '@/modules/demos/components/frame-list';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton';

const SkeletonFrame = () => (
  <Skeleton height="100%" width="100%" />
)

const DemoPage = () => {
  const { id } = useParams();
  const [selectedDemo, setSelectedDemo] = useState<Demo>();
  const [selectedFrame, setSelectedFrame] = useState<Frame>();
  const { data: demos, isLoading, isSuccess } = useGetDemosQuery();
  const [updateFrame] = useUpdateFrameMutation();
  const [effectExecuted, setEffectExecuted] = useState(false);

  const handleChangeFrame = (frameId: string) => {
    const selectedFrame = selectedDemo?.frames.find(frame => frame.id === frameId);

    setSelectedFrame(selectedFrame);
  };

  const saveFrameContent = useCallback(async (frameId: string, updatedHtml: string) => {
    const response = await updateFrame({ id: frameId, html: updatedHtml });

    if (!response.error) {
      toast.success('Frame atualizado com sucesso');
    } else {
      toast.error('Erro ao atualizar frame');
    }
  }, [updateFrame]);

  useEffect(() => {
    if (isSuccess && !effectExecuted) {
      const firstSelectedDemo = demos?.find((demo: Demo) => demo.id === id);

      setSelectedDemo(firstSelectedDemo);
      setSelectedFrame(firstSelectedDemo?.frames[0]);

      setEffectExecuted(true);
    };
  }, [isSuccess]);

  return (
   <>
      {isLoading && (
        <div className="w-full h-[calc(100%-145px)]">
          <SkeletonFrame />
        </div>
      )}

      {selectedFrame && (
        <EditableIFrame
          frame={selectedFrame}
          onChangeContent={(updatedHtml) => {
            saveFrameContent(selectedFrame.id, updatedHtml);
            setSelectedFrame(new Frame({
              id: selectedFrame.id,
              html: updatedHtml,
              order: selectedFrame.order,
              createdAt: selectedFrame.createdAt,
              updatedAt: selectedFrame.updatedAt,
              demoId: selectedFrame.demoId,
              image: selectedFrame.image,
            }));
          }}
          onChangeFrame={() => {
            const lastSelectedFrameOrder = selectedFrame.order;
            const newFrameIndex = lastSelectedFrameOrder + 1;
            const newFrame = selectedDemo?.frames.find((frame) => frame.order === newFrameIndex);
            setSelectedFrame(newFrame);
          }}
        />
      )}

      <FrameList
        frames={selectedDemo?.frames || []}
        isLoading={isLoading}
        onFrameClick={handleChangeFrame}
      />
   </>
  )
}

export default DemoPage
