import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { CashTime } from "./pages/CashTime";
import Register from "./pages/Registro";
import Recuperar from "./pages/Recuperar";
import ResgateCard from "./pages/ResgateCard";
import { EventsPage } from "./pages/Events";
import { Error } from "./pages/Error";
import { Post } from "./pages/Post";
import LanguageDetector from "./components/LanguageDetector";
import useCookieStore from "./store/cookieStore";
import { useEffect } from "react";


function App() {
  const { generateCookie } = useCookieStore();

  useEffect(() => {
    generateCookie();
  }, []);
  
  return (
    <>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cashtime" element={<CashTime />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password" element={<Recuperar />} />
            <Route path="/recharge" element={<ResgateCard />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="*" element={<Error />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
