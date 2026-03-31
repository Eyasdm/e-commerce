import { useState } from "react";
import { Plus, Search, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useAllProducts } from "../hooks/useAllProducts";
import {
  useDeleteProduct,
  useCreateProduct,
  useUpdateProduct,
} from "../hooks/useProductMutations";
import ProductFormModal from "../components/products/ProductFormModal";
import ProductTableRow from "../components/products/ProductTableRow";

const CATEGORIES = [
  "all",
  "headphones",
  "chargers",
  "powerbanks",
  "keyboards",
  "mouse",
];

const PAGE_SIZE = 10;

export default function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const {
    data: { products = [], total = 0, pages = 1 } = {},
    isLoading,
    isFetching,
  } = useAllProducts({ page, limit: PAGE_SIZE });

  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();

  // Client-side filter only applies to the current page's data
  // (search + category are cheap since we only have PAGE_SIZE rows in memory)
  const filtered = products.filter((p) => {
    const matchCategory = category === "all" || p.category === category;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Reset to page 1 when filters change
  const handleCategoryChange = (c) => {
    setCategory(c);
    setPage(1);
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = (data) => {
    if (editingProduct) {
      updateProduct(
        { id: editingProduct._id, data },
        { onSuccess: handleClose },
      );
    } else {
      createProduct(data, { onSuccess: handleClose });
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Products</h2>
          <p className="text-sm text-slate-400">{total} total products</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* ── Filters ────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearchChange}
            className="border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm outline-none focus:border-blue-400 transition w-56"
          />
        </div>

        <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => handleCategoryChange(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                category === c
                  ? "bg-blue-600 text-white"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Fetching indicator — subtle, doesn't block the UI */}
        {isFetching && !isLoading && (
          <Loader2 size={15} className="animate-spin text-slate-300 ml-1" />
        )}
      </div>

      {/* ── Table ──────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {[
                  "Image",
                  "Product",
                  "Category",
                  "Price",
                  "Stock",
                  "Discount",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs font-semibold text-slate-400 px-4 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <Loader2
                      size={24}
                      className="animate-spin text-slate-300 mx-auto"
                    />
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-12 text-center text-slate-400 text-sm"
                  >
                    No products found
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <ProductTableRow
                    key={product._id}
                    product={product}
                    onEdit={handleEdit}
                    onDelete={deleteProduct}
                    isDeleting={isDeleting}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination footer ─────────────────────────────────────────── */}
        {!isLoading && total > 0 && (
          <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
            {/* Count */}
            <p className="text-xs text-slate-400">
              Showing{" "}
              <span className="font-semibold text-slate-600">
                {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)}
              </span>{" "}
              of <span className="font-semibold text-slate-600">{total}</span>{" "}
              products
            </p>

            {/* Page buttons */}
            <div className="flex items-center gap-1">
              {/* Prev */}
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft size={14} />
              </button>

              {/* Page number pills */}
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all ${
                    p === page
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {p}
                </button>
              ))}

              {/* Next */}
              <button
                onClick={() => setPage((p) => Math.min(pages, p + 1))}
                disabled={page === pages}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Modal ──────────────────────────────────────────────────────────── */}
      {modalOpen && (
        <ProductFormModal
          key={editingProduct?._id ?? "new"}
          product={editingProduct}
          onSubmit={handleSubmit}
          onClose={handleClose}
          isPending={isCreating || isUpdating}
        />
      )}
    </div>
  );
}
