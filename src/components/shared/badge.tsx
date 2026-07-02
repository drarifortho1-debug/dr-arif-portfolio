import { ReactNode } from "react";

export const Badge = ({ text }: { text: ReactNode }) => {
  return (
    <div className="inline-flex items-center gap-2 bg-blue-light/8 border border-blue-light/30 px-4 pt-1.5 pb-1 rounded-full text-blue-light text-sm font-semibold tracking-wide ">
      {text}
    </div>
  );
};
