export interface MarkdownOptions {
    /**
     * list of file extensions. defaults to ['md']. note we are using
     * path.extname so only single-part extensions work (i.e. you can't match
     * against `.svelte.md`, although that will still match against `.md`).
     */
    extensions: string[];
    /**
     * escape curly braces in code blocks. defaults to true. if we don't escape
     * curly braces, svelte interprets these are interpolations, which usually
     * break. if this is set, you can't use interpolations in code blocks, but
     * you can still use interpolations elsewhere.
     */
    escape_braces_in_code_blocks: boolean;
    /** remark plugins */
    remarkPlugins: Array<Plugin | [Plugin, ...any]>;
    /** rehype plugins */
    rehypePlugins: Array<Plugin | [Plugin, ...any]>;
}
