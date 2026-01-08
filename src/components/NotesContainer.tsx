'use client';

import { useState, useEffect } from 'react';
import NoteForm from './NoteForm';
import NoteList from './NoteList';

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export default function NotesContainer() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes');
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = (newNote: Note) => {
    setNotes([newNote, ...notes]);
    setEditingNote(null);
  };

  const handleUpdateNote = (updatedNote: Note) => {
    setNotes(notes.map((note) => (note._id === updatedNote._id ? updatedNote : note)));
    setEditingNote(null);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note._id !== id));
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">My Notes</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <NoteForm
            onAddNote={handleAddNote}
            onUpdateNote={handleUpdateNote}
            editingNote={editingNote}
            onCancelEdit={handleCancelEdit}
          />
        </div>

        <div className="md:col-span-2">
          {loading ? (
            <div className="text-center text-gray-500">Loading notes...</div>
          ) : notes.length === 0 ? (
            <div className="text-center text-gray-500">No notes yet. Create one to get started!</div>
          ) : (
            <NoteList notes={notes} onEdit={handleEdit} onDelete={handleDeleteNote} />
          )}
        </div>
      </div>
    </div>
  );
}
