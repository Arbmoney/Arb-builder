import path from "path";
import fs from "fs";
import builder from "./components/builder.js";

interface Config {
  folder: string;
  main: string;
}

function get_argv(index: number) {
  return process.argv.slice(2)[index];
}

var data: Config = {
  folder: get_argv(0),
  main: get_argv(1),
};

async function run() {
  const files = `./${data.folder}/${data.main}`;
  const bundle = await builder(files);
  if (bundle) {
    return console.log("Successfully compiled");
  }
  return console.error("Error compiling");
}

run();
