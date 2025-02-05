import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profil from "./pages/Profil";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow p-6">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/profil" element={<Profil />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;