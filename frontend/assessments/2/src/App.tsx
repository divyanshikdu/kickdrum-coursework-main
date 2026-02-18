import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import StatusPage from "./pages/StatusPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/status/:id" element={<StatusPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App 