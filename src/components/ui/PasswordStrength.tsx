import { useMemo } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
    password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
    const { score, checks, label, color } = useMemo(() => {
        const checks = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };

        const passedChecks = Object.values(checks).filter(Boolean).length;

        let label = "Too weak";
        let color = "bg-red-500";

        if (passedChecks === 5) {
            label = "Strong";
            color = "bg-green-500";
        } else if (passedChecks >= 4) {
            label = "Good";
            color = "bg-emerald-500";
        } else if (passedChecks >= 3) {
            label = "Fair";
            color = "bg-yellow-500";
        } else if (passedChecks >= 2) {
            label = "Weak";
            color = "bg-orange-500";
        }

        return { score: passedChecks, checks, label, color };
    }, [password]);

    if (!password) return null;

    return (
        <div className="space-y-3 mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Strength Bar */}
            <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Password strength</span>
                    <span className={cn(
                        "font-medium",
                        score >= 4 ? "text-green-500" : score >= 3 ? "text-yellow-500" : "text-red-500"
                    )}>
                        {label}
                    </span>
                </div>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                        <div
                            key={level}
                            className={cn(
                                "h-1.5 flex-1 rounded-full transition-all duration-300",
                                level <= score ? color : "bg-secondary"
                            )}
                        />
                    ))}
                </div>
            </div>

            {/* Requirements Checklist */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <CheckItem passed={checks.length} label="8+ characters" />
                <CheckItem passed={checks.uppercase} label="Uppercase" />
                <CheckItem passed={checks.lowercase} label="Lowercase" />
                <CheckItem passed={checks.number} label="Number" />
                <CheckItem passed={checks.special} label="Special char" />
            </div>
        </div>
    );
}

function CheckItem({ passed, label }: { passed: boolean; label: string }) {
    return (
        <div className={cn(
            "flex items-center gap-1.5 text-xs transition-colors",
            passed ? "text-green-500" : "text-muted-foreground"
        )}>
            {passed ? (
                <Check className="h-3 w-3" />
            ) : (
                <X className="h-3 w-3" />
            )}
            {label}
        </div>
    );
}
