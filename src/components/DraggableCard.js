import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const DraggableCard = ({ id, name, email }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '16px',
    margin: '10px 0',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '8px',
    cursor: 'grab',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <h4 style={{ margin: '0 0 5px 0' }}>{name}</h4>
      <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>{email}</p>
    </div>
  );
};

export default DraggableCard;
