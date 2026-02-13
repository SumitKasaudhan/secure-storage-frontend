import { useState } from "react";

export default function FAQ() {
    const faqs = [
        {
            q: "How secure is my data in SecureVault?",
            a: "All files are encrypted using AES-256 encryption before being stored. Even our servers cannot read your files.",
        },
        {
            q: "Can anyone else access my files?",
            a: "No. Only you control access. Files remain private unless you explicitly share them.",
        },
        {
            q: "What happens when I delete a file?",
            a: "Deleted files are securely shredded using overwrite simulation so they cannot be recovered.",
        },
        {
            q: "Is my login session protected?",
            a: "Yes. We use secure JWT authentication and session validation to prevent unauthorized access.",
        },
        {
            q: "Does SecureVault store my password?",
            a: "No. Passwords are hashed using modern cryptographic algorithms and never stored in plain text.",
        },
        {
            q: "Can I access my vault from multiple devices?",
            a: "Yes. You can securely access your vault from desktop, tablet, or mobile with your credentials.",
        },
        {
            q: "What file types are supported?",
            a: "SecureVault supports documents, images, PDFs, archives, and most common file formats.",
        },
    
    ];

    const [open, setOpen] = useState(null);

    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-6 py-16">

            <div className="max-w-3xl mx-auto">

                <h1 className="text-4xl font-bold mb-10 text-center">
                    Frequently Asked Questions
                </h1>

                <div className="space-y-4">

                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden"
                        >
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="w-full flex justify-between items-center
                           px-6 py-4 font-semibold
                           bg-gray-100 dark:bg-[#111]
                           hover:bg-gray-200 dark:hover:bg-[#1a1a1a]
                           transition"
                            >
                                {faq.q}

                                <span
                                    className={`transform transition duration-300 ${open === i ? "rotate-180" : ""
                                        }`}
                                >
                                    ▼
                                </span>
                            </button>

                            <div
                                className={`grid transition-all duration-300 ${open === i
                                        ? "grid-rows-[1fr] opacity-100"
                                        : "grid-rows-[0fr] opacity-0"
                                    }`}
                            >
                                <div className="overflow-hidden px-6 py-4 text-gray-700 dark:text-gray-300 bg-white dark:bg-black">
                                    {faq.a}
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </div>
    );
}
