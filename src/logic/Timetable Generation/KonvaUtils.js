import Konva from "konva";

/**
 * 
 * @param {Konva.Layer} layer The konva layer to append a rectangle onto
 * @param {Object} options options to initialize the rectangle. Eg: `fill`, `width`, `x`
 */
export function appendRect(layer, options) {
    layer.add( new Konva.Rect({
        preventDefault: false,          // ? Allow mobile device scrolling
        ...options,
    }));
}


export function appendText(layer, options) {
    layer.add( new Konva.Text({
        preventDefault: false,          // ? Allow mobile device scrolling
        align: 'center',
        verticalAlign: 'middle',
        ...options,
    }));
}