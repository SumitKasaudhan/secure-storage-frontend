import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import {
    FaLock,
    FaUserShield,
    FaCloudUploadAlt,
    FaShieldAlt,
    FaUserSecret,
    FaDatabase
} from "react-icons/fa";

function Home() {

    const features = [
        {
            icon: <FaLock size={34} />,
            title: "AES-256 Encryption",
            desc: "Military-grade encryption protects every file end-to-end."
        },
        {
            icon: <FaUserShield size={34} />,
            title: "Role-Based Security",
            desc: "Granular admin & user permission control."
        },
        {
            icon: <FaCloudUploadAlt size={34} />,
            title: "Secure Upload",
            desc: "Encrypted upload & safe cloud storage pipeline."
        },
        {
            icon: <FaShieldAlt size={34} />,
            title: "Zero Trust Architecture",
            desc: "Every action is authenticated & verified."
        },
        {
            icon: <FaUserSecret size={34} />,
            title: "Privacy First",
            desc: "No tracking. No exposure. Your data stays yours."
        },
        {
            icon: <FaDatabase size={34} />,
            title: "Encrypted Database",
            desc: "Files stored securely with encrypted metadata."
        }
    ];

    return (
        <div className="bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">

            {/* ================= HERO ================= */}
            <section className="relative h-[85vh]">

                <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 3000 }}
                    loop
                    className="h-full"
                >

                    {[
                        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
                        "https://images.unsplash.com/photo-1518770660439-4636190af475",
                        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
                    ].map((img, i) => (
                        <SwiperSlide key={i}>
                            <div className="relative h-full">
                                <img
                                    src={img}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/60" />

                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

                                    <motion.h1
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8 }}
                                        className="text-4xl md:text-6xl font-extrabold mb-6 text-white"

                                    >
                                        SecureVault
                                    </motion.h1>

                                    <p className="max-w-2xl text-gray-300 mb-8">
                                        Encrypted cloud storage built for privacy,
                                        trust, and enterprise-grade protection.
                                    </p>

                                    <div className="flex gap-4">
                                        <Link
                                            to="/login"
                                            className="bg-indigo-600 text-white px-6 py-3 rounded font-semibold hover:opacity-90"

                                        >
                                            Login
                                        </Link>

                                        <Link
                                            to="/signup"
                                            className="bg-white text-black px-6 py-3 rounded font-semibold hover:opacity-90"
                                        >
                                            Signup
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

                </Swiper>
            </section>

            {/* ================= MISSION ================= */}
            <section className="px-6 md:px-10 py-20 text-center">

                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>

                <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
                    SecureVault exists to protect digital privacy in a world where data
                    breaches are common. Our mission is to give individuals and
                    organizations full control over their encrypted data.
                </p>

            </section>

            {/* ================= ABOUT ================= */}
            <section className="px-6 md:px-10 py-20 bg-[#f5f5f5] dark:bg-[#0f0f0f]">

                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

                    <img
                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
                        className="rounded-xl shadow-lg"
                    />

                    <div>
                        <h2 className="text-3xl font-bold mb-6">
                            Built for Privacy. Designed for Trust.
                        </h2>

                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            We combine modern encryption, cloud security architecture,
                            and intuitive design to deliver a storage platform that feels
                            simple but operates with enterprise-level protection.
                        </p>

                        <p className="text-gray-600 dark:text-gray-400">
                            SecureVault is engineered for developers, businesses,
                            and privacy-focused users who demand full control.
                        </p>
                    </div>

                </div>
            </section>


            {/* ================= MODERN FEATURES GRID ================= */}
            <section className="px-6 md:px-10 py-24 text-center relative overflow-hidden">

                {/* Background glow */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute w-[600px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full top-[-200px] left-[-200px]" />
                    <div className="absolute w-[600px] h-[600px] bg-purple-600/20 blur-[120px] rounded-full bottom-[-200px] right-[-200px]" />
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-16">
                    Platform Features
                </h2>

                <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            viewport={{ once: true }}

                            whileHover={{
                                y: -10,
                                scale: 1.03
                            }}

                            className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-indigo-600/40 to-purple-600/40 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300"
                        >

                            {/* Card body */}
                            <div className="
          h-full rounded-2xl
          bg-white/80 dark:bg-[#0f0f12]/90
          backdrop-blur-xl
          border border-white/20 dark:border-gray-800
          p-8
          transition
          group-hover:shadow-[0_0_40px_rgba(99,102,241,0.35)]
        ">

                                {/* Icon */}
                                <div className="
            mb-6
            flex justify-center
            text-indigo-600
            group-hover:scale-110
            transition-transform duration-300
          ">
                                    <motion.div
                                        animate={{ rotate: [0, 5, -5, 0] }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        {f.icon}
                                    </motion.div>
                                </div>

                                <h4 className="text-xl font-semibold mb-3">
                                    {f.title}
                                </h4>

                                <p className="text-gray-600 dark:text-gray-400">
                                    {f.desc}
                                </p>

                            </div>

                        </motion.div>
                    ))}

                </div>

            </section>


            {/* ================= FEEDBACK ================= */}
            <section className="px-6 md:px-10 py-20 text-center">

                <h3 className="text-3xl font-bold mb-12">
                    What Users Say
                </h3>

                <div className="max-w-5xl mx-auto">

                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{ delay: 3500 }}
                        loop
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 }
                        }}
                    >

                        {[
                            "Clean UI, strong encryption, fast uploads.",
                            "Feels like enterprise security software.",
                            "Perfect for confidential documents.",
                            "Admin controls are excellent.",
                            "Best encrypted storage I’ve used."
                        ].map((review, i) => (

                            <SwiperSlide key={i}>
                                <div className="bg-white dark:bg-card p-8 rounded-xl shadow-lg">

                                    <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold mb-4">
                                        Ema
                                    </div>

                                    <p className="text-gray-700 dark:text-gray-300">
                                        "{review}"
                                    </p>

                                </div>
                            </SwiperSlide>

                        ))}

                    </Swiper>

                </div>
            </section>

        </div>
    );
}

export default Home;
