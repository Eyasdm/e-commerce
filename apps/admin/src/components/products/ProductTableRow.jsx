import { Pencil, Trash2 } from "lucide-react";

export default function ProductTableRow({
  product,
  onEdit,
  onDelete,
  isDeleting,
}) {
  const imageUrl = `http://localhost:8000${product.image}`;

  return (
    <tr className="hover:bg-slate-50 transition">
      <td className="px-4 py-3">
        <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-contain p-1"
          />
        </div>
      </td>
      <td className="px-4 py-3">
        <p className="font-medium text-slate-800 text-sm">{product.name}</p>
        <p className="text-slate-400 text-xs">{product.brand}</p>
      </td>
      <td className="px-4 py-3 capitalize text-slate-600 text-sm">
        {product.category}
      </td>
      <td className="px-4 py-3 font-semibold text-slate-900 text-sm">
        ${product.price}
      </td>
      <td className="px-4 py-3 text-sm">
        <span
          className={`font-semibold ${product.stock <= 5 ? "text-red-500" : "text-slate-700"}`}
        >
          {product.stock}
        </span>
        {product.stock <= 5 && (
          <span className="ml-1 text-xs text-red-400">Low</span>
        )}
      </td>
      <td className="px-4 py-3 text-sm text-slate-600">
        {product.discount > 0 ? (
          <span className="bg-red-50 text-red-500 font-semibold text-xs px-2 py-0.5 rounded-full">
            {product.discount}%
          </span>
        ) : (
          "—"
        )}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(product)}
            className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-300 transition"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => onDelete(product._id)}
            disabled={isDeleting}
            className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-500 hover:border-red-300 transition disabled:opacity-40"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </td>
    </tr>
  );
}
