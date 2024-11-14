"use client";
import { Button } from "@/components/ui/button";
import React, { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // Define a state variable to track whether there is an error or not
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen flex flex-grow items-center justify-center ">
          <div className="rounded-lg bg-white p-8 text-center ">
            <h1 className="mb-4 text-4xl font-bold">Not Found!</h1>
            <p className="text-gray-600">
              Oops! We could not find the data related to your requested site..
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4 inline-block rounded bg-primary px-4 py-2 font-semibold text-white hover:bg-primary/90"
            >
              Try Another Site
            </Button>
          </div>
        </div>
      );
    }

    // Return children components in case of no error
    return this.props.children;
  }
}

export default ErrorBoundary;
