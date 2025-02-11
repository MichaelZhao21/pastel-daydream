import { User } from "./User";
import { jua } from "./fonts";

interface AdminEntryProps {
    user: User;
    expanded: boolean;
    setExpanded: (expanded: boolean) => void;
}

export default function AdminEntry({
    user,
    expanded,
    setExpanded,
}: AdminEntryProps) {
    const rsvp = user.rsvp === "yes" ? "Y" : user.rsvp === "no" ? "N" : "M";
    const rsvpColor =
        user.rsvp === "yes"
            ? "text-yes"
            : user.rsvp === "no"
            ? "text-no"
            : "text-maybe";
    const paid = user.paid === "yes" ? "$$" : user.paid === "no" ? "$X" : "$B";
    const paidColor =
        user.paid === "yes"
            ? "text-yes"
            : user.paid === "no"
            ? "text-no"
            : "text-blue";

    return (
        <div
            className={`${jua.className} w-full cursor-pointer`}
            onClick={() => setExpanded(!expanded)}
        >
            <div className="flex justify-between items-start text-left text-xl">
                <h2 className="grow pr-2">{user.name}</h2>
                <p className={`${paidColor} mr-4`}>{paid}</p>
                <p className={`${rsvpColor}`}>{rsvp}</p>
            </div>
            {expanded && (
                <div className="text-left text-sm text-black">
                    <p>
                        {user.email} | {user.phone}
                    </p>
                    {user.relation && user.relation !== "" && (
                        <p>
                            <span className="text-blue">rel: </span>
                            {user.relation}
                        </p>
                    )}
                    {user.bringing && user.bringing !== "" && (
                        <p>
                            <span className="text-blue">br: </span>
                            {user.bringing}
                        </p>
                    )}
                    {user.music && user.music !== "" && (
                        <p>
                            <span className="text-blue">mus: </span>
                            {user.music}
                        </p>
                    )}
                    {user.notes && user.notes !== "" && (
                        <p>
                            <span className="text-blue">note: </span>
                            {user.notes}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
