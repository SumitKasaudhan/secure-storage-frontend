import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    /* LOAD PROFILE */
    const loadProfile = async () => {
        try {
            const res = await api.get("/auth/profile");

            setProfile(res.data);

            // sync avatar to navbar
            localStorage.setItem("avatar", res.data.avatar || "");
            window.dispatchEvent(new Event("avatarUpdated"));

        } catch {
            toast.error("Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    /* CHANGE AVATAR */
    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            const avatar = reader.result;

            const updated = {
                ...profile,
                avatar
            };

            setProfile(updated);

            // 🔥 instant navbar update
            localStorage.setItem("avatar", avatar);
            window.dispatchEvent(new Event("avatarUpdated"));
        };

        reader.readAsDataURL(file);
    };

    /* REMOVE AVATAR */
    const removeAvatar = () => {
        const updated = { ...profile, avatar: "" };

        setProfile(updated);

        localStorage.setItem("avatar", "");
        window.dispatchEvent(new Event("avatarUpdated"));
    };

    /* SAVE PROFILE */
    const saveProfile = async () => {
        try {
            await api.put("/auth/profile", profile);

            localStorage.setItem("avatar", profile.avatar || "");
            window.dispatchEvent(new Event("avatarUpdated"));

            toast.success("Profile updated successfully");
        } catch {
            toast.error("Failed to save profile");
        }
    };

    if (loading) return <div className="p-6">Loading profile...</div>;
    if (!profile) return <div className="p-6">Profile not found</div>;

    return (
        <div className="max-w-3xl mx-auto">

            <h1 className="text-3xl font-bold mb-8">
                Profile Settings
            </h1>

            <div className="bg-card p-6 sm:p-8 rounded-xl space-y-6">

                {/* Avatar */}
                <div className="flex flex-col sm:flex-row items-center gap-6">

                    <div className="relative w-28 h-28">
                        <img
                            src={
                                profile.avatar ||
                                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            }
                            alt="avatar"
                            className="w-28 h-28 rounded-full object-cover border border-gray-700"
                        />

                        <label className="absolute bottom-0 right-0 bg-purple-600 text-white text-xs px-2 py-1 rounded cursor-pointer">
                            Change
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleImage}
                            />
                        </label>
                    </div>

                    {profile.avatar && (
                        <button
                            onClick={removeAvatar}
                            className="bg-red-600 px-4 py-2 rounded text-sm"
                        >
                            Remove Image
                        </button>
                    )}

                </div>

                <input
                    name="name"
                    value={profile.name || ""}
                    onChange={handleChange}
                    className="w-full p-3 bg-black border border-gray-700 rounded"
                />

                <input
                    name="email"
                    value={profile.email || ""}
                    onChange={handleChange}
                    className="w-full p-3 bg-black border border-gray-700 rounded"
                />

                <input
                    name="phone"
                    value={profile.phone || ""}
                    onChange={handleChange}
                    className="w-full p-3 bg-black border border-gray-700 rounded"
                />

                <button
                    onClick={saveProfile}
                    className="bg-purple-600 px-6 py-3 rounded font-semibold"
                >
                    Save Changes
                </button>

            </div>

        </div>
    );
}

export default Profile;
