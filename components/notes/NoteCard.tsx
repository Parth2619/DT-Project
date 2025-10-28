import React from 'react';
import { Link } from 'react-router-dom';
import { Note } from '../../types';
import { FileTextIcon, UserIcon } from '../../constants';

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  return (
    <Link to={`/notes/${note.id}`} className="block group">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 h-full flex flex-col transition-all duration-300 group-hover:border-primary group-hover:shadow-glow group-hover:-translate-y-2">
        <div className="flex justify-between items-start">
          <span className="text-sm font-bold text-primary">{note.subject}</span>
        </div>
        <h3 className="text-xl font-bold text-white mt-2 flex-grow">{note.title}</h3>
        <p className="text-sm text-gray-400 mt-2 line-clamp-2">{note.description}</p>
        <div className="border-t border-gray-700 mt-4 pt-4 flex justify-between items-center text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <UserIcon className="w-4 h-4" />
            <span>{note.uploader.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileTextIcon className="w-4 h-4" />
            <span className="uppercase font-mono">{note.type}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;