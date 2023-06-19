# Bootcamp HTML/TypeScript Training Exercise

Create a basic editor similar to the mixbook_editors project. Use the below image for reference.

![editor](https://user-images.githubusercontent.com/2269814/42557513-72af9cd0-84f7-11e8-93f5-e5b77a064bb4.png)

## Contributing

Fork this Github repo to host your project. Your fork should follow [Mixbook contributing best practices](https://github.com/Mixbook/docs/wiki/Contributing#pull-requests)

Provide a **working PR for each individual step** in the order below and assign it to the Bootcamp reviewer. For each PR, compile and host your **demo on a Github page** so the reviewer can interact with the implementation.

## Steps and acceptance criteria

1. The user can launch an editing pane in a browser. The editing pane includes an empty shapes palette and a drawing canvas.
2. The user can see 3 basic shapes on the palette as follows: a square, a circle and a triangle.
3. The user can drag a shape from the palette and drop it onto the drawing canvas.
4. The user can move shapes from their current position on the canvas to another position.
5. The user can change the z-order of shapes, bringing individual shapes forward or pushing them back.

You can either use existing setup in this repo (`create-react-app`), or start from scratch.

### Timebox

You are limited to **2 weeks** to complete the project.

### Optional steps

If you have enought time, you can experiment and add more features to the project, like more key combinations (undo, redo, copy, paste, cut, move, etc.)

Try covering parts of the code with tests using a technology of your choice.

### Things to consider

- It should be easy to add new shapes/other elements to the palette in future;
- Canvas should fill workspace in dependence of different browser sizes;
- This project should be treated as a first iteration of current Mixbook editor so it should be easy to maintain and grow;

## Technologies

- Drawing of the canvas is implemented using SVG.
- Typescript + React + Redux.

### Tools

- make sure you have `strict: true` in your `tsconfig.json`
- TSLint (the rules are already defined in `tslint.json`) - make sure you add `tslint-microsoft-contrib` and `tslint-config-prettier` to your dev dependencies. You can also add your own rules if you want.
- Prettier (the config is already in `.prettierrc.json`)

## Help material:

- [Installing Node](https://nodejs.org/en/download/package-manager/#osx). You can use Homebrew, or NVM for simple switching between various Node versions. Check Mixbook [development environments setup](https://github.com/Mixbook/docs/wiki/General-setup-for-Mixbook-development-environments#nodejs) guide.
- [Project setup: Typescript, Webpack and React](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html). Provides a brief overview of setting up a project using NPM, Typescript, Webpack and React.
- [Drawing shapes in SVG](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes). SVG is used to render the canvas area and its elements. It’s a vector based format that can be used to output high-quality, scalable images for print.
- [Unidirectional data flow](https://staltz.com/unidirectional-user-interface-architectures.html). Unidirectional data flow is the process of triggering actions from user interaction events, updating the state based on these action, and modifying the DOM with the updated state. This is the high level concept behind Redux applications. Note: this post is tailored to Flux based apps, but is applicable to Redux as well.

## Examples

Some completed project examples:

- https://vlebedeff.github.io/ts-training/
- https://gutulvadim.github.io/
- https://ardevelop.github.io/pre-flexit-training/
- http://www.barushev.net/shaper/builds/7/
