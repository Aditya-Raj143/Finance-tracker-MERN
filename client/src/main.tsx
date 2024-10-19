import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";

const publishable_Key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!publishable_Key) {
  throw new Error("Missing publishable key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={publishable_Key}>
      <App />
    </ClerkProvider>
  </StrictMode>
);
