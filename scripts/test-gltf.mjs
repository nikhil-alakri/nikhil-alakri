import fs from "fs";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("public/draco/");

// In Node environment we don't have window/DOM for WebAssembly worker, so test buffer parse
const fileData = fs.readFileSync("public/3d-models/compressed/hero-pbr.glb");
console.log("GLB file size:", fileData.length, "bytes");

// Check if file is valid GLB
const magic = fileData.readUInt32LE(0);
console.log("GLB magic (0x46546C67):", "0x" + magic.toString(16));
console.log("GLB version:", fileData.readUInt32LE(4));
console.log("GLB length:", fileData.readUInt32LE(8));
