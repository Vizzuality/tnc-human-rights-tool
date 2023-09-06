import { Metadata } from "next";

import Signin from "@/containers/signin";

export const metadata: Metadata = {
  title: "Sign in | Human Rights Tool",
  description: "Generated by create next app",
};

export default function SigninPage() {
  return (
    <section className="flex grow flex-col items-center justify-center space-y-5 py-24">
      <Signin />
    </section>
  );
}
