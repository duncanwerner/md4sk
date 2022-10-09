export interface MarkdownOptions {

	/** 
	 * list of file extensions. defaults to ['md']. note we are using
	 * path.extname so only single-part extensions work (i.e. you can't match
	 * against `.svelte.md`, although that will still match against `.md`).
	 */
	extensions: string[];

	/* * 
	 * support frontamtter. defaults to false. if set to true, we read 
	 * frontmatter as YAML (using remark-frontmatter), create a JSON 
	 * representation, then add a script block that sets the const value 
	 * `frontmatter` to that JSON. So effectively, frontmatter like this:
	 * 
	 * ---
	 * title: Something
	 * order: 10
	 * ---
	 * 
	 * results in a script block in the output svelte that looks like this:
	 * 
	 * <script context="module">
	 * const frontmatter = {
	 * 	  title: 'Something',
	 *    order: 10,
	 * };
	 * </script>
	 * 
	 * and then you can use that in your own script tag or in a page 
	 * interpolation, like
	 * 
	 * # {frontmatter.title || 'No title'}
	 * 
	 * /
	frontmatter: boolean;
		*/

	/** 
	 * escape curly braces in code blocks. defaults to true. if we don't escape
	 * curly braces, svelte interprets these are interpolations, which usually 
	 * break. if this is set, you can't use interpolations in code blocks, but 
	 * you can still use interpolations elsewhere. 
	 */
	escape_braces_in_code_blocks: boolean;

	/** remark plugins */
	remarkPlugins: Array<Plugin|[Plugin, ...any]>;

	/** rehype plugins */
	rehypePlugins: Array<Plugin|[Plugin, ...any]>;

}
