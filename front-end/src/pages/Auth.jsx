import Register from "../components/Register";
import Login from "../components/Login";

function Auth() {
  return (
    <section>
      <div>
        <h1>Inscription / connexion</h1>
        <Register />
        <Login />
      </div>
    </section>
  );
}

export default Auth;
