import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";

export default function SuccessModal({ show, message = "Data berhasil dihapus!" }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-lg w-[90%] max-w-sm p-6 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div className="flex flex-col items-center">
              <CheckCircleIcon className="w-14 h-14 text-green-500 mb-3" />
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Berhasil!
              </h2>
              <p className="text-gray-600">{message}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
