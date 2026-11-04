import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AddItemModal({ isOpen, onClose, categories, onAddItem }) {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 1);
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState('kg');
  const [price, setPrice] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddItem({
      itemName: name.trim(),
      categoryId: Number(categoryId),
      plannedQuantity: parseFloat(quantity) || 1,
      unit,
      estimatedPrice: parseFloat(price) || 0,
      notes: notes.trim(),
    });

    setName('');
    setPrice('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Add Grocery Item</h2>
            <p className="text-xs text-slate-500">Pick which shop you'll buy this from</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Item Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Fresh Tomatoes, Paneer, Atta"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Buy From Which Shop? *</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition ${
                    categoryId === cat.id
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-semibold'
                      : 'border-slate-200 hover:border-emerald-300 bg-slate-50/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="modal_cat"
                    value={cat.id}
                    checked={categoryId === cat.id}
                    onChange={() => setCategoryId(cat.id)}
                    className="hidden"
                  />
                  <span className="text-base">{cat.emoji || '🏬'}</span>
                  <span className="truncate">{cat.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Quantity *</label>
              <input
                type="number"
                step="any"
                min="0.1"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Unit</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="kg">kg (Kilograms)</option>
                <option value="g">g (Grams)</option>
                <option value="litre">litre (L)</option>
                <option value="ml">ml (Millilitres)</option>
                <option value="packet">packet / pouch</option>
                <option value="piece">piece (pc)</option>
                <option value="dozen">dozen</option>
                <option value="bunch">bunch</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Estimated Price (₹)</label>
              <input
                type="number"
                step="any"
                placeholder="e.g. 60"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Notes (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Firm and ripe"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-600/25 active:scale-[0.99] transition"
            >
              Add to Shopping List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
