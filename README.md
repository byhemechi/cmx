![cmx logo](https://gitlab.com/zxdev/cmx/raw/master/client/logo.png)
# cmx
cmx is almost a cms. It doesn't provide authoring tools, instead allowing you to put in HTML and markdown, then rendering that inside a template.

## Editing a page
To edit a page, just edit the respective html or markdown file. To get metadata like the page title, use front matter like in this example.
```yaml
---
  title: Example page
  description: A template for content
  tags: example,cmx
---
```

## Editing styles
Stylesheets for cmx are written in [stylus](http://stylus-lang.com/), which is compatible with most styles of css.

## Getting started
We recommend using yarn for dependency management, but npm will work fine too.

To get started with cmx, just clone this repo, install the dependencies and compile the styles and scripts. While developing your styles and scripts, We recommend running `yarn dev` instead of `yarn build && yarn start`.

```bash
# Clone the repo
git clone https://gitlab.com/zxdev/cmx && cd cmx

# Install dependencies
yarn

# Build assets and start the server
yarn build && yarn start
```
