import { TRPCReactProvider } from "@/trpc/react";
import { type ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <TRPCReactProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </TRPCReactProvider>
  );
};

export default Providers;
