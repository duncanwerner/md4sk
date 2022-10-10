import * as YAML from 'yaml';
import { h } from 'hastscript';
import { toHtml as render_html } from 'hast-util-to-html';
/**
 * extract YAML and convert to a <script/> block. if there's no
 * YAML, we still inject a script block with an empty frontmatter
 * field so it will behave consistently.
 */
export const ExtractYAMLFrontmatter = () => {
    return (tree) => {
        let count = 0;
        tree.children = tree.children.map(child => {
            if (child.type === 'yaml') {
                count++;
                const json = JSON.stringify(YAML.parse(child.value || ''));
                return {
                    type: 'html',
                    value: render_html(h('script', { context: 'module' }, `const frontmatter = ${json};`)),
                };
            }
            return child;
        });
        // see above. inject an empty frontmatter field.
        if (count === 0) {
            tree.children.unshift({
                type: 'html',
                value: render_html(h('script', { context: 'module' }, `const frontmatter = {};`)),
            });
        }
        else if (count > 1) {
            console.warn("multiple YAML blocks found (this will probably break)");
        }
    };
};
