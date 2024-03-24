import {createHooks} from "./hooks";
import {render as updateElement} from "./render";

function MyReact() {
    let _root;
    let _renderFunction;
    let _currentElement;

    const _render = () => {
        resetHookContext();
        const newElement = _renderFunction();
        updateElement(_root, newElement, _currentElement);
        executeAllEffects();
        _currentElement = newElement;
    };

    function render($root, rootComponent) {
        initContext();
        const newElement = rootComponent();
        updateElement($root, newElement, null);
        _root = $root;
        _renderFunction = rootComponent;
        _currentElement = newElement;
    }

    const {
        useState,
        useMemo,
        resetContext: resetHookContext,
        initContext,
        executeAllEffects,
    } = createHooks(_render);

    return {render, useState, useMemo};
}

export default MyReact();