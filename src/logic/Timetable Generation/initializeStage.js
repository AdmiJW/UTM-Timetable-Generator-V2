import Konva from 'konva';


/**
 * @param {HTMLDivElement} div The div for the Konva to initialize the stage at.
 * @param {Object} config The state from `configurationSlice.js` We want the gridWidth, gridHeight, gap, orientation from it.
 * @returns {Konva.Stage} Konva Stage
 */
export function initializeStage(div, config) {
    const { orientation } = config.general;
    const { gridWidth, gridHeight, gap } = config.grid;

    // HORIZONTAL
    if (orientation === 'horizontal') {
        const width = 25 * gridWidth + 26 * gap;
        const height = 8 * gridHeight + 9 * gap;
    
        return new Konva.Stage({
            container: div,
            width, height
        });
    }
    // VERTICAL
    const width = 8 * gridWidth + 9 * gap;
    const height = 25 * gridHeight + 26 * gap;

    return new Konva.Stage({
        container: div,
        width, height
    });
}