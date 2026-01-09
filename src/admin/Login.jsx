import AuthContext from "../context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";


const Login = () => {
  const { signInUser, loading } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  // FIX 1: Add 'return' so React stops here while loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: "Login Successful",
          text: "Redirecting to Dashboard...",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        // Redirect after delay
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1500);

        // FIX 2: Correct setTimeout syntax for form reset
        setTimeout(() => {
          form.reset();
        }, 1500);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: err.message,
        });
        setError(err.message);
        setTimeout(() => {
          form.reset();
        }, 1500);
        window.location.reload();
      });
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse items-center max-w-4xl">
          <div className="text-center lg:text-left w-full lg:w-1/2">

          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
              <form className="fieldset" onSubmit={handleLogin}>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Email"
                  name="email"
                  required
                />

                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="Password"
                  name="password"
                  required
                />

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <div className="form-control mt-6">
                  <button className="btn btn-neutral">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
