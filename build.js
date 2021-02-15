const JavaScriptObfuscator = require("javascript-obfuscator");
const { exec } = require("child_process");
const { name, dependencies, version } = require("./package.json");
const fs = require("fs");
const { stderr } = require("process");

// var data = fs.readFileSync("./core.js", "utf-8", (err, data) => {
//   return data;
// // });
//

function prebuilding(listfiles, packages) {
  console.log("Pre Building: started");

  const data = [];

  for (var i = 0; i < listfiles.length; i++) {
    data.push({ name: listfiles[i], path: `./src/${listfiles[i]}` });
    console.log(`   File: (${i + 1}/${listfiles.length})`);
  }
  console.log("Pre Building: finished");

  return data;
}

async function build(matrix, dependencies, name) {
  console.log("Building: started");

  if (!fs.existsSync("./build")) {
    fs.mkdirSync("build");
  }

  matrix.map((file) => {
    const data = fs.readFileSync(file.path, "utf-8");
    const build = JavaScriptObfuscator.obfuscate(data, {
      optionsPreset: "high-obfuscation",
      target: "node",
    });
    fs.writeFileSync(
      `./build/${file.name.replace(".js", ".rc")}`,
      build.getObfuscatedCode()
    );
    console.log(`   File: ${file.name.replace(".js", ".rc")} compiled`);
  });

  async function package(dependencies, name) {
    console.log("   Package creating.");
    fs.writeFileSync(
      "./build/package.json",
      JSON.stringify({
        name: name,
        main: `${process.argv.slice(2)[0]}.rc`,
        dependencies: dependencies,
        version: version,
        typing: "rc",
        scripts: {
          start: `node ${process.argv.slice(2)[0]}.rc`,
        },
      })
    );
    console.log("   Package created.");
    await exec("cd build;yarn", (error, stdout, stderr) => {
      if (error) {
        console.error(error.message);
      }
      console.log("Packages installed");
    });
  }
  await package(dependencies, name);
}

(async () => {
  const files = fs.readdirSync("./src/");
  const Matriz = prebuilding(files);
  await build(Matriz, dependencies, name);
})();
