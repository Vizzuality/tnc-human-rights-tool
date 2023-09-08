import Wrapper from "@/containers/wrapper";

export default async function ProjectsDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-5">
      <Wrapper>
        <header>
          <h1 className="text-4xl">Project 1</h1>
        </header>

        {children}
      </Wrapper>
    </div>
  );
}
