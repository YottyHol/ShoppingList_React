import { useId, useState } from "react";

type BudgetProps = {
  visibleListTotal: number;
};

export function Budget({ visibleListTotal }: BudgetProps) {
  const [budgetInput, setBudgetInput] = useState("");
  const fieldId = useId();
  const statusId = useId();

  const budget = Number.parseFloat(budgetInput);
  const budgetValid = !Number.isNaN(budget) && budget >= 0;
  const isOver = budgetValid && visibleListTotal > budget;
  const overBy = budgetValid ? Math.max(0, visibleListTotal - budget) : 0;

  return (
    <aside
      className={`w-full max-w-sm rounded-lg border-2 bg-[var(--color-surface)] p-4 shadow-sm transition-colors md:p-6 lg:max-w-xs ${
        isOver
          ? "border-[var(--color-border-danger)]"
          : "border-[var(--color-border)]"
      }`}
      aria-describedby={isOver ? statusId : undefined}
    >
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Budget</h2>
      <div className="mt-4">
        <label
          htmlFor={fieldId}
          className="text-sm font-medium text-[var(--color-text)]"
        >
          Your budget (£)
        </label>
        <input
          id={fieldId}
          type="number"
          min={0}
          step={0.01}
          inputMode="decimal"
          value={budgetInput}
          onChange={(e) => setBudgetInput(e.target.value)}
          className="mt-1 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2 text-[var(--color-text)] outline-none transition-shadow focus:ring-2 focus:ring-[var(--color-accent)]/30"
        />
      </div>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-[var(--color-text-muted)]">
            Current shopping list
          </dt>
          <dd className="font-semibold tabular-nums text-[var(--color-text)]">
            £{visibleListTotal.toFixed(2)}
          </dd>
        </div>
        {budgetValid ? (
          <div className="flex justify-between gap-4">
            <dt className="text-[var(--color-text-muted)]">Remaining</dt>
            <dd
              className={`font-semibold tabular-nums ${
                isOver
                  ? "text-[var(--color-danger)]"
                  : "text-[var(--color-accent)]"
              }`}
            >
              £{(budget - visibleListTotal).toFixed(2)}
            </dd>
          </div>
        ) : null}
      </dl>

      {isOver ? (
        <p
          id={statusId}
          className="mt-3 text-sm font-medium text-[var(--color-danger)]"
          role="status"
          aria-live="polite"
        >
          Over budget by £{overBy.toFixed(2)}
        </p>
      ) : null}
    </aside>
  );
}
