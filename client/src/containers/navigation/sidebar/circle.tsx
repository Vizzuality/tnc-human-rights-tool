import { CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

interface NavigationCircleProps {
  percentage: number;
}

export default function NavigationCircle({ percentage }: NavigationCircleProps) {
  const circumference = 2 * Math.PI * 12;
  const length = circumference * percentage;

  return (
    <>
      {percentage < 1 && (
        <svg
          className="h-4 w-4 shrink-0"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* The circle */}
          <circle cx="15" cy="15" r="12" stroke="#CCC" strokeWidth={4} />
          {/* The percentage filled */}
          <circle
            cx="15"
            cy="15"
            r="12"
            strokeWidth={4}
            strokeDasharray={`${length} ${circumference}`}
            strokeLinecap="round"
            strokeOpacity={percentage === 0 ? 0 : 1}
            transform="rotate(-90 15 15)"
            className={cn({
              "stroke-primary": true,
            })}
          />
        </svg>
      )}

      {percentage === 1 && <CheckIcon className="h-4 w-4 shrink-0 stroke-primary" />}
    </>
  );
}
