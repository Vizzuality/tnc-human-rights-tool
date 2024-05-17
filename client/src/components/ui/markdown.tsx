import ReactMarkdown from "react-markdown";

export default function Markdown({ children }: { children?: string | null }) {
  return (
    <div className="prose w-full">
      <ReactMarkdown
        components={{
          a: (props) => {
            if (props?.href?.match("http")) {
              return (
                <a href={props.href} target="_blank" rel="nofollow noreferrer noopener">
                  {props.children}
                </a>
              );
            }
            return <a href={props.href}>{props.children}</a>;
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
