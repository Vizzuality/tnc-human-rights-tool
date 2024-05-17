import ReactMarkdown from "react-markdown";

import Link from "next/link";

import slugify from "slugify";

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

            return <Link href={props.href || ""}>{props.children}</Link>;
          },
          h1: (props) => (
            <h1
              id={slugify(props?.children?.toString() || "", {
                lower: true,
                strict: true,
              })}
              {...props}
            >
              {props.children}
            </h1>
          ),
          h2: (props) => (
            <h2
              id={slugify(props?.children?.toString() || "", {
                lower: true,
                strict: true,
              })}
              {...props}
            >
              {props.children}
            </h2>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
