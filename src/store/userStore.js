let avatar = "";
let listeners = [];

export function getAvatar() {
    return avatar;
}

export function setAvatar(newAvatar) {
    avatar = newAvatar;
    localStorage.setItem("avatar", newAvatar || "");

    listeners.forEach(fn => fn(avatar));
}

export function subscribe(fn) {
    listeners.push(fn);
    return () => {
        listeners = listeners.filter(l => l !== fn);
    };
}
