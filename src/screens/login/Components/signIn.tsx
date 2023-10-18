import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signInAction } from "../../../app/authSlice";
import { REGEX_EMAIL } from "../../../constant";
import { LoginForm } from "../../../models/user";

function SignInComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const dispatch = useDispatch();

  const _onSubmit = handleSubmit((data: LoginForm) => {
    dispatch(signInAction(data) as any);
  });
  return (
    <div className="form-container sign-in-container">
      <form onSubmit={_onSubmit}>
        <h1>SCHEDULE - Đăng nhập</h1>
        <input
          placeholder="username"
          className={errors.username?.message ? "error" : ""}
          {...register("username", {
            required: { value: true, message: "username không được để trống" },
            // pattern: {
            //   value: REGEX_EMAIL,
            //   message: "Định dạng email không chính xác",
            // },
          })}
        />
        <span className="message-error">{errors.username?.message}</span>
        <input
          type="password"
          className={errors.password?.message ? "error" : ""}
          placeholder="Password"
          {...register("password", {
            required: {
              value: true,
              message: "Mật khẩu không được để trống",
            },
            minLength: {
              value: 6,
              message: "Password phải có ít nhất 6 kí tự",
            },
          })}
        />
        <span className="message-error">{errors.password?.message}</span>
        {/* <a className="textForgot" href="/login">
          Quên mật khẩu?
        </a> */}
        <button>Đăng nhập</button>
      </form>
    </div>
  );
}

export default SignInComponent;
