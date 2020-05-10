

export async function draw(vert, frag) {
  const canvas = document.getElementById("glCanvas");
  // Initialize the GL context
  const gl = canvas.getContext("webgl");

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  let programInfo = await initShader(gl, vert, frag);
  let bufferInfo = await initBuffer(gl);

  await drawScene(gl, programInfo, bufferInfo);
}

async function drawScene(gl, programInfo, bufferInfo) {
  const positionAttributeLocation = programInfo.attributeLocations.vertexPosition;

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.useProgram(programInfo.program);

  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.positionBuffer);

  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.TRIANGLES, 0, bufferInfo.count);
}

async function initBuffer(gl) {

  const positions = [
    0, 0,
    0, 0.5,
    0.7, 0,
  ];

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  return { positionBuffer: positionBuffer, count: 3 };
}

async function initShader(gl, vert, frag) {
  const vertexShader = await loadShader(gl, gl.VERTEX_SHADER, vert);
  const fragmentShader = await loadShader(gl, gl.FRAGMENT_SHADER, frag);

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  const linkStatus = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (linkStatus) {
    const programInfo = {
      program: program,
      attributeLocations: {
        vertexPosition: gl.getAttribLocation(program, "a_position"),
      },
    };

    return programInfo;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

async function loadShader(gl, type, shaderText) {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, shaderText);
  gl.compileShader(shader);

  const successCompile = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (successCompile) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(program));
  gl.deleteShader(shader);
}
