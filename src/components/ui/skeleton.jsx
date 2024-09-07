import { cn } from "@/lib/utils";

function Skeleton({ className, randomColor, ...props }) {
  return (
    <div
      className={cn(`animate-pulse rounded-md bg`, className)}
      style={{ background: randomColor }}
      {...props}
    />
  );
}

export { Skeleton };
