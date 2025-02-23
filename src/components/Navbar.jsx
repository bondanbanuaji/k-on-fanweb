import { useState, useRef, useEffect } from "react";
import { Link } from "react-scroll";
import gsap from "gsap";
import clsx from "clsx";
import HamburgerButton from "./HamburgerButton";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const NavBar = () => {
    // State dan ref untuk menu hamburger
    const [menuOpen, setMenuOpen] = useState(false);
    const overlayRef = useRef(null);
    const navItemsRef = useRef([]);
    navItemsRef.current = [];

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    // Tambahkan referensi untuk setiap item menu
    const addToRefs = (el) => {
        if (el && !navItemsRef.current.includes(el)) {
            navItemsRef.current.push(el);
        }
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

    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const audioElementRef = useRef(null);

    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev);
        setIsIndicatorActive((prev) => !prev);
    };

    useEffect(() => {
        if (isAudioPlaying) {
            audioElementRef.current.play();
        } else {
            audioElementRef.current.pause();
        }
    }, [isAudioPlaying]);

    return (
        <div className="fixed inset-x-0 z-50">
            <header className="flex items-center justify-between p-4 bg-transparent shadow-sm">
                {/* Bagian kiri: Logo dan tombol Products */}
                <div className="flex items-center gap-4">
                    <img src="/img/logo.png" alt="logo" className="w-10" />
                    <Button
                        id="product-button"
                        title="Products"
                        rightIcon={<TiLocationArrow />}
                        containerClass="animated-button bg-blue-50 hidden md:flex items-center justify-center gap-1"
                    />
                </div>
                {/* Bagian kanan: Tombol audio dan hamburger */}
                <div className="z-50 flex items-center gap-10">
                    <button
                        onClick={toggleAudioIndicator}
                        className="flex items-center mt-5 space-x-1"
                    >
                        <audio
                            ref={audioElementRef}
                            className="hidden"
                            src="/audio/loop.mp3"
                            loop
                        />
                        {[1, 2, 3, 4].map((bar) => (
                            <div
                                key={bar}
                                className={clsx("indicator-line", {
                                    active: isIndicatorActive,
                                })}
                                style={{ animationDelay: `${bar * 0.1}s` }}
                            />
                        ))}
                    </button>
                    <HamburgerButton isOpen={menuOpen} onClick={toggleMenu} />
                </div>
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
                                offset={-64} // sesuaikan offset sesuai tinggi navbar
                                onClick={() => setMenuOpen(false)}
                                className="transition-colors duration-300 cursor-pointer hover:text-gray-500"
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
