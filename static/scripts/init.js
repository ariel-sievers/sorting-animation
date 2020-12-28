let elList = [];
let CONTROLS = {
    buttons: { },
    sliders: { },
    sorting: { }
}

window.addEventListener('load', function() {
    
    // slider display elements
    const elementTarget = document.querySelector('.value__elements');
    const speedTarget = document.querySelector('.value__speed');

    // sorting elements
    CONTROLS.sorting = {
        type: document.getElementById('sorting__type'),
        order: document.getElementById('sorting__order')
    };

    // slider control elements
    CONTROLS.sliders = {
        elements: document.getElementById('elements'),
        speed: document.getElementById('speed')
    };

    // button elements
    CONTROLS.buttons = {
        sort: document.querySelector('.btn__sort'),
        pause: document.querySelector('.btn__pause'),
        shuffle: document.querySelector('.btn__shuffle')
    };

    // show slider values
    elementTarget.innerHTML = CONTROLS.sliders.elements.value;
    speedTarget.innerHTML = CONTROLS.sliders.speed.value;

    // display elements
    elList = createElements(CONTROLS.sliders.elements.value);

    CONTROLS.sliders.elements.addEventListener('input', () => {
        const value = CONTROLS.sliders.elements.value;

        elementTarget.innerHTML = value;
        elList = createElements(value);
    });
    CONTROLS.sliders.speed.addEventListener('input', () => {
        speedTarget.innerHTML = CONTROLS.sliders.speed.value;
    });

    // add button click events
    addClickEvent(CONTROLS.buttons.shuffle, () => {
        const container = document.getElementById('element-box');
        shuffle(elList, container);
        
        resetControls();
    });

    addClickEvent(CONTROLS.buttons.sort, () => {
        start();

        disable(CONTROLS.buttons.sort, ...Object.values(CONTROLS.sliders), ...Object.values(CONTROLS.sorting));
        enable(CONTROLS.buttons.pause);
    });

    addClickEvent(CONTROLS.buttons.pause, () => {
        pause();
        resetControls();
    });

});

window.addEventListener('resize', debounce(updateElementDimensions, 150));

function getElementValue(id) {
    return document.getElementById(id).value;
}

function addClickEvent(button, func) {
    button.addEventListener('click', func);
}

function enable(...elements) {
    elements.forEach(b => {
        b.disabled = false;
    })
}

function disable(...elements) {
    elements.forEach(b => {
        b.disabled = true;
    })
}

function createElements(number) {
    const container = document.getElementById('element-box');
    const width = container.offsetWidth / number;

    const showValue = width <= 30 ? false : true;
    
    const r = (18 - 57) / number;
    const g = (231 - 172) / number;
    const b = (58 - 211) / number;

    const bars = [];
    for (i = 0; i < number; i++) {
        const height = Math.round(container.offsetHeight / number * (i + 1)) * 0.9;
        const color = `rgb(
            ${Math.floor(57 + r * i)},
            ${Math.floor(172 + g * i)},
            ${Math.floor(211 + b * i)}
        )`;

        const el = createBarElement(height, width, color, showValue);
    
        bars.push(el);
    }

    shuffle(bars, container);

    return bars;
}

function createBarElement(height, width, color, showValue = false) {
    const el = document.createElement('div');
    el.classList.add('element');
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.background = color;

    if (showValue) {
        const value = document.createElement('span');
        value.innerHTML = Math.round(height + 0.1 * height); // get full height

        el.appendChild(value);
    }

    return el;
}

function resetControls() {
    enable(CONTROLS.buttons.sort, ...Object.values(CONTROLS.sliders), ...Object.values(CONTROLS.sorting));
    disable(CONTROLS.buttons.pause);
}

function pause() {
    play = false;
    resetControls();
}

function start() {
    const container = document.getElementById('element-box');
    const ascending = getElementValue('sorting__order') == 'ascending';

    play = true;

    setSpeed(getElementValue('speed'));

    switch (getElementValue('sorting__type')) {

        case 'quick':
            Algorithms.quick(container.children, ascending);
            break;
        case 'heap':
            Algorithms.heap(container.children, ascending);
            break;
        case 'bubble':
            Algorithms.bubble(container.children, ascending);
            break;
        case 'insertion':
            Algorithms.insertion(container.children, ascending);
            break;
        case 'selection':
            Algorithms.selection(container.children, ascending);
            break;
        case 'merge':
            Algorithms.merge(container.children, ascending);
            break;
        default:
            return;
    }

}

function shuffle(elements, container) {
    pause();
    container.innerHTML = ''; // remove children

    elements.sort(() => 0.5 - Math.random());

    elements.forEach((item, i) => {
        const width = parseFloat(item.style.width);
        item.style.left = `${width * i}px`;
        container.appendChild(item);
    })
}

function debounce(func, time = 100){
    var timer;

    return function(event) {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(func, time, event);
    };
}

function updateElementDimensions() {
    elList = createElements(elList.length);
}

