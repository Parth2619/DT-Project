import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Note, Comment } from '../types';
import { fetchNoteById, incrementDownloadCount, addCommentToNote } from '../services/notesApiService';
import Spinner from '../components/Spinner';
import Comments from '../components/notes/Comments';
import { ArrowLeftIcon, DownloadIcon, FileTextIcon } from '../constants';

const NoteDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  const getNote = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const fetchedNote = await fetchNoteById(id);
      if (fetchedNote) {
        setNote(fetchedNote);
      }
    } catch (error) {
      console.error("Failed to fetch note", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getNote();
  }, [getNote]);

  const handleDownload = () => {
    if (!id) return;
    incrementDownloadCount(id);
    setNote(prev => prev ? { ...prev, downloads: prev.downloads + 1 } : null);
    // In a real app, you would trigger the actual file download here
    alert("Download started! (Simulated)");
  };

  const handleCommentSubmit = async (text: string) => {
    if (!id || !text.trim()) return;
    // Mocking current user as 'user-1' (Alice)
    const newComment = await addCommentToNote(id, text, 'user-1');
    setNote(prev => prev ? { ...prev, comments: [...prev.comments, newComment] } : null);
  };
  
  if (loading) {
    return <div className="flex justify-center items-center h-96"><Spinner /></div>;
  }

  if (!note) {
    return <div className="text-center py-20 text-xl">Note not found.</div>;
  }

  const formattedDate = new Date(note.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto mb-6">
        <Link to="/notes" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-semibold">
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Notes
        </Link>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left Column - Details */}
        <div className="lg:w-2/3 w-full">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-8">
                <span className="text-sm font-bold text-primary">{note.subject} - Semester {note.semester}</span>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2">{note.title}</h1>
                <p className="text-gray-400 mt-4 leading-relaxed">{note.description}</p>
            </div>
            
            <div className="mt-8">
              <Comments comments={note.comments} onCommentSubmit={handleCommentSubmit} />
            </div>
        </div>

        {/* Right Column - Meta & Actions */}
        <div className="lg:w-1/3 w-full">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 sticky top-24">
                <button
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-semibold hover:bg-primary-hover transition-transform transform hover:scale-105 shadow-lg shadow-primary/30"
                >
                    <DownloadIcon className="w-6 h-6" />
                    Download
                </button>
                <ul className="text-sm text-gray-300 space-y-3 mt-6">
                    <li className="flex justify-between"><span>Uploader:</span> <span className="font-semibold text-white">{note.uploader.name}</span></li>
                    <li className="flex justify-between"><span>Uploaded:</span> <span>{formattedDate}</span></li>
                    <li className="flex justify-between"><span>Downloads:</span> <span>{note.downloads}</span></li>
                    <li className="flex justify-between"><span>File Type:</span> <span className="uppercase font-mono">{note.type}</span></li>
                </ul>
                <div className="mt-6 border-t border-gray-700 pt-4">
                    <h4 className="font-semibold text-white mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                        {note.tags.map(tag => (
                            <span key={tag} className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;