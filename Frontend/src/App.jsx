import { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import SearchBar from './components/SearchBar.jsx';
import BookList from './components/BookList.jsx';
import BookForm from './components/BookForm.jsx';

export default function App() {
  // In‐memory book list
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editBook, setEditBook] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8081/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error("Failed to fetch books:", err));
  }, []);

  // Chart redraw on books change
  useEffect(() => {
    if (!books.length) return;
    const chartDom = document.getElementById('stockChart');
    if (!chartDom) return;
    const chart = echarts.init(chartDom);
    chart.setOption({
      animation: false,
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: books.map(b => b.title) },
      yAxis: { type: 'value', name: 'Stock' },
      series: [{
        data: books.map(b => b.stock),
        type: 'bar',
        barWidth: '40%',
        itemStyle: { color: '#4F46E5' }
      }]
    });
  }, [books]);

  const handleSearch = term => setSearchTerm(term);

  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = id => {
    setBooks(bs => bs.filter(b => b.id !== id));
  };

  const openAdd = () => {
    setEditBook(null);
    setShowForm(true);
  };
  const openEdit = b => {
    setEditBook(b);
    setShowForm(true);
  };

  const handleSubmit = formData => {
    if (formData.id) {
      // Update
      setBooks(bs => bs.map(b => b.id === formData.id ? formData : b));
    } else {
      // Add new
      const nextId = books.length ? Math.max(...books.map(b => b.id)) + 1 : 1;
      setBooks(bs => [...bs, { ...formData, id: nextId }]);
    }
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">BookNest Inventory Manager</h1>
          <button
            onClick={openAdd}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700"
          >
            Add New Book
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        <SearchBar value={searchTerm} onSearch={handleSearch} />

        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Current Stock Overview</h2>
          <div id="stockChart" style={{ height: '300px' }} />
        </section>

        <BookList
          books={filtered}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      </main>

      {showForm && (
        <BookForm
          book={editBook}
          onCancel={() => setShowForm(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
