import { useState, useRef, useEffect } from "react";
import { Link } from "react-scroll";
import gsap from "gsap";
import HamburgerButton from "./HamburgerButton";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const overlayRef = useRef(null);
    const navItemsRef = useRef([]);
    navItemsRef.current = [];

    // Tambahkan referensi untuk setiap item menu
    const addToRefs = (el) => {
        if (el && !navItemsRef.current.includes(el)) {
            navItemsRef.current.push(el);
        }
    };

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    // Animasi overlay menu dan item navigasi menggunakan gsap
    useEffect(() => {
        if (menuOpen) {
            gsap.to(overlayRef.current, {
                duration: 0.5,
                opacity: 1,
                display: "flex",
                ease: "power2.out",
                onStart: () => {
                    overlayRef.current.style.pointerEvents = "auto";
                },
            });
            gsap.from(navItemsRef.current, {
                duration: 0.5,
                y: 20,
                opacity: 0,
                stagger: 0.1,
                ease: "power2.out",
            });
        } else {
            gsap.to(overlayRef.current, {
                duration: 0.5,
                opacity: 0,
                display: "none",
                ease: "power2.in",
                onComplete: () => {
                    overlayRef.current.style.pointerEvents = "none";
                },
            });
        }
    }, [menuOpen]);

    return (
        <div className="fixed inset-x-0 z-50">
            <header className="flex items-center justify-between p-4 bg-transparent shadow-lg">
                <div className="flex items-center gap-4">
                    <img src="/img/logo.png" alt="logo" className="w-10" />
                    <Button
                        id="product-button"
                        title="Products"
                        rightIcon={<TiLocationArrow />}
                        containerClass="bg-blue-50 hidden md:flex items-center justify-center gap-1"
                    />
                </div>
                <HamburgerButton isOpen={menuOpen} onClick={toggleMenu} />
            </header>

            {/* Overlay menu */}
            <div
                ref={overlayRef}
                className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80"
                style={{ opacity: 0, display: "none", pointerEvents: "none" }}
            >
                <ul className="space-y-6 text-3xl text-white">
                    {navItems.map((item, index) => (
                        <li key={index} ref={addToRefs}>
                            <Link
                                to={item.toLowerCase()}
                                smooth={true}
                                duration={800}
                                offset={-64} // sesuaikan offset dengan tinggi navbar
                                onClick={() => setMenuOpen(false)}
                                className="transition-colors duration-300 cursor-pointer hover:text-gray-300"
                            >
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default NavBar;
