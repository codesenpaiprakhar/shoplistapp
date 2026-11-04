import React from 'react';
import { ShoppingBag, CheckCheck } from 'lucide-react';

export default function Navbar({ isShoppingMode, onToggleShoppingMode, progress, totalSpend }) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-emerald-100 shadow-sm">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-tight">ShopList</h1>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Full-Stack Ready
              </span>
            </div>
            <p className="text-xs text-slate-500">Organized by shop category for market runs</p>
          </div>
        </div>

        <button
          onClick={onToggleShoppingMode}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
            isShoppingMode
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
              : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
          }`}
        >
          <CheckCheck className="w-4 h-4" />
          <span>{isShoppingMode ? 'Shopping Active ✓' : 'Shopping Mode'}</span>
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-2.5 pt-0.5">
        <div className="flex justify-between items-center text-xs text-slate-500 mb-1">
          <span className="font-medium">
            {progress.purchased} of {progress.total} items purchased ({progress.percent}%)
          </span>
          <span className="font-semibold text-slate-700">Est. Total: ₹{totalSpend}</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
          <div
            className="bg-gradient-to-r from-emerald-500 to-green-600 h-full transition-all duration-300"
            style={{ width: `${progress.percent}%` }}
          />
        </div>
      </div>
    </header>
  );
}
