export default function BookList({ books = [], onEdit, onDelete }) {
  if (!books.length) {
    return <p className="text-center py-6 text-gray-500">No books found.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow bg-white">
      <table className="min-w-full">
        <thead className="bg-indigo-600 text-white">
          <tr>
            {['Title','ISBN','Price','Year','Stock','Actions'].map(h => (
              <th key={h} className="px-4 py-2 text-left text-sm font-medium uppercase">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {books.map(b => (
            <tr key={b.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{b.title}</td>
              <td className="px-4 py-2">{b.isbn}</td>
              <td className="px-4 py-2">${b.price.toFixed(2)}</td>
              <td className="px-4 py-2">{b.publication_year}</td>
              <td className="px-4 py-2">{b.stock}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(b)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(b.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
