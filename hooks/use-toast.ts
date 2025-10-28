import * as React from "react";
import { useContext } from "react";

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

  const toast = (newToast: Toast) => {
    setToasts((t) => [...t, newToast]);
    setTimeout(() => setToasts((t) => t.filter((tt) => tt !== newToast)), 
3000);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2">
        {toasts.map((t, i) => (
          <div key={i} className={`p-4 rounded-lg shadow-lg ${t.variant 
=== "destructive" ? "bg-red-600 text-white" : "bg-white text-black"}`}>
            <p className="font-bold">{t.title}</p>
            {t.description && <p>{t.description}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within 
ToastProvider");
  return context;
}
