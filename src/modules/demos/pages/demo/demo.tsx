import React, { useEffect, useState } from 'react'
import { Demo } from '@/entities/Demo';
import { Frame } from '@/entities/Frame';
import EditableIFrame from '@/shared/components/editable-iframe/editable-iframe';
import { useGetDemosQuery } from '@/modules/demos/services/demos-api';
import { useUpdateFrameMutation } from '@/modules/demos/services/frames-api';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'

const DemoPage = () => {
  const { id } = useParams();
  const [selectedDemo, setSelectedDemo] = useState<Demo>();
  const [selectedFrame, setSelectedFrame] = useState<Frame>();
  const { data: demos, isSuccess } = useGetDemosQuery();
  const [updateFrame, updateFrameResult] = useUpdateFrameMutation();

  const handleChangeFrame = (frameId: string) => {
    const selectedFrame = selectedDemo?.frames.find(frame => frame.id === frameId);

    setSelectedFrame(selectedFrame);
  };

  const saveFrameContent = async (frameId: string, updatedHtml: string) => {
    await updateFrame({ id: frameId, html: updatedHtml });

    if (updateFrameResult) {
      toast.success('Frame atualizado com sucesso');
    } else {
      toast.error('Erro ao atualizar frame');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const firstSelectedDemo = demos?.find((demo: Demo) => demo.id === id);

      setSelectedDemo(firstSelectedDemo);
      setSelectedFrame(firstSelectedDemo?.frames[0]);
    };
  }, [isSuccess]);

  return (
   <>
      <h1>Visualizar Demo</h1>

      <div>
        <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
          Frame
        </label>
        <select
          id="frame"
          name="Frame"
          onChange={(e) => handleChangeFrame(e.target.value)}
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          {selectedDemo?.frames.map(frame => (
            <option key={frame.id}>{frame.id}</option>
          ))}
        </select>
      </div>

      {selectedFrame && (
        <div className="mt-10">
          <h2>Frame Selecionado</h2>

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
              }));
            }}
          />
        </div>
      )}
   </>
  )
}

export default DemoPage
