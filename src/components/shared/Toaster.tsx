"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, X } from "lucide-react";

/**
 * Toast type
 */
type ToastType = "success" | "error";

/**
 * Toast interface
 */
interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

/**
 * Toaster Context
 */
let toastId = 0;
const toasts: Toast[] = [];
const listeners: Array<() => void> = [];

/**
 * Show toast function
 */
function showToast(message: string, type: ToastType = "success") {
  const id = `toast-${toastId++}`;
  toasts.push({ id, message, type });
  listeners.forEach((listener) => listener());
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    removeToast(id);
  }, 5000);
}

/**
 * Remove toast function
 */
function removeToast(id: string) {
  const index = toasts.findIndex((t) => t.id === id);
  if (index > -1) {
    toasts.splice(index, 1);
    listeners.forEach((listener) => listener());
  }
}

/**
 * Toaster Component
 */
export function Toaster() {
  const [toastList, setToastList] = useState<Toast[]>([]);

  useEffect(() => {
    const updateToasts = () => {
      setToastList([...toasts]);
    };
    listeners.push(updateToasts);
    updateToasts();

    return () => {
      const index = listeners.indexOf(updateToasts);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toastList.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto"
          >
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg min-w-[300px] max-w-md ${
                toast.type === "success"
                  ? "bg-primary text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <p className="flex-1 text-sm font-medium">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 hover:opacity-70 transition-opacity"
                aria-label="Close toast"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/**
 * Export showToast function
 */
export { showToast };

