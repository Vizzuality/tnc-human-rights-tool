import { PropsWithChildren } from "react";

export default function Sidebar({ children }: PropsWithChildren) {
  return <aside>{children}</aside>;
}
