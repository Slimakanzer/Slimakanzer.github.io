import { draw } from './webgl.js';
const vertEditor = document.getElementById("vertShader");
const fragEditor = document.getElementById("fragShader");

async function main() {
    let vertText = await loadFile("../shaders/shader.vert");
    let fragText = await loadFile("../shaders/shader.frag");

    vertEditor.value = vertText;
    fragEditor.value = fragText;
    await draw(vertText, fragText);
}

async function loadFile(filepath) {
    return (await fetch(filepath)).text();
}

async function callDraw() {
    await draw(vertEditor.value, fragEditor.value);
}

vertEditor.addEventListener("input", callDraw, false);
fragEditor.addEventListener("input", callDraw, false);
document.addEventListener('DOMContentLoaded', main);