import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error: Error): Partial<State> {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ errorInfo });

        // Log error to console (can be replaced with Sentry or similar)
        console.error("ErrorBoundary caught an error:", error, errorInfo);

        // TODO: Send to error tracking service
        // if (typeof window !== 'undefined' && window.Sentry) {
        //     window.Sentry.captureException(error, { extra: errorInfo });
        // }
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    handleGoHome = () => {
        window.location.href = "/";
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen bg-background flex items-center justify-center p-4">
                    <div className="max-w-md w-full text-center">
                        {/* Error Icon */}
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
                            <AlertTriangle className="h-10 w-10 text-destructive" />
                        </div>

                        {/* Error Message */}
                        <h1 className="text-2xl font-semibold text-foreground mb-2">
                            Something went wrong
                        </h1>
                        <p className="text-muted-foreground mb-6">
                            We're sorry, but something unexpected happened. Please try again or return to the home page.
                        </p>

                        {/* Error Details (Development only) */}
                        {import.meta.env.DEV && this.state.error && (
                            <div className="mb-6 p-4 bg-secondary/50 rounded-lg text-left overflow-auto max-h-40">
                                <p className="text-sm font-mono text-destructive">
                                    {this.state.error.toString()}
                                </p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button
                                variant="luxury"
                                onClick={this.handleRetry}
                                className="gap-2"
                            >
                                <RefreshCw className="h-4 w-4" />
                                Try Again
                            </Button>
                            <Button
                                variant="outline"
                                onClick={this.handleGoHome}
                                className="gap-2"
                            >
                                <Home className="h-4 w-4" />
                                Go Home
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
