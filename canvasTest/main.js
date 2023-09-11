let vTree = [];
let inter;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const cellSize = 1; // width and height of a cell in pixels

const encode = () => {
  let code = `${vTree.length},${vTree[0].length}`;

  let count = 0;
  let last = false;

  for (let i = 0; i < vTree.length; i++) {
    for (let j = 0; j < vTree[i].length; j++) {
      if (vTree[i][j] == last) {
        count++;
      } else {
        code += `,${count}`;
        count = 1;
        last = vTree[i][j];
      }
    }
  }
  code += `,${count}`;
  return code;
};

const decode = (code) => {
  const parts = code.split(",");

  const h = parts[0];
  const w = parts[1];

  const col = [];
  col.length = h;
  const nVTree = col;

  for (let i = 0; i < nVTree.length; i++) {
    const row = [];
    row.length = w;
    nVTree[i] = row;
  }

  const tLength = h * w;
  let nextSwap = Number.parseInt(parts[2]);
  let nextPart = 3;
  let isAlive = false;

  for (let i = 0; i < tLength; i++) {
    if (i == nextSwap) {
      isAlive = !isAlive;
      nextSwap += Number.parseInt(parts[nextPart]);
      nextPart++;
    }
    nVTree[Math.floor(i / w)][i % w] = isAlive;
  }

  vTree = nVTree;
  spwanBoard();
};

const drawCell = (x, y, alive) => {
  if (alive) {
    ctx.fillStyle = "black"; // Alive cells are black
  } else {
    ctx.fillStyle = "white"; // Dead cells are white
  }
  ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
};

const god = (h, w) => {
  vTree[h][w] = !vTree[h][w];
  drawCell(w, h, vTree[h][w]);
};

const spwanBoard = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous state
  for (let i = 0; i < vTree.length; i++) {
    for (let j = 0; j < vTree[i].length; j++) {
      drawCell(j, i, vTree[i][j]);
    }
  }
};

const spwanNewBoard = (height, width) => {
  vTree = new Array(height).fill(0).map(() => new Array(width).fill(false));
  spwanBoard();
};

const nextTick = () => {
  const changes = [];

  for (let i = 1; i < vTree.length - 1; i++) {
    for (let j = 1; j < vTree[i].length - 1; j++) {
      let nabors = 0;
      if (vTree[i + 1][j]) nabors++;
      if (vTree[i - 1][j]) nabors++;
      if (vTree[i][j + 1]) nabors++;
      if (vTree[i][j - 1]) nabors++;
      if (vTree[i + 1][j + 1]) nabors++;
      if (vTree[i + 1][j - 1]) nabors++;
      if (vTree[i - 1][j + 1]) nabors++;
      if (vTree[i - 1][j - 1]) nabors++;

      if (nabors < 2 && vTree[i][j]) changes.push([i, j]);
      if (nabors == 3 && !vTree[i][j]) changes.push([i, j]);
      if (nabors > 3 && vTree[i][j]) changes.push([i, j]);
    }
  }

  for (let i = 0; i < changes.length; i++) {
    vTree[changes[i][0]][changes[i][1]] = !vTree[changes[i][0]][changes[i][1]];
    drawCell(changes[i][1], changes[i][0], vTree[changes[i][0]][changes[i][1]]);
  }
};

const interTheVal = () => {
  if (inter) {
    clearInterval(inter);
    inter = false;
    document.getElementById("interTheValButton").innerHTML = "Start";
  } else {
    document.getElementById("interTheValButton").innerHTML = "Stop";
    inter = setInterval(nextTick, 100);
  }
};

const getCode = () => {
  document.getElementById("seedDisplay").innerHTML = encode();
};

const decodeInput = () => {
  try {
    decode(document.getElementById("codeInput").value);
  } catch {}
};

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const i = Math.floor(y / cellSize);
  const j = Math.floor(x / cellSize);
  god(i, j);
});

spwanNewBoard(10000, 10000);
