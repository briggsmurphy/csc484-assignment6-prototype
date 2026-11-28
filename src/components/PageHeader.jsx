import "./PageHeader.css";

function PageHeader({ title, action }) {
  return (
    <header className="page-header">
      <div className="page-header__action">{action}</div>
      <h1 className="page-header__title">{title}</h1>
      <div className="page-header__spacer" aria-hidden="true" />
    </header>
  );
}

export default PageHeader;
