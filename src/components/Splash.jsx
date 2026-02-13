import { motion } from "framer-motion";

function Splash() {
    return (
        <div className="fixed inset-0 bg-black text-white flex items-center justify-center z-50">

            <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="text-4xl font-bold text-primary"
            >
                SecureVault
            </motion.h1>

        </div>
    );
}

export default Splash;
