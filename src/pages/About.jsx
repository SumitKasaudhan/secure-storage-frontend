export default function About() {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">

            {/* HERO */}
            <section className="relative">

                <img
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
                    className="w-full h-[60vh] object-cover"
                />

                <div className="
               absolute inset-0
                bg-gradient-to-b from-black/80 via-black/60 to-black/80
               flex items-center justify-center
               text-center px-6
               ">


                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
                            Built for Privacy.
                            <br />
                            Designed for Trust.
                        </h1>

                        <p className="text-lg md:text-xl text-gray-200">
                            SecureVault protects your files with military-grade encryption
                            and modern cloud security architecture.
                        </p>
                    </div>

                </div>
            </section>

            {/* MISSION */}
            <section className="max-w-6xl mx-auto px-6 py-16">

                <div className="grid md:grid-cols-2 gap-12 items-center">

                    <div>
                        <h2 className="text-3xl font-bold mb-6">
                            Our Mission
                        </h2>

                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            In a world where data breaches are common,
                            SecureVault exists to give individuals full control
                            over their digital privacy.
                        </p>

                        <p className="text-gray-600 dark:text-gray-400">
                            We believe security should not be complicated.
                            Our platform combines strong encryption,
                            simple design, and seamless performance.
                        </p>
                    </div>

                    <img
                        src="https://images.unsplash.com/photo-1518770660439-4636190af475"
                        className="rounded-2xl shadow-xl"
                    />

                </div>
            </section>

            {/* FEATURES */}
            <section className="bg-gray-100 dark:bg-[#0f0f0f] py-16">

                <div className="max-w-6xl mx-auto px-6">

                    <h2 className="text-3xl font-bold mb-12 text-center">
                        Why SecureVault?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">

                        {[
                            {
                                title: "AES-256 Encryption",
                                desc: "Military-grade protection for every file you upload.",
                            },
                            {
                                title: "Zero-Knowledge Privacy",
                                desc: "Only you can access your data. Not even us.",
                            },
                            {
                                title: "Integrity Verification",
                                desc: "Built-in checks to detect tampering or corruption.",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-xl p-8 shadow-lg"
                            >
                                <h3 className="text-xl font-semibold mb-4">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {item.desc}
                                </p>
                            </div>
                        ))}

                    </div>

                </div>
            </section>

            {/* TRUST SECTION */}
            <section className="max-w-5xl mx-auto px-6 py-16 text-center">

                <h2 className="text-3xl font-bold mb-6">
                    Security You Can Rely On
                </h2>

                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Trusted by developers, businesses, and privacy-focused users worldwide.
                    SecureVault is engineered with modern cryptographic standards
                    and audited security practices.
                </p>

                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                    <span>✔ End-to-End Encryption</span>
                    <span>✔ Secure File Shredding</span>
                    <span>✔ Privacy Metadata Cleaning</span>
                    <span>✔ API Automation Access</span>
                </div>

            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white text-center py-16 px-6">

                <h2 className="text-3xl font-bold mb-4">
                    Your files deserve real security.
                </h2>

                <p className="mb-8 text-lg">
                    Start protecting your data today.
                </p>

                <a
                    href="/signup"
                    className="bg-white text-black px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition"
                >
                    Create Free Account
                </a>

            </section>

        </div>
    );
}
