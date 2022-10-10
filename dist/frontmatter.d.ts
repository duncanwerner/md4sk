import * as Mdast from 'mdast';
/**
 * extract YAML and convert to a <script/> block. if there's no
 * YAML, we still inject a script block with an empty frontmatter
 * field so it will behave consistently.
 *
 * Effectively, frontmatter like this:
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
 */
export declare const ExtractYAMLFrontmatter: () => (tree: Mdast.Root) => void;
