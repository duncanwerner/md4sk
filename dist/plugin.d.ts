import * as Mdast from 'mdast';
import type { MarkdownOptions } from './options';
/**
 * extract YAML and convert to a <script/> block. if there's no
 * YAML, we still inject a script block with an empty frontmatter
 * field so it will behave consistently.
 */
export declare const ExtractYAMLFrontmatter: () => (tree: Mdast.Root) => void;
/**
 * markdown processor for svelte-kit
 */
export declare const Markdown: (options?: Partial<MarkdownOptions>) => {
    markup: ({ content, filename }: {
        content: any;
        filename: any;
    }) => Promise<{
        code: import("vfile").Value;
    }>;
};
