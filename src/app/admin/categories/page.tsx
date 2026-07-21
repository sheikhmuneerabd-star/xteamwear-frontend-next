"use client";

import { useEffect, useState } from "react";
import { LuPlus, LuTrash2, LuPencil, LuX, LuCheck } from "react-icons/lu";

interface Subcategory {
  name: string;
  items: string[];
}

interface Category {
  _id: string;
  name: string;
  subcategories: Subcategory[];
}

// Row shape used only inside the form (items kept as a comma-separated
// string while typing, converted to string[] on submit)
interface SubRow {
  name: string;
  items: string;
}

const emptyRow = (): SubRow => ({ name: "", items: "" });

const subcategoriesToRows = (subcategories: Subcategory[]): SubRow[] =>
  subcategories.length > 0
    ? subcategories.map((s) => ({ name: s.name, items: s.items.join(", ") }))
    : [emptyRow()];

const rowsToSubcategories = (rows: SubRow[]): Subcategory[] =>
  rows
    .filter((r) => r.name.trim())
    .map((r) => ({
      name: r.name.trim(),
      items: r.items
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
    }));

function SubRowsEditor({
  rows,
  onChange,
}: {
  rows: SubRow[];
  onChange: (rows: SubRow[]) => void;
}) {
  const updateRow = (index: number, field: keyof SubRow, value: string) => {
    const next = rows.map((r, i) => (i === index ? { ...r, [field]: value } : r));
    onChange(next);
  };

  const addRow = () => onChange([...rows, emptyRow()]);

  const removeRow = (index: number) => {
    const next = rows.filter((_, i) => i !== index);
    onChange(next.length > 0 ? next : [emptyRow()]);
  };

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-gray-500">Subcategories</p>
      {rows.map((row, index) => (
        <div key={index} className="flex gap-2 items-start">
          <input
            className="flex-1 border border-gray-300 rounded-md p-2 text-sm outline-none focus:border-black"
            type="text"
            placeholder="Subcategory name (e.g. Winter Wear)"
            value={row.name}
            onChange={(e) => updateRow(index, "name", e.target.value)}
          />
          <input
            className="flex-1 border border-gray-300 rounded-md p-2 text-sm outline-none focus:border-black"
            type="text"
            placeholder="Items, comma-separated (optional)"
            value={row.items}
            onChange={(e) => updateRow(index, "items", e.target.value)}
          />
          <button
            type="button"
            onClick={() => removeRow(index)}
            className="text-gray-400 hover:text-red-600 p-2"
            aria-label="Remove subcategory row"
          >
            <LuX />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addRow}
        className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-black"
      >
        <LuPlus className="text-xs" /> Add subcategory
      </button>
    </div>
  );
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  const [newName, setNewName] = useState("");
  const [newSubRows, setNewSubRows] = useState<SubRow[]>([emptyRow()]);
  const [creating, setCreating] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editSubRows, setEditSubRows] = useState<SubRow[]>([emptyRow()]);

  const [error, setError] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data.categories || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSeed = async () => {
    setSeeding(true);
    setError("");
    const res = await fetch("/api/categories/seed", { method: "POST" });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Seeding failed");
    } else {
      fetchCategories();
    }
    setSeeding(false);
  };

  const handleCreate = async () => {
    if (!newName.trim()) return;
    setCreating(true);
    setError("");

    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newName,
        subcategories: rowsToSubcategories(newSubRows),
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Failed to create category");
    } else {
      setNewName("");
      setNewSubRows([emptyRow()]);
      fetchCategories();
    }
    setCreating(false);
  };

  const startEdit = (cat: Category) => {
    setEditingId(cat._id);
    setEditName(cat.name);
    setEditSubRows(subcategoriesToRows(cat.subcategories));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditSubRows([emptyRow()]);
  };

  const saveEdit = async (id: string) => {
    setError("");
    const res = await fetch(`/api/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: editName,
        subcategories: rowsToSubcategories(editSubRows),
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Failed to update category");
    } else {
      cancelEdit();
      fetchCategories();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category? Products already assigned to it will keep the old category name.")) return;

    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCategories((prev) => prev.filter((c) => c._id !== id));
    } else {
      alert("Failed to delete category");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Categories</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage Navbar & Product categories</p>
        </div>
        {categories.length === 0 && !loading && (
          <button
            type="button"
            onClick={handleSeed}
            disabled={seeding}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
          >
            {seeding ? "Importing..." : "Import existing categories"}
          </button>
        )}
      </div>

      {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-3 mb-4">{error}</p>}

      {/* Add new category */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold mb-4">Add New Category</h2>
        <input
          className="w-full border border-gray-300 rounded-md p-2.5 text-sm outline-none focus:border-black mb-4"
          type="text"
          placeholder="Category name (e.g. Football)"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <SubRowsEditor rows={newSubRows} onChange={setNewSubRows} />
        <button
          type="button"
          onClick={handleCreate}
          disabled={creating || !newName.trim()}
          className="mt-4 bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <LuPlus /> Add Category
        </button>
      </div>

      {/* Category list */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : categories.length === 0 ? (
        <p className="text-gray-500">
          No categories yet. Click &quot;Import existing categories&quot; above to bring in your current
          Navbar categories, or add a new one.
        </p>
      ) : (
        <div className="space-y-3">
          {categories.map((cat) => (
            <div key={cat._id} className="bg-white rounded-xl border border-gray-200 p-5">
              {editingId === cat._id ? (
                <div className="space-y-3">
                  <input
                    className="w-full border border-gray-300 rounded-md p-2.5 text-sm outline-none focus:border-black"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <SubRowsEditor rows={editSubRows} onChange={setEditSubRows} />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => saveEdit(cat._id)}
                      className="flex items-center gap-1 bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1.5 rounded-md text-sm font-medium"
                    >
                      <LuCheck /> Save
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="flex items-center gap-1 bg-gray-100 text-gray-600 hover:bg-gray-200 px-3 py-1.5 rounded-md text-sm font-medium"
                    >
                      <LuX /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{cat.name}</p>
                    <div className="flex flex-col gap-2 mt-2">
                      {cat.subcategories.length === 0 ? (
                        <span className="text-xs text-gray-400">No subcategories</span>
                      ) : (
                        cat.subcategories.map((sub) => (
                          <div key={sub.name} className="flex flex-wrap items-center gap-1.5">
                            <span className="text-xs bg-gray-100 text-gray-700 font-medium px-2 py-1 rounded">
                              {sub.name}
                            </span>
                            {sub.items.map((item) => (
                              <span key={item} className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded border border-gray-100">
                                {item}
                              </span>
                            ))}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => startEdit(cat)}
                      className="flex items-center gap-1 bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-md text-sm font-medium"
                    >
                      <LuPencil className="text-xs" /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(cat._id)}
                      className="flex items-center gap-1 bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1.5 rounded-md text-sm font-medium"
                    >
                      <LuTrash2 className="text-xs" /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}