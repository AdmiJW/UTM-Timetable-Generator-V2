import Konva from 'konva';
import { appendRect } from './KonvaUtils'

/**
 * @typedef {import('./themeMapper').Theme} Theme
 */

// ! Every shapes added by Konva should have preventDefault: false - To allow mobile scrolling. Otherwise
// ! user will be unable to scroll by touch



/**
 * @param {Object} config config object to refer `gridWidth`, `gridHeight`, `gap` and most importantly `orientation`.
 * @param {Theme} theme Theme object to refer `oddRowColor`, `evenRowColor` and `backgroundColor`
 * @returns {Konva.Layer} Konva layer containing the background, oddRows and evenRows
 */
export function getBackgroundLayer(config, theme) {    
    const { orientation } = config.general;

    if (orientation === 'horizontal') 
        return getHorizontalBackgroundLayer(config, theme);
    return getVerticalBackgroundLayer(config, theme);
}

/**
 * @param {Object} config config object to refer `gridWidth`, `gridHeight`, `gap` and most importantly `orientation`.
 * @param {Theme} theme Theme object to refer `oddRowColor`, `evenRowColor` and `backgroundColor`
 * @returns {Konva.Layer} Konva layer containing the background, oddRows and evenRows
 */
function getVerticalBackgroundLayer(config, theme) {
    const { gridWidth, gridHeight, gap } = config.grid;
    const { oddRowColor, evenRowColor, backgroundColor } = theme;
    const width = 8 * gridWidth + 9 * gap;
    const height = 25 * gridHeight + 26 * gap;

    const layer = new Konva.Layer();

    appendRect(layer, {
        fill: backgroundColor,
        width, height
    });

    // 24 rows
    for (let i = 0; i < 25; ++i) {
        // 8 columns
        for (let j = 0; j < 8; ++j) {
            appendRect(layer, {
                fill: (j & 1)? oddRowColor: evenRowColor,
                width: gridWidth, 
                height: gridHeight,
                x: gap + ( gridWidth + gap ) * j,
                y: gap + ( gridHeight + gap ) * i,
            });
        }
    }
    return layer;
}


/**
 * @param {Object} config config object to refer `gridWidth`, `gridHeight`, `gap` and most importantly `orientation`.
 * @param {Theme} theme Theme object to refer `oddRowColor`, `evenRowColor` and `backgroundColor`
 * @returns {Konva.Layer} Konva layer containing the background, oddRows and evenRows
 */
 function getHorizontalBackgroundLayer(config, theme) {
    const { gridWidth, gridHeight, gap } = config.grid;
    const { oddRowColor, evenRowColor, backgroundColor } = theme;
    const width = 25 * gridWidth + 26 * gap;
    const height = 8 * gridHeight + 9 * gap;

    const layer = new Konva.Layer();

    // Background
    appendRect( layer, {
        fill: backgroundColor,
        width, height,
    });

    // 8 rows
    for (let i = 0; i < 8; ++i) {
        // 24 columns
        for (let j = 0; j < 25; ++j) {
            appendRect(layer, {
                fill: (i & 1)? oddRowColor: evenRowColor,
                width: gridWidth,
                height: gridHeight,
                x: gap + ( gridWidth + gap ) * j,
                y: gap + ( gridHeight + gap ) * i,
            });
        }
    }

    return layer;
}