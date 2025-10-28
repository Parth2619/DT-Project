import React, { useState } from 'react';
import { NoteType } from '../../types';
import { createNote } from '../../services/notesApiService';
import { useToast } from '../../hooks/useToast';
import FileUploader from '../FileUploader';
import Spinner from '../Spinner';

interface NoteFormProps {
    onNoteCreated: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onNoteCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [subject, setSubject] = useState('');
    const [semester, setSemester] = useState(1);
    const [type, setType] = useState<NoteType>(NoteType.PDF);
    const [tags, setTags] = useState('');
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { addToast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description || !subject || !semester || !tags || !fileUrl) {
            addToast("Please fill all fields and upload a file.", "error");
            return;
        }

        setIsSubmitting(true);
        try {
            const noteData = {
                title,
                description,
                subject,
                semester,
                type,
                tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
                fileUrl, // In real app, this would be a URL from storage after upload
                uploaderId: 'user-1' // Mocking current user
            };
            await createNote(noteData);
            addToast("Note submitted for review!", "success");
            onNoteCreated();
        } catch (error) {
            addToast("Failed to submit note.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Share New Note</h2>
            
            <FileUploader onFileSelect={setFileUrl} acceptedTypes="document" maxSizeMB={50} />

            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:outline-none" required />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:outline-none" required></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                    <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g., Physics" className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:outline-none" required />
                </div>
                <div>
                    <label htmlFor="semester" className="block text-sm font-medium text-gray-300 mb-1">Semester</label>
                    <input type="number" id="semester" value={semester} min="1" max="8" onChange={(e) => setSemester(parseInt(e.target.value, 10))} className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:outline-none" required />
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">File Type</label>
                    <select id="type" value={type} onChange={(e) => setType(e.target.value as NoteType)} className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:outline-none">
                        <option value={NoteType.PDF}>PDF</option>
                        <option value={NoteType.DOCX}>DOCX</option>
                        <option value={NoteType.IMAGE}>Image</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">Tags (comma-separated)</label>
                    <input type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g., physics, quantum" className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:outline-none" required />
                </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors disabled:bg-gray-500 flex justify-center items-center">
                {isSubmitting ? <Spinner /> : 'Submit Note'}
            </button>
        </form>
    );
};

export default NoteForm;
