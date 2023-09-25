
import { toast } from "react-toastify";

function SignUpComponent() {
  const showToast = () => {
    toast("SignUpComponent!");
  };
  return (
    <div className="form-container sign-up-container">
      <form>
        <h1>Create Account</h1>
        <div className="social-container">
          <a href="fb.com" className="social">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="gg.com" className="social">
            <i className="fab fa-google-plus-g"></i>
          </a>
          <a href="ln.com" className="social">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
        <span>or use your email for registration</span>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button onClick={showToast}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpComponent;
