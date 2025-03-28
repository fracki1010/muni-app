import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MuniApp } from "./MuniApp";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { HeroUIProvider, ToastProvider } from "@heroui/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider placement="top-right"/>

      <Provider store={store}>
        <BrowserRouter>
          <main className="dark text-foreground bg-background">
            <MuniApp />
          </main>
        </BrowserRouter>
      </Provider>
    </HeroUIProvider>
  </StrictMode>
);
