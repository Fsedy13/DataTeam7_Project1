import { useState, useEffect } from 'react';

export default function BookForm({ book, onCancel, onSubmit }) {
  const [form, setForm] = useState({
    title: '',
    isbn: '',
    price: '',
    publication_year: '',
    stock: '',
  });

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title || '',
        isbn: book.isbn || '',
        price: book.price?.toString() || '',
        publication_year: book.publication_year?.toString() || '',
        stock: book.stock?.toString() || '',
      });
    }
  }, [book]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({
      ...book,
      title: form.title.trim(),
      isbn: form.isbn.trim(),
      price: parseFloat(form.price),
      publication_year: parseInt(form.publication_year, 10),
      stock: parseInt(form.stock, 10),
    });
  };

  return (
    <div
      className="
        fixed inset-0
        bg-black/50
        grid place-items-center
        px-4 py-6
        z-50
        overflow-auto
      "
    >
      <div
        className="
          bg-white rounded-lg shadow-xl
          w-full max-w-md
          max-h-[90vh]
          overflow-y-auto flex flex-col
        "
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center border-b px-6 py-4">
          <h3 className="text-xl font-semibold text-gray-900">
            {book ? 'Edit Book' : 'Add New Book'}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Form: horizontal layout */}
        <form
          onSubmit={handleSubmit}
          className="px-6 py-4 flex flex-wrap items-end gap-4"
        >
          {[
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'isbn', label: 'ISBN', type: 'text' },
            { name: 'price', label: 'Price ($)', type: 'number', step: '0.01' },
            { name: 'publication_year', label: 'Publication Year', type: 'number' },
            { name: 'stock', label: 'Stock', type: 'number' },
          ].map(field => (
            <div key={field.name} className="flex flex-col flex-grow min-w-[120px]">
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>
              <input
                {...field}
                id={field.name}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                required
                className="
                  mt-1 block w-full
                  border border-gray-300
                  rounded-md px-3 py-2
                  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                "
              />
            </div>
          ))}

          {/* Actions */}
          <div className="ml-auto flex space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="
                px-4 py-2
                bg-white border border-gray-300
                rounded-md text-gray-700
                hover:bg-gray-50
              "
            >
              Cancel
            </button>
            <button
              type="submit"
              className="
                px-4 py-2
                bg-indigo-600 text-white
                rounded-md hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-indigo-500
              "
            >
              {book ? 'Update' : 'Add'} Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
