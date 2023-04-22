import * as React from "react";

export interface ICardProps {
  children: React.ReactNode;
}

export function Card({ children }: ICardProps) {
  return (
    <div className="flex flex-col rounded-lg text-start p-4 space-y-6 shadow-lg w-80 h-96 overflow-auto bg-zinc-50">
      {children}
    </div>
  );
}
