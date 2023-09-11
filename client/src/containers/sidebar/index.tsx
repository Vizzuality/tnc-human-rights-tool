import { PropsWithChildren } from "react";

export default function Sidebar({ children }: PropsWithChildren) {
  return <aside className="col-span-4">{children}</aside>;
}
