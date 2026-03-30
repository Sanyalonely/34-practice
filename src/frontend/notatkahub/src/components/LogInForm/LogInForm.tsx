import css from "./LogInForm.module.css";
import { login } from "#/lib/api/authApi";
import { useUserStore } from "#/lib/store/userStore";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { deviceType, osName, browserName } from "react-device-detect";

const LogInForm = () => {
  const navigation = useNavigate();
  const accessToken = Cookies.get("accessToken");

  const setUserStore = useUserStore((state) => state.setUserStore);

  useEffect(() => {
    if (accessToken) {
      navigation({ to: "/" });
    }
  }, []);

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const userDeviceType = deviceType;
    const userOsName = osName;
    const userBrowserName = browserName;

    const user = {
      email,
      password,
      device: `${userDeviceType} ${userOsName} ${userBrowserName}`,
    };
    try {
      const responce = await login(user);
      setUserStore({
        username: responce.user.username,
        email: responce.user.email,
      });
      toast.success("Big success!");
      Cookies.set("accessToken", responce.accesToken);
      await navigation({ to: "/" });
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <form action={handleSubmit} className="flex w-full flex-col gap-5">
      <input
        className={css.input}
        name="email"
        type="email"
        placeholder="email@gmail.com"
        maxLength={100}
      />
      <input
        className={css.input}
        name="password"
        type="password"
        placeholder="password"
        maxLength={20}
      />
      <button className={css.submit_button} type="submit">
        Continue
      </button>
    </form>
  );
};

export default LogInForm;
