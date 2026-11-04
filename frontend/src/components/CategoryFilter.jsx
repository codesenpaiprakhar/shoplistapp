import React from 'react';

export default function CategoryFilter({ categories, selectedCategoryId, onSelectCategory, items }) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 mb-3 no-scrollbar scroll-smooth">
      <button
        onClick={() => onSelectCategory(null)}
        className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition ${
          selectedCategoryId === null
            ? 'bg-slate-900 text-white shadow-sm'
            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
        }`}
      >
        <span>🏪</span> All Shops
      </button>

      {categories.map((cat) => {
        const isSelected = selectedCategoryId === cat.id;
        const count = items.filter(
          (i) => (i.category?.id || i.categoryId) === cat.id && i.status === 'PENDING'
        ).length;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1.5 transition ${
              isSelected
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{cat.emoji || '🏬'}</span>
            <span>{cat.name}</span>
            {count > 0 && (
              <span
                className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                  isSelected ? 'bg-emerald-900 text-emerald-200' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
