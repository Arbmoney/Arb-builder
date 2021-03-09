const esbuild = require("esbuild");

function builder(files) {
  try {
    esbuild.build({
      entryPoints: [files],
      bundle: true,
      platform: "node",
      outfile: "./dist/main.js",
    });
  } catch (err) {
    console.log(err);
    return false;
  }

  return true;
}

module.exports = builder;
