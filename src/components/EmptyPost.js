export default function EmptyPost({ errorMsg }) {
  return (
    <div className="empty-state">
      <div className="empty-state__content">
        <div className="empty-state__message">No Posts Found.</div>
        <div className="empty-state__help">{errorMsg ? errorMsg : ""}</div>
      </div>
    </div>
  );
}