import type { ShoppingListItem } from "../types/ShoppingListItem";
import { Trash2 } from "lucide-react";

type ShoppingListProps = {
  items: ShoppingListItem[];
  onDeleteItem: (id: string) => void;
  onToggleCompleted: (id: string) => void;
};

export function ShoppingList({
  items,
  onDeleteItem,
  onToggleCompleted,
}: ShoppingListProps) {
  return (
    <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm md:p-6">
      {items.length === 0 ? (
        <p className="mt-4 text-[var(--color-text-muted)]">No items in your list.</p>
      ) : (
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className={`flex items-center justify-between rounded-md border px-4 py-3 ${
              item.completed
                ? "border-[var(--color-border-disabled)] bg-[var(--color-surface-disabled)]"
                : "border-[var(--color-border)] bg-[var(--color-surface-muted)]"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => onToggleCompleted(item.id)}
                aria-label={
                  item.completed
                    ? `Mark ${item.name} as not done`
                    : `Mark ${item.name} as done`
                }
                className="h-4 w-4 rounded border-[var(--color-border)] accent-[var(--color-accent)]"
              />
              <span
                className={`font-medium ${
                  item.completed
                    ? "text-[var(--color-text-disabled)]"
                    : "text-[var(--color-text)]"
                }`}
              >
                {item.name}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`font-semibold ${
                  item.completed
                    ? "text-[var(--color-text-disabled)]"
                    : "text-[var(--color-accent)]"
                }`}
              >
                £{item.price.toFixed(2)}
              </span>
              <button
                type="button"
                aria-label={`Remove ${item.name}`}
                onClick={() => onDeleteItem(item.id)}
                className={`rounded p-1 transition-colors ${
                  item.completed
                    ? "text-[var(--color-text-disabled)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"
                }`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      )}
    </section>
  );
}
