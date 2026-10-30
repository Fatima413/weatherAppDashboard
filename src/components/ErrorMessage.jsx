export default function ErrorMessage({ message }) {
  return <p className="status-message error" role="alert">{message}</p>;
}
