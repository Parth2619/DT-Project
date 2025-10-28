import { Note, Comment, NoteType } from '../types';
import { mockNotes, mockUsers } from './notesMockData';

let notes: Note[] = [...mockNotes];
const SIMULATED_DELAY = 500; // in ms

// Fetch all notes with optional filtering
export const fetchNotes = (filter?: { search?: string; subject?: string; semester?: number }): Promise<Note[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      let filteredNotes = notes.filter(n => n.status === 'approved');

      if (filter?.search) {
        const searchTerm = filter.search.toLowerCase();
        filteredNotes = filteredNotes.filter(n =>
          n.title.toLowerCase().includes(searchTerm) ||
          n.description.toLowerCase().includes(searchTerm) ||
          n.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
      }

      if (filter?.subject) {
        filteredNotes = filteredNotes.filter(n => n.subject === filter.subject);
      }

      if (filter?.semester) {
        filteredNotes = filteredNotes.filter(n => n.semester === filter.semester);
      }
      
      resolve(filteredNotes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }, SIMULATED_DELAY);
  });
};

// Fetch a single note by ID
export const fetchNoteById = (id: string): Promise<Note | undefined> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(notes.find(n => n.id === id));
    }, SIMULATED_DELAY);
  });
};

// Increment download count
export const incrementDownloadCount = (id: string): Promise<Note | undefined> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const noteIndex = notes.findIndex(n => n.id === id);
      if (noteIndex > -1) {
        notes[noteIndex].downloads++;
        resolve(notes[noteIndex]);
      } else {
        reject(new Error("Note not found"));
      }
    }, 100); // Shorter delay for simple actions
  });
};

// Add a comment to a note
export const addCommentToNote = (noteId: string, text: string, userId: string): Promise<Comment> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const noteIndex = notes.findIndex(n => n.id === noteId);
      const user = mockUsers.find(u => u.uid === userId);

      if (noteIndex > -1 && user) {
        const newComment: Comment = {
          id: `comment-${Date.now()}`,
          noteId,
          user: { uid: user.uid, name: user.name },
          text,
          createdAt: new Date().toISOString(),
        };
        notes[noteIndex].comments.push(newComment);
        resolve(newComment);
      } else {
        reject(new Error("Note or User not found"));
      }
    }, SIMULATED_DELAY);
  });
};

// Add or update a rating for a note
export const addRatingToNote = (noteId: string, rating: number, userId: string): Promise<Note> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const noteIndex = notes.findIndex(n => n.id === noteId);
            if (noteIndex > -1) {
                const note = notes[noteIndex];
                if (!note.ratings) {
                    note.ratings = [];
                }
                const existingRatingIndex = note.ratings.findIndex(r => r.uid === userId);
                if (existingRatingIndex > -1) {
                    note.ratings[existingRatingIndex].rating = rating;
                } else {
                    note.ratings.push({ uid: userId, rating });
                }
                resolve({ ...note });
            } else {
                reject(new Error("Note not found"));
            }
        }, SIMULATED_DELAY);
    });
};

// Create a new note
export const createNote = (noteData: Omit<Note, 'id' | 'createdAt' | 'status' | 'downloads' | 'comments' | 'uploader' | 'approved'> & { uploaderId: string }): Promise<Note> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = mockUsers.find(u => u.uid === noteData.uploaderId);
            if (!user) {
                return reject(new Error("Uploader not found"));
            }

            const newNote: Note = {
                ...noteData,
                id: `note-${Date.now()}`,
                createdAt: new Date().toISOString(),
                status: 'approved', // Auto-approve new notes for immediate display
                approved: true,
                downloads: 0,
                comments: [],
                ratings: [],
                uploader: { uid: user.uid, name: user.name },
            };
            notes = [newNote, ...notes];
            resolve(newNote);
        }, SIMULATED_DELAY);
    });
}
