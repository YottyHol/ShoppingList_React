import { ShoppingList } from "./components/ShoppingList";
import { mockShoppingItems } from "./utils/mockShoppingItems";

export function App() {
  return (
    <main className="min-h-screen bg-[var(--color-page)] text-[var(--color-text)]">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col p-6 md:p-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-accent)]">
            My Shopping List
          </h1>
          <p className="mt-2 text-[var(--color-text-muted)]">
          </p>
        </header>
        <ShoppingList items={mockShoppingItems} />
      </section>
    </main>
  )
}
