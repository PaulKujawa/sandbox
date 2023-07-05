/*
 * Since NodeJs neither understands TS nor JSX, both need to be transpiled.
 * For that I opted against a bundler, as bundling itself is an unnecessary step.
 *
 * JSX can be transpiled via babelRegister. TS could be handled the same way,
 * but in order for this very file here to be in TS too, I had to choose ts-node.
 *
 * Also, since babelRegister only works for imported files,
 * the render function, what includes JSX, had to be a separate file.
 */

/*
 * TODO babelRegister won't support JS imports of other types like CSS and JPG.
 * so... probably webpack will be needed for BE as well after all.
 */
const babelRegister = require("@babel/register");
babelRegister({
  ignore: [/[\\\/](build|server\/server|node_modules)[\\\/]/],
  presets: ["@babel/preset-react"],
  plugins: ["@babel/transform-modules-commonjs"],
});

const express = require("express");
const render = require("./render");

const app = express();

app.get("/", (req, res) => {
  render(req.url, res);
});

// for my static client-assets.
app.use(express.static(`${__dirname}/../build`));

app.listen(8080, () => {
  console.log(`Server is listening on port 8080`);
});
