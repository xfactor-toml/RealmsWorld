import Image from "next/image";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => (
      <Image
        width={1600}
        height={900}
        className="max-w-screen my-8"
        {...props}
      />
    ),
    ...components,
  };
}