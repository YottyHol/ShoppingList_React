import { useState } from "react";
import { Plus } from "lucide-react";
import { AddItemModal } from "./components/AddItemModal";
import { ShoppingList } from "./components/ShoppingList";
import type { NewShoppingListItem } from "./types/ShoppingListItem";
import { mockShoppingItems } from "./utils/mockShoppingItems";

export function App() {
  const [items, setItems] = useState(() => [...mockShoppingItems]);
  const [addModalOpen, setAddModalOpen] = useState(false);

  function handleDeleteItem(id: string) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, deleted: true } : item,
      ),
    );
  }

  function handleToggleCompleted(id: string) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  }

  function handleAddItem(payload: NewShoppingListItem) {
    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: payload.name,
        price: payload.price,
        completed: false,
        deleted: false,
      },
    ]);
    setAddModalOpen(false);
  }

  const visibleItems = items.filter((item) => !item.deleted);

  return (
    <main className="min-h-screen bg-[var(--color-page)] text-[var(--color-text)]">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col p-6 md:p-10">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--color-accent)]">
              My Shopping List
            </h1>
          </div>
          <button
            type="button"
            onClick={() => setAddModalOpen(true)}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-[var(--color-accent)] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Add item
          </button>
        </header>
        <AddItemModal
          open={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onAdd={handleAddItem}
        />
        <ShoppingList
          items={visibleItems}
          onDeleteItem={handleDeleteItem}
          onToggleCompleted={handleToggleCompleted}
        />
      </section>
    </main>
  )
}
