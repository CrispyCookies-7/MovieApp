import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";

import { MainPage, FilmPage } from "./pages";

export function App() {
  return (
    <main>
      <motion.div
        className="min-h-screen bg-gray-400 px-4 py-14 md:px-10"
        animate={{ backgroundColor: "#2f3b6d" }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <Routes>
          <Route path="/*" element={<MainPage />} />
          <Route path="/:id" element={<FilmPage />} />
        </Routes>
      </motion.div>
    </main>
  );
}