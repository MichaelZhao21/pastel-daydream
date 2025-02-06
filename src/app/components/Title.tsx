import { twMerge } from "tailwind-merge";
import { amaticSC } from "./fonts";

export default function Title({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <h1
            className={twMerge(
                "font-bold text-5xl mb-4 text-blue",
                amaticSC.className,
                className
            )}
        >
            {children}
        </h1>
    );
}
