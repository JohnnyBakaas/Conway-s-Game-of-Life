let h = 55;
let w = 95;

h = 11;
w = 15;

const vTree = [];

const fillVTree = () => {
  vTree.length = w * h;
};

const makeNewBoard = () => {
  const tree = document.createElement("main");

  let columnNode;

  for (let i = 0; i < vTree.length; i++) {
    if (i % w == 0) {
      columnNode = document.createElement("div");
      columnNode.classList.add("columnNode");
      tree.appendChild(columnNode);
    }

    const child = document.createElement("div");
    child.onclick = () => changeCell(i);
    columnNode.appendChild(child);
  }

  document.getElementById("root").appendChild(tree);
};

const nextTick = () => {
  const changes = [];

  for (let i = 0; i < vTree.length; i++) {
    let nabors = 0;
    if (i - h - 1 <= 0 && vTree[i - h - 1]) nabors++;
    if (i - h <= 0 && vTree[i - h]) nabors++;
    if (i - h + 1 <= 0 && vTree[i - h + 1]) nabors++;

    if (i - 1 <= 0 && vTree[i - 1]) nabors++;
    if (i + 1 <= 0 && vTree[i + 1]) nabors++;

    if (i + h - 1 <= 0 && vTree[i + h - 1]) nabors++;
    if (i + h <= 0 && vTree[i + h]) nabors++;
    if (i + h + 1 <= 0 && vTree[i + h + 1]) nabors++;

    if (nabors > 2) vTree[i] = false;
    if (nabors == 3) vTree[i] = true;
    if (nabors < 3) vTree[i] = false;
  }
};

const changeCell = (index) => {
  vTree[index] = !vTree[index];
  if (vTree[index]) {
    document
      .getElementById("root")
      .childNodes[0].childNodes[Math.floor(index / w)].childNodes[
        index % w
      ].classList.add("alive");
  } else {
    document
      .getElementById("root")
      .childNodes[0].childNodes[Math.floor(index / w)].childNodes[
        index % w
      ].classList.remove("alive");
  }
};

fillVTree();
makeNewBoard();
