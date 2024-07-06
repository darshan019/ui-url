import { Outlet } from 'react-router-dom'
import Navigation from './components/Navigation'
import AuthProvider from './components/TokenAndUser'

function App() {

  return (
    <>
      <AuthProvider>
        <Navigation />
        <Outlet />
      </AuthProvider>
    </>
  )
}

export default App
