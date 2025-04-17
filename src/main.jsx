import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemProvider } from "./Context/Theme";
import { Toaster } from "./components/ui/toaster";
import ProfileContext from "./Context/ProfileContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // retry: 1,
      // staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    
    <ProfileContext>
      <ThemProvider>
        <App />
        <Toaster />
      </ThemProvider>
    </ProfileContext>
  </QueryClientProvider>
);
