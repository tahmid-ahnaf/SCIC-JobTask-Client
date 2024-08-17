import { Button, Card, Label, TextInput } from "flowbite-react";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    signIn(email, password)
      .then((result) => {
        toast.success("User Logged In Successfully.", {
          position: "top-right",
          onClose: () => {
            navigate(from, { replace: true });
          },
        });
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/invalid-credential).") {
          toast.error("Invalid email address or password.", {
            position: "top-right",
          });
        }
      });
  };

  return (
    <div className="flex flex-col md:flex-row mt-20 mb-20 justify-center gap-8 mx-auto max-w-[90%] ">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <div className="flex items-center ">
        <img
          className="h-[400px]"
          src="https://i.ibb.co/tcVfqxK/Humaaans-3-Characters.png"
          alt=""
        />
      </div>

      <Card className="md:w-[40%]">
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          

          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="name@staffsphere.com"
              required
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput id="password" type="password" required />
          </div>

          <Button type="submit">Login</Button>
        </form>
        <p className="md:text-lg text-center mb-4">
          Do not have an account?{" "}
          <Link className="font-semibold" to="/signup">
            Sign Up
          </Link>
        </p>
        <SocialLogin></SocialLogin>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default Login;