import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CatalogLayout from "./layouts/catalog";
import DashboardLayout from "./layouts/dashboard";
import CatalogOnly from "./layouts/catalogOnly";
import DashboardCatalog from "./layouts/dashboardCatalog"




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CatalogLayout />} />
        <Route path="/catalogo/:tipo?" element={<CatalogOnly />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/dashboardCatalog" element={<DashboardCatalog />} />
  
      </Routes>
    </Router>
  );
}

export default App;
