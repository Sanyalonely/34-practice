import Logo from "./Logo/Logo";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-b-neutral-300 bg-gray-200 px-[15px] py-[10px]">
      <svg height={20} width={30}>
        <use href="/burger.svg" />
      </svg>
      <Logo />
      <svg width={45} height={45}>
        <use href="/account.svg" />
      </svg>
    </header>
  );
}
