import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CategoryFilter from './components/CategoryFilter';
import ShoppingGroup from './components/ShoppingGroup';
import AddItemModal from './components/AddItemModal';
import { Search, Plus, Trash2, ShoppingBasket } from 'lucide-react';
import { api } from './services/api';

const DEFAULT_CATEGORIES = [
  { id: 1, name: 'Vegetable Shop', emoji: '🥦' },
  { id: 2, name: 'Dairy & Milk Booth', emoji: '🥛' },
  { id: 3, name: 'Grocery Store / Kirana', emoji: '🛒' },
  { id: 4, name: 'Fruit Stall', emoji: '🍎' },
  { id: 5, name: 'Bakery', emoji: '🍞' },
  { id: 6, name: 'Meat & Fish Market', emoji: '🐟' },
  { id: 7, name: 'Chemist & Personal Care', emoji: '💊' }
];

export default function App() {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [items, setItems] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isShoppingMode, setIsShoppingMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Try to load from API, fallback to localStorage
    const saved = localStorage.getItem('shoplist_react_items');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {}
    } else {
      // Default sample items
      const sample = [
        { id: 1, itemName: 'Fresh Tomatoes', categoryId: 1, plannedQuantity: 2, unit: 'kg', status: 'PENDING', estimatedPrice: 60, notes: 'Firm and red' },
        { id: 2, itemName: 'Full Cream Milk', categoryId: 2, plannedQuantity: 2, unit: 'litre', status: 'PENDING', estimatedPrice: 130, notes: '2 packets' },
        { id: 3, itemName: 'Basmati Rice', categoryId: 3, plannedQuantity: 5, unit: 'kg', status: 'PENDING', estimatedPrice: 450, notes: 'Royal brand' },
        { id: 4, itemName: 'Whole Wheat Bread', categoryId: 5, plannedQuantity: 1, unit: 'packet', status: 'PENDING', estimatedPrice: 45, notes: 'Fresh bake' }
      ];
      setItems(sample);
      localStorage.setItem('shoplist_react_items', JSON.stringify(sample));
    }

    // Try fetching from Spring Boot API
    api.getCategories()
      .then(cats => {
        if (cats && cats.length > 0) setCategories(cats);
      })
      .catch(() => {});
  }, []);

  const saveItems = (updated) => {
    setItems(updated);
    localStorage.setItem('shoplist_react_items', JSON.stringify(updated));
  };

  const handleToggleStatus = (itemId) => {
    const updated = items.map((item) => {
      if (item.id === itemId) {
        const nextStatus = item.status === 'PURCHASED' ? 'PENDING' : 'PURCHASED';
        api.updateItemStatus(itemId, nextStatus).catch(() => {});
        return { ...item, status: nextStatus };
      }
      return item;
    });
    saveItems(updated);
  };

  const handleDeleteItem = (itemId) => {
    const updated = items.filter((i) => i.id !== itemId);
    saveItems(updated);
    api.deleteItem(itemId).catch(() => {});
  };

  const handleAddItem = (itemData) => {
    const newItem = {
      id: Date.now(),
      ...itemData,
      status: 'PENDING',
    };
    const updated = [newItem, ...items];
    saveItems(updated);
    api.addItem(1, itemData).catch(() => {});
  };

  const handleClearPurchased = () => {
    if (window.confirm('Remove all purchased items from the list?')) {
      const updated = items.filter((i) => i.status !== 'PURCHASED');
      saveItems(updated);
      api.clearPurchased(1).catch(() => {});
    }
  };

  // Filter items
  const filtered = items.filter((item) => {
    const matchesCat = selectedCategoryId === null || (item.category?.id || item.categoryId) === selectedCategoryId;
    const matchesSearch =
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.notes && item.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // Calculate stats
  const total = items.length;
  const purchased = items.filter((i) => i.status === 'PURCHASED').length;
  const percent = total > 0 ? Math.round((purchased / total) * 100) : 0;
  const totalSpend = items.reduce((sum, i) => sum + (Number(i.estimatedPrice) || 0), 0);

  return (
    <div className={`min-h-screen text-slate-800 flex flex-col font-sans pb-24 ${isShoppingMode ? 'bg-slate-100' : 'bg-slate-50'}`}>
      <Navbar
        isShoppingMode={isShoppingMode}
        onToggleShoppingMode={() => setIsShoppingMode(!isShoppingMode)}
        progress={{ total, purchased, percent }}
        totalSpend={totalSpend}
      />

      <main className="max-w-3xl mx-auto w-full px-4 pt-4 flex-1">
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search items (e.g. Milk, Onions, Bread)..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 active:scale-95 transition shadow-sm shadow-emerald-600/30"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Item</span>
          </button>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
          items={items}
        />

        {filtered.length === 0 ? (
          <div className="text-center py-12 px-4 bg-white rounded-2xl border border-dashed border-slate-200 my-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <ShoppingBasket className="w-7 h-7" />
            </div>
            <h3 className="font-semibold text-slate-800 text-base">Your shopping list is clear!</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 mb-4">
              No items in this category. Add what you need for your market run.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition"
            >
              + Add Item
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {categories.map((cat) => {
              const catItems = filtered.filter(
                (item) => (item.category?.id || item.categoryId) === cat.id
              );
              if (catItems.length === 0) return null;

              return (
                <ShoppingGroup
                  key={cat.id}
                  category={cat}
                  items={catItems}
                  onToggleStatus={handleToggleStatus}
                  onDeleteItem={handleDeleteItem}
                />
              );
            })}
          </div>
        )}

        {purchased > 0 && (
          <div className="mt-6 mb-2 flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-600 font-medium">{purchased} item(s) marked as bought</span>
            <button
              onClick={handleClearPurchased}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 py-1 px-2.5 rounded-lg hover:bg-rose-50 transition"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear Done Items
            </button>
          </div>
        )}
      </main>

      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={categories}
        onAddItem={handleAddItem}
      />
    </div>
  );
}
