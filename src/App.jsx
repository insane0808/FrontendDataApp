import './App.css'
import Login from "./pages/login"
import Home from "./pages/home"
import Watchlist from "./pages/watchlist"
import ESMTNT from "./pages/esmtnt"
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom"
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from "./components/ui/error-boundary";
import { lazy, Suspense, useEffect } from "react";
import Loader from "./components/ui/loader";
import { GlobalState } from "./context/global-context";
import Navbar from './components/ui/navbar'
import GlobalProvider from './context/global-context'


function App() {
  const { token } = GlobalState();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (token && pathname == "/") {
      navigate('/home')
    }
  }, [navigate, pathname, token])

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }} >
      <Suspense fallback={<Loader />}>
        {token && (
          <Navbar />
        )}
        <div className = "h-80">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} exact />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/esmtnt" element={<ESMTNT />} />
          </Routes>
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
