"use client";

import { useEffect, useState } from "react";
import { LuPlus, LuTrash2, LuPencil, LuX, LuCheck } from "react-icons/lu";

interface Category {
  _id: string;
  name: string;
  subcategories: string[];
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  const [newName, setNewName] = useState("");
  const [newSubs, setNewSubs] = useState("");
  const [creating, setCreating] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editSubs, setEditSubs] = useState("");

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
        subcategories: newSubs.split(",").map((s) => s.trim()).filter(Boolean),
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Failed to create category");
    } else {
      setNewName("");
      setNewSubs("");
      fetchCategories();
    }
    setCreating(false);
  };

  const startEdit = (cat: Category) => {
    setEditingId(cat._id);
    setEditName(cat.name);
    setEditSubs(cat.subcategories.join(", "));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditSubs("");
  };

  const saveEdit = async (id: string) => {
    setError("");
    const res = await fetch(`/api/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: editName,
        subcategories: editSubs.split(",").map((s) => s.trim()).filter(Boolean),
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
        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="border border-gray-300 rounded-md p-2.5 text-sm outline-none focus:border-black"
            type="text"
            placeholder="Category name (e.g. Football)"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            className="border border-gray-300 rounded-md p-2.5 text-sm outline-none focus:border-black"
            type="text"
            placeholder="Subcategories, comma-separated (e.g. Jersey, Shorts)"
            value={newSubs}
            onChange={(e) => setNewSubs(e.target.value)}
          />
        </div>
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
                  <input
                    className="w-full border border-gray-300 rounded-md p-2.5 text-sm outline-none focus:border-black"
                    value={editSubs}
                    onChange={(e) => setEditSubs(e.target.value)}
                    placeholder="Subcategories, comma-separated"
                  />
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
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {cat.subcategories.length === 0 ? (
                        <span className="text-xs text-gray-400">No subcategories</span>
                      ) : (
                        cat.subcategories.map((sub) => (
                          <span key={sub} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {sub}
                          </span>
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