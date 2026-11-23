import { Nav } from "./components/Nav"
import { AppRouter } from "./routers/app.routers"
import { AuthProvider } from "./contexts/AuthContext"

function App() {

  return (
    <AuthProvider>
      <Nav/>
      <AppRouter/>
    </AuthProvider>
  )
}

export default App
