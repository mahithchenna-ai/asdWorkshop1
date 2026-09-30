const express = require("express");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname,"db.json");

const app = express();