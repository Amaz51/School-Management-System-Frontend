import React, { useEffect, useState } from 'react';
import {APIII, StudentOrderAPI} from '../api'; // Adjust the import path as necessary

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import DraggableCard from './DraggableCard';

const DragDropBoard = () => {
  const [students, setStudents] = useState([]);
  const sensors = useSensors(useSensor(PointerSensor));

  
  useEffect(() => {
    fetchStudents();
  }, []);
const fetchStudents = async () => {
  try {
    const res = await APIII.get('/');
    setStudents(res.data);
  } catch (err) {
    console.error('Error fetching students:', err);
  }
};

const handleDragEnd = async ({ active, over }) => {
  if (!over || active.id === over.id) return;

  const oldIndex = students.findIndex(s => s.student_id === active.id);
  const newIndex = students.findIndex(s => s.student_id === over.id);

  const newOrder = arrayMove(students, oldIndex, newIndex);
  setStudents(newOrder);

  try {
    await StudentOrderAPI.post(
      '/reorder/',
      newOrder.map(s => ({ student_id: s.student_id }))
    );
  } catch (err) {
    console.error('Error saving new order:', err);
  }
};

  return (
    <div style={{ padding: '30px' }}>
      <h2>Drag and Reorder Your Students</h2>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={students.map(s => s.student_id)}
          strategy={verticalListSortingStrategy}
        >
          <div
            style={{
              padding: '20px',
              backgroundColor: '#f0f0f0',
              border: '2px dashed #aaa',
              minHeight: '300px',
              width: '400px',
            }}
          >
            {students.map(s => (
              <DraggableCard
                key={s.student_id}
                id={s.student_id}
                name={s.name}
                email={s.email}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default DragDropBoard;
