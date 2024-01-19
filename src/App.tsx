import MainLayout from "./components/layout/MainLayout";
import RequireAuth from "./components/shared/authentication/RequireAuth/RequireAuth";

function App() {
  return (
    <RequireAuth>
      <MainLayout />
    </RequireAuth>
  );
}

export default App;
