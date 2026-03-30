export default function Badge({ type, children, ...rest }) {
  return (
    <div>
      <div className={`cursor-pointer badge badge-${type}`} {...rest}>
        {children}
      </div>
    </div>
  );
}
