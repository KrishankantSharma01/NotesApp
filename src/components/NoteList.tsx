'use client';

import { useState } from 'react';

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface NoteListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export default function NoteList({ notes, onEdit, onDelete }: NoteListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this note?')) {
      return;
    }

    setDeletingId(id);

    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete(id);
      } else {
        alert('Error deleting note');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('An error occurred');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div
          key={note._id}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800 flex-1 break-words">
              {note.title}
            </h3>
            <div className="flex gap-2 ml-4 flex-shrink-0">
              <button
                onClick={() => onEdit(note)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(note._id)}
                disabled={deletingId === note._id}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition disabled:bg-gray-400"
              >
                {deletingId === note._id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-3">
            Created: {formatDate(note.createdAt)}
          </p>

          <p className="text-gray-700 whitespace-pre-wrap break-words">
            {note.content}
          </p>
        </div>
      ))}
    </div>
  );
}
