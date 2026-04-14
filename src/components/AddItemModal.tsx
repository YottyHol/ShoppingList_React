import { useEffect, useState, type FormEvent } from "react";
import type { NewShoppingListItem } from "../types/ShoppingListItem";
import { Modal } from "./Modal";

type AddItemModalProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (item: NewShoppingListItem) => void;
};

const inputClassName =
  "mt-1 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2 text-[var(--color-text)] outline-none transition-shadow focus:ring-2 focus:ring-[var(--color-accent)]/30";

export function AddItemModal({ open, onClose, onAdd }: AddItemModalProps) {
  const [name, setName] = useState("");
  const [priceInput, setPriceInput] = useState("");

  useEffect(() => {
    if (!open) return;
    setName("");
    setPriceInput("");
  }, [open]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const price = Number.parseFloat(priceInput);
    if (Number.isNaN(price) || price < 0) return;

    onAdd({ name: trimmedName, price });
  }

  return (
    <Modal open={open} onClose={onClose} title="Add item">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="add-item-name"
            className="text-sm font-medium text-[var(--color-text)]"
          >
            Name
          </label>
          <input
            id="add-item-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
            className={inputClassName}
            required
          />
        </div>
        <div>
          <label
            htmlFor="add-item-price"
            className="text-sm font-medium text-[var(--color-text)]"
          >
            Price (£)
          </label>
          <input
            id="add-item-price"
            type="number"
            min={0}
            step={0.01}
            inputMode="decimal"
            value={priceInput}
            onChange={(e) => setPriceInput(e.target.value)}
            className={inputClassName}
            required
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface-muted)]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
}
