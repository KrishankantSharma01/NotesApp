'use client';

import { useState, useEffect } from 'react';

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface NoteFormProps {
  onAddNote: (note: Note) => void;
  onUpdateNote: (note: Note) => void;
  editingNote: Note | null;
  onCancelEdit: () => void;
}

export default function NoteForm({
  onAddNote,
  onUpdateNote,
  editingNote,
  onCancelEdit,
}: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [editingNote]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      if (editingNote) {
        // Update note
        const response = await fetch(`/api/notes/${editingNote._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content }),
        });

        if (response.ok) {
          const updatedNote = await response.json();
          onUpdateNote(updatedNote);
        } else {
          alert('Error updating note');
        }
      } else {
        // Create note
        const response = await fetch('/api/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content }),
        });

        if (response.ok) {
          const newNote = await response.json();
          onAddNote(newNote);
        } else {
          alert('Error creating note');
        }
      }

      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    onCancelEdit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md sticky top-8"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {editingNote ? 'Edit Note' : 'Create Note'}
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter note title"
          maxLength={100}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
          placeholder="Enter note content"
          rows={6}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
        >
          {loading ? 'Saving...' : editingNote ? 'Update Note' : 'Create Note'}
        </button>

        {editingNote && (
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-400 text-white font-semibold py-2 rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
