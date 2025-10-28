import { Note, User, NoteType, Comment } from '../types';

export const mockUsers: User[] = [
    { uid: 'user-1', name: 'Alice Johnson', email: 'alice@example.com', role: 'user' },
    { uid: 'user-2', name: 'Bob Williams', email: 'bob@example.com', role: 'user' },
    { uid: 'admin-1', name: 'Admin Carol', email: 'carol@example.com', role: 'admin' },
];

const mockComments: Comment[] = [
    {
        id: 'comment-1',
        noteId: 'note-1',
        user: { uid: 'user-2', name: 'Bob Williams' },
        text: 'This is incredibly helpful, thank you for sharing!',
        createdAt: new Date('2023-10-29T10:00:00Z').toISOString(),
    },
    {
        id: 'comment-2',
        noteId: 'note-1',
        user: { uid: 'user-1', name: 'Alice Johnson' },
        text: 'You bet! Glad it could help.',
        createdAt: new Date('2023-10-29T11:30:00Z').toISOString(),
    },
];

export const mockNotes: Note[] = [
    {
        id: 'note-1',
        title: 'Introduction to Quantum Mechanics Lecture Notes',
        description: 'Comprehensive notes covering the first 5 lectures of PHYS-301. Includes key concepts like wave-particle duality and the Schrödinger equation.',
        semester: 3,
        subject: 'Physics',
        type: NoteType.PDF,
        tags: ['physics', 'quantum', 'lecture'],
        fileUrl: '#', // Placeholder
        uploader: { uid: 'user-1', name: 'Alice Johnson' },
        approved: true,
        status: 'approved',
        downloads: 128,
        comments: mockComments.filter(c => c.noteId === 'note-1'),
        // Fix: Added mock ratings data.
        ratings: [
            { uid: 'user-2', rating: 5 },
            { uid: 'admin-1', rating: 4 },
        ],
        createdAt: new Date('2023-10-28T14:00:00Z').toISOString(),
    },
    {
        id: 'note-2',
        title: 'Data Structures & Algorithms Midterm Review',
        description: 'A complete review sheet for the COMP-251 midterm. Covers Big O notation, sorting algorithms, and hash tables.',
        semester: 2,
        subject: 'Computer Science',
        type: NoteType.DOCX,
        tags: ['cs', 'algorithms', 'midterm'],
        fileUrl: '#',
        uploader: { uid: 'user-2', name: 'Bob Williams' },
        approved: true,
        status: 'approved',
        downloads: 256,
        comments: [],
        // Fix: Added mock ratings data.
        ratings: [
            { uid: 'user-1', rating: 4 },
        ],
        createdAt: new Date('2023-10-27T18:00:00Z').toISOString(),
    },
    {
        id: 'note-3',
        title: 'Organic Chemistry Reaction Mechanisms',
        description: 'Visual guide to common reaction mechanisms in CHEM-212, including SN1, SN2, E1, and E2.',
        semester: 2,
        subject: 'Chemistry',
        type: NoteType.IMAGE,
        tags: ['chemistry', 'organic', 'reactions'],
        fileUrl: 'https://picsum.photos/seed/chem/800/600',
        uploader: { uid: 'user-1', name: 'Alice Johnson' },
        approved: true,
        status: 'approved',
        downloads: 98,
        comments: [],
        // Fix: Added mock ratings data.
        ratings: [],
        createdAt: new Date('2023-10-26T09:00:00Z').toISOString(),
    },
    {
        id: 'note-4',
        title: 'Calculus III Final Exam Study Guide',
        description: 'A comprehensive study guide covering all topics for the MATH-222 final exam.',
        semester: 3,
        subject: 'Mathematics',
        type: NoteType.PDF,
        tags: ['math', 'calculus', 'exam'],
        fileUrl: '#',
        uploader: { uid: 'user-2', name: 'Bob Williams' },
        approved: false,
        status: 'pending',
        downloads: 0,
        comments: [],
        createdAt: new Date('2023-10-30T11:00:00Z').toISOString(),
    },
];