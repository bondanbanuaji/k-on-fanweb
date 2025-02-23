import clsx from "clsx";

const Button = ({ id, title, rightIcon, leftIcon, containerClass }) => {
    return (
        <>
            <button
                id={id}
                className={clsx(
                    "group relative z-10 w-fit cursor-pointer overflow-hidden bg-violet-50 px-7 py-3 text-black rounded-md transform transition-all duration-500 ease-in-out",
                    containerClass
                )}
            >
                {leftIcon}
                <span className="relative inline-flex overflow-hidden text-sm font-bold uppercase font-general">
                    <div className="translate-y-0 skew-y-0 transition duration-330 group-hover:translate-y-[-160%] group-hover:skew-y-12">
                        {title}
                    </div>
                    <div className="absolute translate-y-[164%] skew-y-12 transition duration-330 group-hover:translate-y-0 group-hover:skew-y-0">
                        {title}
                    </div>
                </span>
                {rightIcon}
            </button>
            <style jsx>{`
                .animated-button {
                    transition: all 0.3s ease-in-out;
                }

                .animated-button:hover {
                    transform: perspective(2900px) rotateX(19deg) rotateY(19deg);
                }
            `}</style>
        </>
    );
};

export default Button;
