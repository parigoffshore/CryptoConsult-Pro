"use client";

import * as React from "react";

type Toast = {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
};

type ToastContextType = {
  toast: (toast: Toast) => void;
};

const ToastContext = React.createContext<ToastContextType | 
undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) 
{
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const toast = React.useCallback((newToast: Toast) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { ...newToast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`max-w-sm w-full p-4 rounded-lg shadow-lg text-sm 
font-medium ${
              t.variant === "destructive"
                ? "bg-red-600 text-white"
                : "bg-white text-gray-900 border"
            }`}
          >
            <p className="font-bold">{t.title}</p>
            {t.description && <p className="mt-1">{t.description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within 
ToastProvider");
  return context;
}
