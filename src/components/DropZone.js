import React from 'react';
import { useDroppable } from '@dnd-kit/core';

const DropZone = ({ id, children }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  const style = {
    minHeight: '200px',
    padding: '20px',
    backgroundColor: isOver ? '#f0f0f0' : '#e2e2e2',
    border: '2px dashed #aaa',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};

export default DropZone;
