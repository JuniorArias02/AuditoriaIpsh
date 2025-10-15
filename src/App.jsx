import { Routes, Route } from "react-router-dom";
import PAGES_ROUTES from "./routes/routers";
import MainLayout from "./layout/MainLayout";
import { privateRoutes } from "./routes/PrivateRoutes";
import { FormLogin } from "./pages/login/FormLogin";
import ProtectedRoute from "./protectRoute/ProtectedRoute";
import Error404 from "./pages/Errors/Error404";

function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path={PAGES_ROUTES.LOGIN} element={<FormLogin />} />

      {/* Rutas privadas dentro de un solo layout */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Routes>
                {privateRoutes.map(({ path, element }) => (
                  <Route key={path} path={path} element={element} />
                ))}

                {/* Página 404 dentro del layout */}
                <Route path="*" element={<Error404 />} />
              </Routes>
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
