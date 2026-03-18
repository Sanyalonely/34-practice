import "../styles/fonts.css";
import Header from "#/components/Header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <>
      <Header></Header>
      <main></main>
    </>
  );
}
