import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HospitalsPage from "./pages/HospitalsPage";
import AdsPage from "./pages/AdsPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-green-600 text-white p-4 flex justify-between">
          <h1 className="text-xl font-bold">Hospital Admin Panel</h1>
          <nav>
            <Link className="mr-4 hover:underline" to="/">Hospitals</Link>
          </nav>
        </header>
        <main className="p-4">
          <Routes>
            <Route path="/" element={<HospitalsPage />} />
            <Route path="/hospital/:id/ads" element={<AdsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;