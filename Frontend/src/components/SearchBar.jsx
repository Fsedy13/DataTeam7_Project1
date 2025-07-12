import { useState } from 'react';

export default function SearchBar({ value, onSearch }) {
  const [term, setTerm] = useState(value);

  const submit = () => onSearch(term.trim());

  return (
    <div className="flex max-w-md mx-auto">
      <input
        type="text"
        className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Search books by title..."
        value={term}
        onChange={e => setTerm(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && submit()}
      />
      <button
        onClick={submit}
        className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Search
      </button>
    </div>
  );
}
