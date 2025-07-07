"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

interface ErrorToastContextType {
  showError: (message: string) => void;
}

const ErrorToastContext = createContext<ErrorToastContextType>({ showError: () => {} });

export function useErrorToast() {
  return useContext(ErrorToastContext);
}

export function ErrorToastProvider({ children }: { children: ReactNode }) {
  const showError = (message: string) => {
    toast.error(message, { duration: 5000 });
  };
  return (
    <ErrorToastContext.Provider value={{ showError }}>
      {children}
    </ErrorToastContext.Provider>
  );
}
