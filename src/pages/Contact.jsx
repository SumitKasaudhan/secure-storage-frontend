export default function Contact() {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-6 py-16">

            <div className="max-w-6xl mx-auto">

                <h1 className="text-4xl font-bold mb-12 text-center">
                    Contact Us
                </h1>

                <div className="grid md:grid-cols-2 gap-10">

                    {/* LEFT — CONTACT INFO CARD */}
                    <div className="
            backdrop-blur-xl
            bg-gray-100 dark:bg-[#111]
            border border-gray-300 dark:border-gray-800
            rounded-2xl
            p-10
            shadow-xl
          ">

                        <h2 className="text-2xl font-semibold mb-6">
                            Get in touch
                        </h2>

                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            We’re here to help. Reach out to our support team anytime.
                            Your security and privacy are our priority.
                        </p>

                        <div className="space-y-6 text-lg">

                            <div>
                                <p className="font-semibold">📧 Email</p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    support@securevault.app
                                </p>
                            </div>

                            <div>
                                <p className="font-semibold">📞 Phone</p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    +1 (800) 245-SAFE
                                </p>
                            </div>

                            <div>
                                <p className="font-semibold">📍 Address</p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    SecureVault HQ
                                    <br />
                                    123 Cyber Street
                                    Silicon Valley, CA
                                </p>
                            </div>

                            <div>
                                <p className="font-semibold">🕒 Working Hours</p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Mon – Fri: 9AM – 6PM
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* RIGHT — MAP CARD */}
                    <div className="
            backdrop-blur-xl
            bg-gray-100 dark:bg-[#111]
            border border-gray-300 dark:border-gray-800
            rounded-2xl
            overflow-hidden
            shadow-xl
          ">

                        <iframe
                            title="SecureVault Location"
                            src="https://www.google.com/maps?q=Silicon+Valley&output=embed"
                            className="w-full h-[450px] md:h-full border-0"
                            loading="lazy"
                        />

                    </div>

                </div>

            </div>

        </div>
    );
}
