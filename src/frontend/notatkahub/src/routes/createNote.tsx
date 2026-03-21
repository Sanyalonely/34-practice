import Header from "#/components/Header";
import Sidebar from "#/components/Sidebar/Sidebar";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/createNote")({
  component: RouteComponent,
});

function RouteComponent() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isModalSidebarOpened, setOpenedModalSidebar] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOpenModalSidebar = () => {
    console.log(isModalSidebarOpened);
    setOpenedModalSidebar(!isModalSidebarOpened);
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header openModalSidebar={handleOpenModalSidebar} />
      <div className="relative flex flex-1">
        {<Sidebar isModalSidebarOpened={isModalSidebarOpened} />}
      </div>
    </div>
  );
}
