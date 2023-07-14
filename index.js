import {
    parse
} from './parseLib.js';

const streamingEffect = (words, outputEle) => {
    console.log("called!")
    let current_display = "";
    let delay = 0;
    let timeouts = [];
    for (let i = 0; i < words.length; i++) {
        delay += 50 * Math.random();
        timeouts.push(setTimeout(
            () => {
                current_display += words[i];
                outputEle.textContent = current_display;
            }, delay));
    }

    const clearTimeouts = () => {
        timeouts.forEach((t) => clearTimeout(t));
    }

    return {
        clearTimeouts: clearTimeouts
    }
}

const random = (min, max) => {
    return Math.random() * (max - min) + min;
}

document.addEventListener('DOMContentLoaded', function () {
    const inputElement = document.getElementById('input');
    const outputElement = document.getElementById('output');

    let timeout;
    let streamingTimeout = streamingEffect([], outputElement);

    inputElement.addEventListener('input', function () {
        streamingTimeout.clearTimeouts();
        clearTimeout(timeout);

        const delay = random(800, 1200);
        timeout = setTimeout(() => {
            const inputValue = inputElement.value;
            if (inputValue === "") {
                outputElement.textContent = "";
                return;
            } else if (!(/^[0-9]+$/.test(inputValue))) {
                streamingTimeout = streamingEffect("I am a large language model that cannot understand non-numeric characters.".split(/(\s|-)/), outputElement);
                return;
            } else if (inputValue.length > 33) {
                streamingTimeout = streamingEffect("I am a large language model that cannot fathom numbers greater than 1e33.".split(/(\s|-)/), outputElement);
                return;
            } else {
                const parsedValue = parse(inputValue.replace(/^0+/, "")).split(/(\s|-)/);
                streamingTimeout = streamingEffect(parsedValue, outputElement);
            }
        }, delay);
    });

    let showing_info = false;
    const info_button = document.getElementById('info');
    const info_pane = document.getElementById('infoPane');
    const xout_button = document.getElementById('xout');
    info_button.addEventListener('click', function () {
        showing_info = !showing_info;
        info_pane.style.display = showing_info ? 'flex' : 'none';
        inputElement.disabled = showing_info;
    })
    xout_button.addEventListener('click', function () {
        showing_info = false;
        info_pane.style.display = 'none';
        inputElement.disabled = false;
    })
});