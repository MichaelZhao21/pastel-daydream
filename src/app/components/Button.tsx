import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
    onClick: () => void;
    children: ReactNode;
    className?: string;
}

// Outlined button
export default function Button(props: ButtonProps) {
    return (
        <button
            className={twMerge(
                "border-2 border-purple text-purple p-2 rounded-md duration-400 hover:bg-pink/20 hover:border-pink hover:text-pink py-1 px-4 focus:bg-pink/20 focus:border-pink focus:text-pink duration-200 focus:outline-none",
                props.className
            )}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}
