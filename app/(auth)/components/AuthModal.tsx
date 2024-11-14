"use client";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
<FaApple />;
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function AuthModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full text-white py-3 hover:bg-white/10 transition-colors rounded-lg"
      >
        다른 방법으로 계속하기
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

function Modal({ isOpen, onClose }: AuthModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end bg-black/40"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 40, stiffness: 500 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-white rounded-t-2xl p-4 space-y-4"
          >
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />

            <h2 className="text-xl text-gray-800 font-bold text-center mb-6">
              다른 방법으로 계속하기
            </h2>

            <button className="w-full bg-sky-400 hover:bg-sky-500 transition-colors text-white py-3 rounded-lg font-medium">
              전화번호로 계속하기
            </button>

            <button className="w-full bg-black/85 hover:bg-black transition-colors text-white py-3 rounded-lg flex items-center justify-center gap-2">
              <FaApple />
              <span>Apple로 계속하기</span>
            </button>

            <button className="w-full border hover:bg-neutral-200 transition-colors text-gray-800 border-gray-300 py-3 rounded-lg flex items-center justify-center gap-2">
              <FcGoogle />
              <span>Google로 계속하기</span>
            </button>

            <p className="text-center text-gray-500 text-sm mt-4">
              계정을 잊으셨나요?{" "}
              <Link
                href="/"
                className="text-sky-400 font-bold hover:underline underline-offset-4"
              >
                비밀번호 찾기
              </Link>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
