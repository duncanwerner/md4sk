import { type MarkdownOptions } from './options.js';
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
