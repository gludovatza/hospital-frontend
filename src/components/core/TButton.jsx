import { Link } from "react-router-dom";

export default function TButton({
    color = "indigo",
    to = "",
    circle = false,
    href = "",
    link = false,
    target = "_blank",
    onClick = () => { },
    className = "",
    children,
}) {
    let classes = [
        "flex",
        "items-center",
        "whitespace-nowrap",
        "text-base",
        "border",
        "border-2",
        "border-transparent",
    ];

    if (link) {
        classes = [...classes, "transition-colors"];

        switch (color) {
            case "indigo":
                classes = [...classes, "text-indigo-500", "focus:border-indigo-500"];
                break;
            case "red":
                classes = [...classes, "text-red-500", "focus:border-red-500"];
            case "blue":
                classes = [...classes, "text-blue-500", "focus:border-blue-500", "w-3"];
        }
    } else {
        classes = [...classes, "text-white", "focus:ring-2", "focus:ring-offset-2"];

        switch (color) {
            case "gray":
                classes = [
                    ...classes,
                    "bg-gray-600",
                    "hover:bg-gray-700",
                    "focus:ring-gray-500",
                ];
                break;
            case "red":
                classes = [
                    ...classes,
                    "bg-red-600",
                    "hover:bg-red-700",
                    "focus:ring-red-500",
                ];
                break;
            case "green":
                classes = [
                    ...classes,
                    "bg-emerald-500",
                    "hover:bg-emerald-600",
                    "focus:ring-emerald-400",
                ];
                break;
        }
    }

    if (circle) {
        classes = [
            ...classes,
            "h-8",
            "w-8",
            "items-center",
            "justify-center",
            "rounded-full",
            "text-base",
        ];
    } else {
        classes = [...classes, "p-0", "py-2", "px-4", "rounded-md"];
    }

    if (color == "edit") {
        classes = [
            ...classes,
            "h-10",
            "w-36",
            "px-2",
            "py-4",
            "items-center",
            "justify-center",
            "rounded-full",
            "text-base",
            "bg-blue-500",
            "hover:bg-blue-600",
            "focus:ring-blue-400",
        ];
    }


    if (color == "delete") {
        classes = [
            ...classes,
            "h-10",
            "w-36",
            "px-2",
            "py-4",
            "items-center",
            "justify-center",
            "rounded-full",
            "text-base",
            "bg-rose-500",
            "hover:bg-rose-600",
            "focus:ring-rose-400",
        ];
    }

    return (
        <>
            {href && (
                <a href={href} className={classes.join(" ")} target={target}>
                    {children}
                </a>
            )}
            {to && (
                <Link to={to} className={classes.join(" ")}>
                    {children}
                </Link>
            )}
            {!to && !href && (
                <button onClick={onClick} className={classes.join(" ")}>{children}</button>
            )}
        </>
    );
}
