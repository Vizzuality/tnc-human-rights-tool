import { PropsWithChildren } from "react";

export default function Sidebar({ children }: PropsWithChildren) {
  return <aside className="sticky top-0">{children}</aside>;
}
