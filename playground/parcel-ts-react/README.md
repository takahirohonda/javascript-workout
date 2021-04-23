# parcel-ts-react

Trying out Parcel with Typescript React with CSS Modules and Jest

## Parcel Bundler review

I tried to use parcel bundler to create a new project with React and Typescript. Parcel delivers zero configuration bundling. It supports TypeScript, React, CSS Modules, SASS compilations out of the box. By using parcel-plugin-css-modules-type-generator, it generates type files for css modules without much config (except adding .postcssrc file).

There are a few things I am not sure about...

- Not sure how to add custom file names for dist files. We can only rename entry file by using `-o` argument (as in `parcel build ./src/index.html -o parcel.html`), but not the js files.

- Not sure how to clear the dist folder
  - If I add Linux script, it clears the folder, but it keeps adding the same file name. I think parcel has a way to add different build number according to the exisiting files in the dist folder `rm -rf dist && parcel build ./src/index.html`.

## Reference

### Installation

```bash
yarn add react react-dom

yarn add typescript @types/react @types/react-dom eslint jest ts-jest enzyme @types/jest @types/enzyme --dev

# enzyme-adapter-react-17 is not availble yet...
# when it is updated 
yarn add enzyme-adapter-react-16 @types/enzyme-adapter-react-16 --dev
# for now, use unofficial one
yarn add @wojtekmaj/enzyme-adapter-react-17 --dev

# Bundler
yarn add parcel-bundler sass --dev

# eslint
yarn add eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin @typescript-eslint/parser --dev

# Enabling css module
yarn add postcss-modules autoprefixer parcel-plugin-css-modules-type-generator --dev

# PostCSS plugin postcss-modules requires PostCSS 8 error
# upgraded parcel to next and downgraded postcss-modules
yarn add parcel@next postcss --dev
yarn add postcss-modules@3.2.2 --dev

```
