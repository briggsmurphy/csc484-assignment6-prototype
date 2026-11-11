import headerLine from "../assets/figma/header-line.svg";
import "./PageHeader.css";

function PageHeader({ title, action }) {
  return (
    <header className={action ? "page-header page-header--with-action" : "page-header"}>
      {action && <div className="page-header__action">{action}</div>}
      <h1 className="page-header__title">{title}</h1>
      <img className="page-header__line" src={headerLine} alt="" />
    </header>
  );
}

export default PageHeader;
