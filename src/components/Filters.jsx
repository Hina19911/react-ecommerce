// src/components/Filters.jsx
// src/components/Filters.jsx (compact)
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const cx = (...x) => x.filter(Boolean).join(" ");

export default function Filters({ onFilter, currentFilter }) {
  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const r = await fetch("https://fakestoreapi.com/products/categories");
        const d = await r.json();
        if (!cancel) setCategories(Array.isArray(d) ? d : []);
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancel) setLoadingCats(false);
      }
    })();
    return () => (cancel = true);
  }, []);

  const send = (p) => typeof onFilter === "function" && onFilter(p);
  const isActive = (t, v) =>
    currentFilter?.type === t && (v === undefined || currentFilter?.value === v);

  return (
    <aside className="w-full max-w-[240px] shrink-0 border-r border-black/10 bg-purple-400">
      {/* slimmer header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-3 py-2 text-white">
        <h2 className="text-sm font-semibold tracking-wide">Filters</h2>
      </div>

      <div className="space-y-4 p-3">
        {/* Search — compact */}
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-700">
            Search
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Titles…"
              className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-xs placeholder:text-slate-400 focus:border-fuchsia-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => send({ type: "search", value: search.trim() })}
              className="rounded-md bg-fuchsia-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-fuchsia-600"
            >
              Go
            </button>
          </div>
        </div>

        {/* Price + All — smaller buttons */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => send({ type: "price", value: 500 })}
            className={cx(
              "w-full rounded-md border px-3 py-1.5 text-left text-xs font-medium transition",
              isActive("price", 500)
                ? "border-fuchsia-500 bg-fuchsia-50 text-fuchsia-700"
                : "border-slate-200 hover:border-fuchsia-400 hover:bg-fuchsia-50/50"
            )}
          >
            Under $500
          </button>
          <button
            type="button"
            onClick={() => send({ type: "all" })}
            className={cx(
              "w-full rounded-md border px-3 py-1.5 text-left text-xs font-medium transition",
              isActive("all")
                ? "border-fuchsia-500 bg-fuchsia-50 text-fuchsia-700"
                : "border-slate-200 hover:border-fuchsia-400 hover:bg-fuchsia-50/50"
            )}
          >
            Show All
          </button>
        </div>

        {/* Categories — horizontal chips (wrapping) */}
        <div>
          <div className="mb-1 text-xs font-semibold text-slate-800">
            Categories
          </div>
          {loadingCats ? (
            <div className="text-xs text-slate-500">Loading…</div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => send({ type: "category", value: cat })}
                  className={cx(
                    "rounded-full border px-3 py-1 text-xs capitalize transition",
                    isActive("category", cat)
                      ? "border-fuchsia-500 bg-fuchsia-50 text-fuchsia-700"
                      : "border-slate-200 hover:border-fuchsia-400 hover:bg-fuchsia-50/50"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sort — compact */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => send({ type: "sort", value: "price-asc" })}
            className={cx(
              "flex-1 rounded-md border px-3 py-1.5 text-xs transition",
              isActive("sort", "price-asc")
                ? "border-fuchsia-500 bg-pink-500 text-fuchsia-700"
                : "border-slate-200 hover:border-fuchsia-400 hover:bg-fuchsia-50/50"
            )}
          >
            Price ↑
          </button>
          <button
            type="button"
            onClick={() => send({ type: "sort", value: "price-desc" })}
            className={cx(
              "flex-1 rounded-md border px-3 py-1.5 text-xs transition",
              isActive("sort", "price-desc")
                ? "border-fuchsia-500 bg-pink-500 text-fuchsia-700"
                : "border-slate-200 hover:border-fuchsia-400 hover:bg-fuchsia-50/50"
            )}
          >
            Price ↓
          </button>
        </div>
      </div>
    </aside>
  );
}

Filters.propTypes = {
  onFilter: PropTypes.func.isRequired,
  currentFilter: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.any,
  }),
};
