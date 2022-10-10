import * as Mdast from 'mdast';
/**
 * extract YAML and convert to a <script/> block. if there's no
 * YAML, we still inject a script block with an empty frontmatter
 * field so it will behave consistently.
 */
export declare const ExtractYAMLFrontmatter: () => (tree: Mdast.Root) => void;
