import * as path from 'path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeRaw from 'rehype-raw';
import { DefaultMarkdownOptions } from './options.js';
/** dev */
const DumpTree = () => {
    return (tree) => {
        console.dir(tree);
    };
};
/**
 * escape braces inside <code/> elements.
 *
 * we've been experimenting with different ways of doing this. this version
 * inserts javascript strings inside braces (for svelte interpolation). this
 * seems redundant, but it's perhaps the cleanest way to do it from the
 * standpoint of preserving the content. also simpler methods like using html
 * entities can get cleaned up unexpectecdly by other processors.
 */
const EscapeBraces = () => {
    const replace_children = (element) => {
        if (element.children) {
            for (const child of element.children) {
                switch (child.type) {
                    case 'text':
                        child.value = child.value.replace(/([{}])/g, (match) => {
                            return "{`" + match + "`}";
                        });
                        break;
                    case 'element':
                        replace_children(child);
                        break;
                }
            }
        }
    };
    const process = (tree) => {
        switch (tree.type) {
            case 'text':
            case 'comment':
            case 'doctype':
                return;
        }
        if (tree.children) {
            for (const child of tree.children) {
                if (child.type === 'element') {
                    if (child.tagName === 'code') {
                        replace_children(child);
                    }
                    else {
                        process(child);
                    }
                }
            }
        }
    };
    return (tree) => process(tree);
};
/**
 * markdown processor for svelte-kit
 */
export const Markdown = (options = {}) => {
    const composite_options = {
        ...DefaultMarkdownOptions,
        ...options,
    };
    // ensure . on all extensions
    const extensions = composite_options.extensions.map(extension => {
        if (extension.startsWith('.')) {
            return extension;
        }
        return '.' + extension;
    });
    let parser = unified().use(remarkParse);
    // any remark plugins
    for (const plugin of composite_options.remarkPlugins) {
        if (Array.isArray(plugin)) {
            parser = parser.use.apply(0, plugin);
        }
        else {
            parser = parser.use.call(0, plugin);
        }
    }
    // for rehype and stringify, leave in HTML. this is generally not a 
    // good idea when processing user content, but since we're running as 
    // a preprocessor it's just rope.
    parser = parser.use(remarkRehype, { allowDangerousHtml: true });
    // optionally escape braces for svelte.
    if (composite_options.escape_braces_in_code_blocks) {
        // we use rehype-raw to unbundle any raw blocks back to HAST before escaping.
        parser = parser.use([rehypeRaw, EscapeBraces]);
    }
    // any rehype plugins
    for (const plugin of composite_options.rehypePlugins) {
        if (Array.isArray(plugin)) {
            parser = parser.use.apply(0, plugin);
        }
        else {
            parser = parser.use.call(0, plugin);
        }
    }
    // again, stringify allows HTML. use with caution.
    parser = parser.use(rehypeStringify, { allowDangerousHtml: true });
    return {
        markup: async ({ content, filename }) => {
            if (extensions.includes(path.extname(filename))) {
                const result = await parser.process(content);
                return {
                    code: result.value,
                    // data?
                    // map?
                };
            }
            return undefined;
        },
    };
};
