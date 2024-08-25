import React, { useEffect, useRef, useState } from 'react';

type Frame = {
  id: string;
  html: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  demoId: string;
};

type EditableIFrameProps = {
  frame: Frame;
  onChangeContent: (updatedHtml: string) => void;
};

const EditableIFrame = ({ frame, onChangeContent }: EditableIFrameProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [previousContent, setPreviousContent] = useState<string>('');

  useEffect(() => {
    setPreviousContent(frame.html);
  }, [frame]);

  useEffect(() => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument;
      if (iframeDocument) {
        iframeDocument.body.innerHTML = frame.html;

        iframeDocument.body.ondblclick = (event) => {
          const target = event.target as HTMLElement;
          if (target && target.nodeType === Node.ELEMENT_NODE && target.textContent) {
            target.contentEditable = 'true';
            target.focus();

            target.onblur = async () => {
              target.contentEditable = 'false';
              const updatedHtml = iframeDocument.body.innerHTML;

              const hasChangesToSave = updatedHtml !== previousContent;
              if (hasChangesToSave) {
                await onChangeContent(updatedHtml);
              };
            };

            target.onkeydown = (e) => {
              if (e.key === 'Enter') {
                target.blur();
              }
            };
          }
        };
      }
    }
  }, [frame.html, onChangeContent]);

  return (
    <div className="border border-primary-standard rounded-lg p-4 h-[500px] overflow-auto">
      <iframe
        ref={iframeRef}
        title="Demo Frame"
        className="w-full h-full border border-black"
      ></iframe>
    </div>
  );
}

export default EditableIFrame;
