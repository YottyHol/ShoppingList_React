import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NewShoppingListItem, ShoppingListItem } from "../types/ShoppingListItem";
import { mockShoppingItems } from "../utils/mockShoppingItems";

type ShoppingListState = {
  items: ShoppingListItem[];
  addItem: (input: NewShoppingListItem) => void;
  deleteItem: (id: string) => void;
  toggleCompleted: (id: string) => void;
};

export const useShoppingListStore = create<ShoppingListState>()(
  persist(
    (set) => ({
      items: [...mockShoppingItems],
      addItem: (input) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              id: crypto.randomUUID(),
              name: input.name,
              price: input.price,
              completed: false,
              deleted: false,
            },
          ],
        })),
      deleteItem: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, deleted: true } : item,
          ),
        })),
      toggleCompleted: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, completed: !item.completed } : item,
          ),
        })),
    }),
    {
      name: "mayden-shopping-list",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
