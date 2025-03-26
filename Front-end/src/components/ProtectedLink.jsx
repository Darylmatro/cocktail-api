import { Link, useNavigate } from "react-router-dom";

function ProtectedLink({ to, children }) {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const handleClick = (e) => {
    if (!user) {
      e.preventDefault();
      alert("Vous devez être connecté pour accéder à cette fonctionnalité");
      navigate("/login");
    }
  };

  return (
    <Link to={to} onClick={handleClick}>
      {children}
    </Link>
  );
}

export default ProtectedLink;
