"use client";
import React, { ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to service if needed
    console.error(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <div className="p-8 text-center text-red-600">Something went wrong.</div>;
    }
    return this.props.children;
  }
}
