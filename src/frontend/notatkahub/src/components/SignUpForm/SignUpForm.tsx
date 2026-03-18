import css from "./SignUpForm.module.css";

const SignUpForm = () => {
  const handleSubmit = () => {};
  return (
    <form action={handleSubmit} className="flex w-full flex-col gap-5">
      <input
        className={css.input}
        name="username"
        type="text"
        placeholder="username"
      />
      <input
        className={css.input}
        name="email"
        type="email"
        placeholder="email@gmail.com"
      />
      <input
        className={css.input}
        name="password"
        type="password"
        placeholder="password"
      />
      <button className={css.submit_button} type="submit">
        Continue
      </button>
    </form>
  );
};

export default SignUpForm;
