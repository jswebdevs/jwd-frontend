import { useState, useEffect } from "react";
import logo from "../assets/img/icon.png";

// 1. DATA: Defined outside the component
const links = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Services", to: "/services" },
  { name: "Projects", to: "/projects" },
  { name: "Reviews", to: "/reviews" },
  { name: "Blog", to: "/blog" },
  { name: "Contact", to: "/contact" },
];

// 2. SUB-COMPONENT
const LinkList = () => {
  return (
    <>
      {links.map((link) => (
        <li key={link.name}>
          <a
            href={link.to}
            className="hover:text-[var(--brand-primary)] focus:text-[var(--brand-primary)] transition-colors duration-200 font-medium hover:scale-105"
          >
            {link.name}
          </a>
        </li>
      ))}
    </>
  );
};

// 3. MAIN COMPONENT
const Header = () => {
  const [theme, setTheme] = useState("light");

  // Initialize theme based on system or previous setting
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    
    // DaisyUI এর জন্য
    document.documentElement.setAttribute("data-theme", savedTheme);
    
    // Tailwind CSS Dark Mode এর জন্য Class add/remove করা
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Theme Toggle Handler
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    // DaisyUI Update
    document.documentElement.setAttribute("data-theme", newTheme);

    // Tailwind CSS Update (AboutPage এ এটি প্রভাব ফেলবে)
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="drawer drawer-end z-50">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Navbar UI */}
      <div className="drawer-content flex flex-col">
        <div className="navbar w-full sticky top-0 bg-[var(--theme-bg)]/90 backdrop-blur-md border-b border-[var(--theme-border)] text-[var(--theme-text-main)] transition-colors duration-300">
          
          {/* Logo / Title */}
          <div className="flex-1 text-xl font-bold font-mono tracking-tighter ps-[5%]">
            <span className="grad-text flex items-center gap-2">
              <img src={logo} alt="JS Web Devs Logo" className="h-16 w-16" /> JS
              Web Devs
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden flex-none lg:block mr-4">
            <ul className="menu menu-horizontal px-1 gap-2">
              <LinkList />
            </ul>
          </div>

          {/* Theme Toggle Button */}
          <div className="flex-none mr-[5%]">
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle text-[var(--theme-text-main)]"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                /* Moon Icon */
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              ) : (
                /* Sun Icon */
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost text-[var(--brand-primary)]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
        </div>
      </div>

      {/* Sidebar Content */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu min-h-full w-80 p-4 bg-[var(--theme-bg-card)] text-[var(--theme-text-main)] border-l border-[var(--theme-border)]">
          <LinkList />
        </ul>
      </div>
    </div>
  );
};

export default Header;