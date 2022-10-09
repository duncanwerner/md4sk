
## Markdown for svelte-kit (md4sk)

This is a minimal Markdown preprocessor for svelte. It's intended to do as 
little as possible to support using Markdown in svelte-kit. It's basically
just a vehicle for using Remark and Rehype plugins. 

Other than that, it only does one thing (optionally, but default true):

 - Escapes braces `{}` in code blocks. Svelte will interpret any braces in html 
   as script interpolation. Thus if you have a code block including braces, it 
   will usually break. This plugin escapes braces in code blocks so they work
   without breaking. However, this does mean that you can't use interpolation
   inside code blocks.

That could conceivably be a plugin as well, but for the time being it's built
in. In any event you can disable it.

If you want to do anything else, for example supporting GFM, you can do that
with remark plugins. It doesn't do code highlighting either; we have a useful
Remark plugin for that (based on Shiki), but there are plenty of others as well
depending on your preferred syntax highlighter. 

## Using

svelte.config:

```js

// import
import { Markdown } from 'md4sk';

/** @type {import('@sveltejs/kit').Config} */
const config = {

  // add the .md extension for markdown files. they will be
  // named (in this example) +page.md or +page.svelte.md

  extensions: ['.md', '.svelte'],
	
  // update the preprocessor

  preprocess: [
    preprocess(), 
    Markdown(),
  ],

  // no more changes

  kit: {
    adapter: adapter()
  }

};

```

## Frontmatter

We provide one additional plugin for handling frontmatter. This used to be
built in but I took it out for consistency. It requires first
calling the `remarkFrontmatter` plugin, which reads frontmatter
and creates a YAML node in the tree.

example markdown:

```md
---
title: Something
---

# {frontmatter.title}

```

svelte.config:

```js

// import
import { Markdown, ExtractYAMLFrontmatter } from 'md4sk';
import remarkFrontmatter from 'remark-frontmatter';

/** @type {import('@sveltejs/kit').Config} */
const config = {

  extensions: ['.md', '.svelte'],

  preprocess: [
    preprocess(), 
    Markdown({
      remarkPlugins: [
        remarkFrontmatter,
        ExtractYAMLFrontmatter,
      ],
    }),
  ],

  // no more changes

  kit: {
    adapter: adapter()
  }

};

```
