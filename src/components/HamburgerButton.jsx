import { useRef, useEffect } from "react";
import gsap from "gsap";
import clsx from "clsx";

const HamburgerButton = ({ isOpen, onClick }) => {
    const topBar = useRef(null);
    const middleBar = useRef(null);
    const bottomBar = useRef(null);

    useEffect(() => {
        if (isOpen) {
            // Animasi untuk membuka menu: ubah hamburger menjadi X
            gsap.to(topBar.current, { rotation: 45, y: 8, duration: 0.5, ease: "power2.inOut" });
            gsap.to(middleBar.current, { opacity: 0, duration: 0.7, translateX: 120, ease: "power2.inOut" });
            gsap.to(bottomBar.current, { rotation: -45, y: -8, duration: 0.5, ease: "power2.inOut" });
        } else {
            // Animasi untuk menutup menu: kembalikan ke bentuk hamburger
            gsap.to(topBar.current, { rotation: 0, y: 0, duration: 0.5, ease: "power2.inOut" });
            gsap.to(middleBar.current, { opacity: 1, duration: 0.7, translateX: 0, ease: "power2.inOut" });
            gsap.to(bottomBar.current, { rotation: 0, y: 0, duration: 0.5, ease: "power2.inOut" });
        }
    }, [isOpen]);

    return (
        <button onClick={onClick} className="relative z-50 w-10 h-10 focus:outline-none">
            <span
                ref={topBar}
                className={clsx("block bg-white h-0.5 w-full absolute", "top-2")}
            ></span>
            <span
                ref={middleBar}
                className={clsx("block bg-white h-0.5 w-full absolute", "top-4")}
            ></span>
            <span
                ref={bottomBar}
                className={clsx("block bg-white h-0.5 w-full absolute", "top-6")}
            ></span>
        </button>
    );
};

export default HamburgerButton;
