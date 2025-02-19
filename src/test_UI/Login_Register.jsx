import { useForm } from "react-hook-form";
import { string, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


function LR() {
  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
  // min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
  const schema = object({
    username: string()
      .required("Name is required")
      .min(3, "Name must be more than 3 character")
      .max(15, "Name must be under 15 characters"),
    email: string().email("Invalid email").required("Email is required"),
    password: string()
      .required("Password is required")
      .matches(passwordRules, { message: "Please create strong password" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    window.alert(`Thank you for registration ${data.username}`);
  };

  return (
    <div className="app">
      <h1 className="mt-2 d-flex flex-center">Registration</h1>
      <div className="line"></div>
      <form
        className="mt-2 d-flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="d-flex">
          <label htmlFor="name" className="label">
            UserName <span>&#58;</span>
          </label>
          <div className="d-flex flex-col input-field">
            <input
              type="text"
              {...register("username")}
              className="input"
              id="name"
            />
            <p className="">{errors.username?.message}</p>
          </div>
        </div>
        <div className="d-flex">
          <label htmlFor="email">
            Email{"  "}
            <span>&#58;</span>
          </label>
          <div className="d-flex flex-col input-field">
            <input
              type="email"
              {...register("email")}
              id="email"
              className="input"
            />
            <p className="">{errors.email?.message}</p>
          </div>
        </div>
        <div className="d-flex">
          <label htmlFor="password">
            Password {"  "}
            <span>&#58;</span>
          </label>
          <div className="d-flex flex-col input-field">
            <input
              type="password"
              {...register("password")}
              id="password"
              className="input"
            />
            <p className="">{errors.password?.message}</p>
          </div>
        </div>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
      <a
        href="https://github.com/MrYogesh0709/registraion-form"
        target="_blank"
        rel="noreferrer"
      >
        <img src={""} alt="github" className="github" />
      </a>
    </div>
  );
}

export default LR;
