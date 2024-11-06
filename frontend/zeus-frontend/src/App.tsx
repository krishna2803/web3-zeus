import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Route, Routes } from "react-router-dom";
import Home from "@/components/pages/home/home";
import CreditScoreTest from "@/components/pages/credit-score-test/credit-score-test";
import Dashboard from "@/components/pages/dashboard/dashboard";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/credit-score-test" element={<CreditScoreTest />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
