import { SHORTLIST_SELECTION_LIMITS } from "../config/shortlistSelectionMeta";

export type ShortlistCompareFocusTone = "pending" | "ready" | "broad";

export function getSelectionMessage(selectedCount: number, canCompare: boolean): string {
  return canCompare
    ? `${selectedCount} stays selected. Compare is ready.`
    : `${selectedCount} stay${selectedCount === 1 ? "" : "s"} selected. Select at least 2 stays to compare.`;
}

export function getCompareFocusMeta(selectedCount: number): {
  tone: ShortlistCompareFocusTone;
  label: string;
  text: string;
} {
  const focusedMax = SHORTLIST_SELECTION_LIMITS.focusedMax;

  if (selectedCount > focusedMax) {
    return {
      tone: "broad",
      label: `Broad compare set: ${selectedCount} stays`,
      text: `Compare is available, but review is usually clearest with 2–${focusedMax} stays. The current chip order is your priority order.`,
    };
  }

  if (selectedCount >= 2) {
    return {
      tone: "ready",
      label: `Focused compare set: ${selectedCount} stays`,
      text: "Selection is in a focused range for side-by-side compare.",
    };
  }

  return {
    tone: "pending",
    label: `Compare not ready: ${selectedCount} selected`,
    text: "Select at least 2 stays to activate compare.",
  };
}

export function getPriorityPairLabels<T>(
  items: T[],
  resolveLabel: (item: T, index: number) => string,
): string[] {
  return items.slice(0, 2).map((item, index) => resolveLabel(item, index));
}

export function getShortlistSelectionView<T>({
  selectedItems,
  resolveLabel,
}: {
  selectedItems: T[];
  resolveLabel: (item: T, index: number) => string;
}): {
  selectedCount: number;
  canCompare: boolean;
  selectionMessage: string;
  compareFocus: {
    tone: ShortlistCompareFocusTone;
    label: string;
    text: string;
  };
  priorityPairLabels: string[];
  hasPriorityPair: boolean;
} {
  const selectedCount = Array.isArray(selectedItems) ? selectedItems.length : 0;
  const canCompare = selectedCount >= 2;
  const selectionMessage = getSelectionMessage(selectedCount, canCompare);
  const compareFocus = getCompareFocusMeta(selectedCount);
  const priorityPairLabels = getPriorityPairLabels(selectedItems, resolveLabel);

  return {
    selectedCount,
    canCompare,
    selectionMessage,
    compareFocus,
    priorityPairLabels,
    hasPriorityPair: priorityPairLabels.length >= 2,
  };
}
