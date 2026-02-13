import { useEffect, useState } from "react";
import { getAvatar, subscribe } from "../store/userStore";

export default function useAvatar() {
    const [avatar, setAvatarState] = useState(
        getAvatar() || localStorage.getItem("avatar") || ""
    );

    useEffect(() => {
        return subscribe(setAvatarState);
    }, []);

    return avatar;
}
