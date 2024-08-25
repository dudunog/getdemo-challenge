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
  onChangeFrame: () => void;
};

const EditableIFrame = ({ frame, onChangeContent, onChangeFrame }: EditableIFrameProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const currentElementRef = useRef<HTMLElement | null>(null);
  const [previousContent, setPreviousContent] = useState<string>('');
  let clickTimeout: NodeJS.Timeout | null = null;

  useEffect(() => {
    setPreviousContent(frame.html);
  }, [frame]);

  const saveContent = () => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument;
      if (iframeDocument) {
        const updatedHtml = iframeDocument.body.innerHTML;
        if (updatedHtml !== previousContent) {
          onChangeContent(updatedHtml);
          setPreviousContent(updatedHtml);
        }
      }
    }
  };

  useEffect(() => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument;
      if (iframeDocument) {
        iframeDocument.body.innerHTML = frame.html;

        const style = iframeDocument.createElement('style');
        style.textContent = `
          :root {
            --primary-color: #3b82f6;
          }
          .border-primary {
            border: 2px solid var(--primary-color);
          }
          .trash-button {
            position: absolute;
            background-color: #4B5563; /* Azul acinzentado */
            color: white;
            border: none;
            border-radius: 50%;
            padding: 10px;
            cursor: pointer;
            font-size: 1.5rem;
            display: none; /* Inicialmente oculta */
            z-index: 1000;
            transition: opacity 0.3s ease-in-out;
          }
          .trash-button.show {
            display: block;
          }
        `;
        iframeDocument.head.appendChild(style);

        iframeDocument.body.addEventListener('click', (event) => {
          const target = event.target as HTMLElement;
          if (clickTimeout) {
            clearTimeout(clickTimeout);
            clickTimeout = null;
          }

          clickTimeout = setTimeout(() => {
            if (currentElementRef.current && target !== currentElementRef.current) {
              currentElementRef.current.classList.remove('border-primary');
              currentElementRef.current = null;
            }
            if (!target.isContentEditable) {
              onChangeFrame();
            }
          }, 200);
        });

        iframeDocument.body.addEventListener('dblclick', (event) => {
          if (clickTimeout) {
            clearTimeout(clickTimeout);
            clickTimeout = null;
          }

          const target = event.target as HTMLElement;
          if (target && target.nodeType === Node.ELEMENT_NODE && target.textContent) {
            target.classList.remove('border-primary');

            target.contentEditable = 'true';
            target.focus();

            target.onblur = () => {
              target.contentEditable = 'false';
              saveContent();
              if (currentElementRef.current === target) {
                currentElementRef.current.classList.add('border-primary');
              }
            };

            target.onkeydown = (e) => {
              if (e.key === 'Enter') {
                target.blur();
              } else if (e.key === 'Escape') {
                target.contentEditable = 'false';
                target.blur();
              }
            };
          }
        });
      }
    }
  }, [frame.html, saveContent, onChangeFrame]);

  return (
    <div className="h-[calc(100%-140px)] overflow-auto">
      <iframe
        ref={iframeRef}
        title="Demo Frame"
        className="w-full h-full border border-black"
      ></iframe>
    </div>
  );
};

export default EditableIFrame;
