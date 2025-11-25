import { AnimatePresence, motion } from "framer-motion";

export default function ConfirmUserApproveModal({ show, onClose, onConfirm, message }) {
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
            className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Approve User
            </h2>
            <p className="text-gray-600 mb-6">
              {message || "Apakah kamu yakin ingin menghapus data ini?"}
            </p>

            <div className="flex justify-center gap-3">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg"
              >
                Batal
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onConfirm}
                className="px-4 py-2 bg-main-blue text-white rounded-lg"
              >
                Yakin
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
