import { twMerge } from "tailwind-merge";
import { jua } from "./fonts";

export default function Text({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <p className={twMerge("lg:text-lg text-purple mb-4", jua.className, className)}>
            {children}
        </p>
    );
}
