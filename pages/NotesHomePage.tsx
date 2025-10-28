import React, { useState, useEffect, useCallback } from 'react';
import { Note } from '../types';
import { fetchNotes } from '../services/notesApiService';
import NoteCard from '../components/notes/NoteCard';
import Spinner from '../components/Spinner';
import Modal from '../components/Modal';
import NoteForm from '../components/notes/NoteForm';
import { PlusCircleIcon } from '../constants';

const NotesHomePage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<{ search: string }>({ search: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadNotes = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedNotes = await fetchNotes(filter);
      setNotes(fetchedNotes);
    } catch (error) {
      console.error("Failed to fetch notes", error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(prev => ({ ...prev, search: e.target.value }));
  };

  const onNoteCreated = () => {
    setIsModalOpen(false);
    loadNotes();
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-4xl font-bold text-white">Shared Notes</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-semibold hover:bg-primary-hover transition-transform transform hover:scale-105 shadow-lg shadow-primary/30"
        >
          <PlusCircleIcon className="w-6 h-6" />
          Share a Note
        </button>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-2xl mb-8 flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Search notes by title, description, or tag..."
          value={filter.search}
          onChange={handleSearchChange}
          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
        />
        {/* Add more filters for subject/semester if needed */}
      </div>

      {loading ? (
        <div className="flex justify-center pt-10"><Spinner /></div>
      ) : notes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {notes.map(note => <NoteCard key={note.id} note={note} />)}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-400">
            <p>No notes found. Why not share one?</p>
        </div>
      )}
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm onNoteCreated={onNoteCreated}/>
      </Modal>
    </div>
  );
};

export default NotesHomePage;
