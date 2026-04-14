import { useState } from "react";
import { Plus, ShoppingBasket } from "lucide-react";
import { AddItemModal } from "./components/AddItemModal";
import { Budget } from "./components/Budget";
import { ShoppingList } from "./components/ShoppingList";
import { useShoppingListStore } from "./stores/shoppingListStore";
import type { NewShoppingListItem } from "./types/ShoppingListItem";

export function App() {
  const [addModalOpen, setAddModalOpen] = useState(false);

  const items = useShoppingListStore((s) => s.items);
  const addItem = useShoppingListStore((s) => s.addItem);
  const deleteItem = useShoppingListStore((s) => s.deleteItem);
  const toggleCompleted = useShoppingListStore((s) => s.toggleCompleted);

  function handleAddItem(payload: NewShoppingListItem) {
    addItem(payload);
    setAddModalOpen(false);
  }

  const visibleItems = items.filter((item) => !item.deleted);
  const visibleListTotal = visibleItems.reduce(
    (sum, item) => sum + item.price,
    0,
  );

  return (
    <main className="min-h-screen bg-[var(--color-page)] text-[var(--color-text)]">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col p-6 md:p-10">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-2 text-[var(--color-accent)]">
            <h1 className="text-3xl font-bold tracking-tight ">
              MyShopping  
            </h1>
            <ShoppingBasket className="h-10 w-10" />
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
        <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,20rem)] lg:items-start">
          <ShoppingList
            items={visibleItems}
            onDeleteItem={deleteItem}
            onToggleCompleted={toggleCompleted}
          />
          <Budget visibleListTotal={visibleListTotal} />
        </div>
      </section>
    </main>
  )
}
