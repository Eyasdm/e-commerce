"use client";
import { useState } from "react";
import {
  Plus,
  Search,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
} from "lucide-react";
import { useAllProducts } from "@/lib/hooks/admin/useAllProducts";
import {
  useDeleteProduct,
  useCreateProduct,
  useUpdateProduct,
} from "@/lib/hooks/admin/useProductMutations";
import ProductFormModal from "@/components/admin/products/ProductFormModal";
import ProductTableRow from "@/components/admin/products/ProductTableRow";

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

  const filtered = products.filter((p) => {
    const matchCategory = category === "all" || p.category === category;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleEdit = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    setEditingProduct(null);
  };
  const handleSubmit = (data) => {
    if (editingProduct)
      updateProduct(
        { id: editingProduct._id, data },
        { onSuccess: handleClose },
      );
    else createProduct(data, { onSuccess: handleClose });
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg lg:text-xl font-bold text-slate-900">
            Products
          </h2>
          <p className="text-sm text-slate-400">{total} total products</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 lg:px-4 py-2 lg:py-2.5 rounded-xl text-sm transition"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Add Product</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 sm:flex-none">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm outline-none focus:border-blue-400 transition w-full sm:w-56"
          />
        </div>
        <div className="overflow-x-auto pb-1">
          <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1 w-fit">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setCategory(c);
                  setPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all whitespace-nowrap ${
                  category === c
                    ? "bg-blue-600 text-white"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        {isFetching && !isLoading && (
          <Loader2
            size={15}
            className="animate-spin text-slate-300 self-center"
          />
        )}
      </div>

      {/* Mobile product cards */}
      <div className="block lg:hidden space-y-3">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 size={24} className="animate-spin text-slate-300" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-slate-400 text-sm py-12">
            No products found
          </p>
        ) : (
          filtered.map((product) => {
            const imageUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}${product.image}`;
            return (
              <div
                key={product._id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm truncate">
                    {product.name}
                  </p>
                  <p className="text-slate-400 text-xs">
                    {product.brand} · {product.category}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="font-bold text-slate-900 text-sm">
                      ${product.price}
                    </p>
                    <span
                      className={`text-xs font-semibold ${product.stock <= 5 ? "text-red-500" : "text-slate-500"}`}
                    >
                      Stock: {product.stock}
                      {product.stock <= 5 ? " ⚠" : ""}
                    </span>
                    {product.discount > 0 && (
                      <span className="bg-red-50 text-red-500 font-semibold text-xs px-2 py-0.5 rounded-full">
                        {product.discount}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => handleEdit(product)}
                    className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-300 transition"
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    disabled={isDeleting}
                    className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-500 hover:border-red-300 transition disabled:opacity-40"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
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
        {!isLoading && total > 0 && (
          <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Showing{" "}
              <span className="font-semibold text-slate-600">
                {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)}
              </span>{" "}
              of <span className="font-semibold text-slate-600">{total}</span>
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition"
              >
                <ChevronLeft size={14} />
              </button>
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all ${p === page ? "bg-blue-600 text-white" : "border border-slate-200 text-slate-500 hover:bg-slate-50"}`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(pages, p + 1))}
                disabled={page === pages}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

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
