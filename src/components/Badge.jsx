export default function Badge({ type, children }) {
  return (
    <div>
      <div className={`badge badge-${type}`}>{children}</div>
    </div>
  );
}
