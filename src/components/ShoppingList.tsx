import type { ShoppingListItem } from "../types/ShoppingListItem";

type ShoppingListProps = {
  items: ShoppingListItem[];
};

export function ShoppingList({ items }: ShoppingListProps) {
  return (
    <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm md:p-6">
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
            <span
              className={`font-medium ${
                item.completed
                  ? "text-[var(--color-text-disabled)]"
                  : "text-[var(--color-text)]"
              }`}
            >
              {item.name}
            </span>
            <span
              className={`font-semibold ${
                item.completed
                  ? "text-[var(--color-text-disabled)]"
                  : "text-[var(--color-accent)]"
              }`}
            >
              £{item.price.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
