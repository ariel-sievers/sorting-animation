let delayTime = 707.3;

async function swap(i, j, container) {
    if (!play) return;

    let children = container.children;

    if (i > j) {
        [i, j] = [j, i];
    }

    let elI = children[i];
    let elJ = children[j];
    let afterJ = elJ.nextElementSibling;

    container.insertBefore(elJ, elI);
    container.insertBefore(elI, afterJ);

    container.offsetHeight;
    [elI.style.left, elJ.style.left] = [elJ.style.left, elI.style.left];

    await delay(delayTime);
}

async function insert(i, target, container) {
    if (i === target || !play) return;

    let children = container.children;
    let elI = children[i];
    let elTarget = children[target];
    let beforeTarget = elTarget.previousElementSibling;

    container.insertBefore(elI, elTarget);

    const width = parseFloat(children[0].style.width);
    container.offsetHeight;

    let newPosition;
    if (target < i) {
        newPosition = elTarget.style.left;

        // keep moving right
        for (let j = target + 1; j <= i; j++) {
            const left = parseFloat(children[j].style.left);
            children[j].style.left = `${left + width}px`;
        }
    } else {
        newPosition = beforeTarget.style.left;

        // keep moving left
        for (let j = i; j < target - 1; j++) {
            let left = parseFloat(children[j].style.left);
            children[j].style.left = `${left - width}px`;
        }
    }

    // insert children[i] at target
    elI.style.left = newPosition;

    await delay(delayTime);
}

function resetHighlights() {
    document.querySelectorAll('.highlight').forEach(el => {
        el.classList.remove('highlight');
    })
}

async function highlight(container, ...indices) {
    if (!play) return;

    resetHighlights();

    let children = container.children;

    indices.forEach(i => {
        // check that i is within bounds
        if (i < 0 || i >= children.length) return;

        children[i].classList.add('highlight');
    })

    await delay(delayTime);
}

function setSpeed(speed) {
    const delay = 100 - speed;
    delayTime = 10.09 * delay + 1;
}

function delay(milliseconds = 1000) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}