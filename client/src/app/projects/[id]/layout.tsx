import Wrapper from "@/containers/wrapper";

export default async function ProjectsDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex grow flex-col space-y-5 py-24">
      <Wrapper>
        <header>
          <h1 className="text-4xl">Project 1</h1>
        </header>

        {children}
      </Wrapper>
    </section>
  );
}
