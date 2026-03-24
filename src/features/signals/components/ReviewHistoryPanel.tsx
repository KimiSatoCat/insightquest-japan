import type { ReviewHistoryEntry } from "../types";

interface ReviewHistoryPanelProps {
  reviewHistory?: ReviewHistoryEntry[];
}

export default function ReviewHistoryPanel({
  reviewHistory,
}: ReviewHistoryPanelProps) {
  if (!reviewHistory || reviewHistory.length === 0) {
    return null;
  }

  return (
    <section className="stay-panel">
      <h2 className="stay-panel-title">Review history</h2>

      <div className="review-history-list">
        {reviewHistory.map((entry, index) => (
          <article
            key={`${entry.date}-${entry.change}-${index}`}
            className="review-history-item"
          >
            <p className="review-history-date">{entry.date}</p>
            <p className="review-history-change">{entry.change}</p>
            {entry.editorNote ? (
              <p className="review-history-note">{entry.editorNote}</p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}