import { useState } from "react";
import { X, Loader2 } from "lucide-react";

const CATEGORIES = [
  "headphones",
  "chargers",
  "powerbanks",
  "keyboards",
  "mouse",
];

const EMPTY_FORM = {
  name: "",
  price: "",
  oldPrice: "",
  discount: "",
  category: "headphones",
  brand: "",
  stock: "",
  description: "",
};

// Derive initial form state directly from the product prop —
// no useEffect needed. When the parent passes a new `key`, React
// unmounts and remounts this component, so useState re-runs cleanly.
function buildForm(product) {
  if (!product) return EMPTY_FORM;
  return {
    name: product.name || "",
    price: product.price || "",
    oldPrice: product.oldPrice || "",
    discount: product.discount || "",
    category: product.category || "headphones",
    brand: product.brand || "",
    stock: product.stock || "",
    description: product.description || "",
  };
}

export default function ProductFormModal({
  product,
  onSubmit,
  onClose,
  isPending,
}) {
  // Initialized once from the product prop — no effect, no cascading renders
  const [form, setForm] = useState(() => buildForm(product));

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      price: Number(form.price),
      oldPrice: Number(form.oldPrice) || undefined,
      discount: Number(form.discount) || 0,
      stock: Number(form.stock),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900">
            {product ? "Edit Product" : "Add New Product"}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-semibold text-slate-500 mb-1 block">
                Product Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400 transition"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1 block">
                Price ($)
              </label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400 transition"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1 block">
                Old Price ($)
              </label>
              <input
                name="oldPrice"
                type="number"
                value={form.oldPrice}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400 transition"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1 block">
                Discount (%)
              </label>
              <input
                name="discount"
                type="number"
                value={form.discount}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400 transition"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1 block">
                Stock
              </label>
              <input
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400 transition"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1 block">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400 transition bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="capitalize">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1 block">
                Brand
              </label>
              <input
                name="brand"
                value={form.brand}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400 transition"
              />
            </div>

            <div className="col-span-2">
              <label className="text-xs font-semibold text-slate-500 mb-1 block">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400 transition resize-none"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-slate-200 text-slate-600 font-semibold py-2.5 rounded-xl text-sm hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm transition flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isPending && <Loader2 size={14} className="animate-spin" />}
              {product ? "Save Changes" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
