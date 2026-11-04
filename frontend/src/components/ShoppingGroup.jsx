import React from 'react';
import { Check, Trash2 } from 'lucide-react';

export default function ShoppingGroup({ category, items, onToggleStatus, onDeleteItem }) {
  const pendingCount = items.filter((i) => i.status === 'PENDING').length;
  const allDone = pendingCount === 0;

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all duration-200 ${
        allDone ? 'opacity-75 bg-slate-50/50' : ''
      }`}
    >
      <div className="px-4 py-3 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{category.emoji || '🏬'}</span>
          <h3 className="font-bold text-slate-800 text-sm tracking-tight">{category.name}</h3>
          <span
            className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
              allDone ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {allDone ? 'All items bought ✓' : `${pendingCount} to buy`}
          </span>
        </div>
        <span className="text-xs text-slate-400 font-medium">{items.length} items</span>
      </div>

      <div className="divide-y divide-slate-100">
        {items.map((item) => {
          const isPurchased = item.status === 'PURCHASED';

          return (
            <div
              key={item.id}
              className={`flex items-center justify-between p-3.5 sm:px-4 hover:bg-slate-50/80 transition-colors ${
                isPurchased ? 'bg-emerald-50/30' : ''
              }`}
            >
              <div
                className="flex items-center gap-3.5 flex-1 min-w-0 mr-2 cursor-pointer"
                onClick={() => onToggleStatus(item.id)}
              >
                <div
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-colors ${
                    isPurchased
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-300 hover:border-emerald-500 bg-white'
                  }`}
                >
                  {isPurchased && <Check className="w-4 h-4 stroke-[3]" />}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-sm font-semibold text-slate-900 select-none ${
                        isPurchased ? 'line-through text-slate-400 font-normal' : ''
                      }`}
                    >
                      {item.itemName}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {item.plannedQuantity} {item.unit}
                    </span>
                    {item.estimatedPrice > 0 && (
                      <span className="text-xs text-slate-500 font-medium">₹{item.estimatedPrice}</span>
                    )}
                  </div>
                  {item.notes && (
                    <p className="text-xs text-slate-400 truncate mt-0.5">{item.notes}</p>
                  )}
                </div>
              </div>

              <button
                onClick={() => onDeleteItem(item.id)}
                title="Delete item"
                className="text-slate-300 hover:text-rose-500 p-1.5 rounded-lg hover:bg-slate-100 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
