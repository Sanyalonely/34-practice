import SignUpForm from "#/components/SignUpForm/SignUpForm";
import Logo from "#/components/Logo/Logo";
import ThemeSwitcher from "#/components/ThemeSwitcher/ThemeSwitcher";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      {windowWidth < 1280 ? (
        <div className="flex flex-col items-center p-5">
          <Logo />
          <div className="absolute bottom-2.5">
            <ThemeSwitcher />
          </div>
        </div>
      ) : (
        <div className="flex flex-row justify-between p-5">
          <Logo />
          <ThemeSwitcher />
        </div>
      )}

      {/* */}
      <div className="absolute top-1/2 left-1/2 flex min-w-[300px] -translate-x-1/2 -translate-y-1/2 flex-col content-center items-center justify-center gap-3 max-xl:max-w-[550px] xl:w-[550px]">
        <div className="flex flex-col items-center">
          <h1 className="text-base font-extrabold dark:text-[var(--color-primary-dark)]">
            Create an account
          </h1>
          <p className="text-sm font-light dark:text-[var(--color-primary-dark)]">
            Enter your email to sign up for this app
          </p>
        </div>
        <SignUpForm />
        <div className="flex flex-col items-center justify-center text-center max-xl:gap-[5px] xl:gap-[10px]">
          <p className="font-regular text-sm dark:text-[var(--color-secondary-dark)]">
            Have an account?{" "}
            <Link to="/login" className="font-medium">
              Log in
            </Link>
          </p>
          <p className="font-regular text-sm dark:text-[var(--color-secondary-dark)]">
            By clicking continue, you agree to our{" "}
            <a
              href="https://policies.google.com/terms?hl=en-US"
              className="font-medium dark:text-[var(--color-primary-dark)]"
              target="_blank"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="https://policies.google.com/privacy?hl=en-US"
              className="font-medium dark:text-[var(--color-primary-dark)]"
              target="_blank"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
