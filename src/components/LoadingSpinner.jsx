export default function LoadingSpinner({ message }) {
  return (
    <div className="status-message loading" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
