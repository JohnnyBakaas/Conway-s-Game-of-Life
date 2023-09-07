let vTree = [];
let inter;

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

const god = (h, w) => {
  if (vTree[h][w]) {
    vTree[h][w] = false;
    document
      .getElementById("root")
      .childNodes[0].childNodes[h].childNodes[w].classList.remove("alive");
  } else {
    vTree[h][w] = true;
    document
      .getElementById("root")
      .childNodes[0].childNodes[h].childNodes[w].classList.add("alive");
  }
};

const changeState = (h, w) => {
  if (vTree[h][w]) {
    document
      .getElementById("root")
      .childNodes[0].childNodes[h].childNodes[w].classList.add("alive");
  } else {
    document
      .getElementById("root")
      .childNodes[0].childNodes[h].childNodes[w].classList.remove("alive");
  }
};

const spwanNewBoard = (height, width) => {
  document.getElementById("root").innerHTML = "";
  vTree = [];

  const tree = document.createElement("main");

  for (let i = 0; i < height; i++) {
    vTree[i] = [];
    const columnNode = document.createElement("div");
    columnNode.classList.add("columnNode");
    for (let j = 0; j < width; j++) {
      vTree[i][j] = false;
      const child = document.createElement("div");
      child.onclick = () => god(i, j);
      columnNode.appendChild(child);
    }
    tree.appendChild(columnNode);
  }

  document.getElementById("root").appendChild(tree);
};

const spwanBoard = () => {
  if (vTree.length === 0) return spwanNewBoard(55, 95);

  document.getElementById("root").innerHTML = "";
  const tree = document.createElement("main");

  for (let i = 0; i < vTree.length; i++) {
    const columnNode = document.createElement("div");
    columnNode.classList.add("columnNode");
    for (let j = 0; j < vTree[i].length; j++) {
      const child = document.createElement("div");
      if (vTree[i][j]) {
        child.classList.add("alive");
      }
      child.onclick = () => god(i, j);
      columnNode.appendChild(child);
    }
    tree.appendChild(columnNode);
  }

  document.getElementById("root").appendChild(tree);
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
    changeState(changes[i][0], changes[i][1]);
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

spwanNewBoard(55, 95);
