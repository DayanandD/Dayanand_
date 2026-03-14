import { useState, useEffect } from "react";
import Navbar     from "./components/layout/Navbar.jsx";
import Footer     from "./components/layout/Footer.jsx";
import Hero       from "./components/sections/Hero.jsx";
import About      from "./components/sections/About.jsx";
import Skills     from "./components/sections/Skills.jsx";
import Projects   from "./components/sections/Projects.jsx";
import Experience from "./components/sections/Experience.jsx";
import Contact    from "./components/sections/Contact.jsx";
import { BackToTop } from "./components/ui/index.jsx";

export default function App() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <>
      <Navbar dark={dark} onToggle={() => setDark(v => !v)} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
