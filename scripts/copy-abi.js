#!/usr/bin/env node

const fs = require("fs");

const blog = require("../build/contracts/Blog.json");

fs.writeFileSync("./app/blog/contracts/abi/Blog.json", JSON.stringify(blog.abi, null, 2));
