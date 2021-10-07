
/**
 *
 * @param {Konva.Stage} stage Konva stage to extract the timetable from into DataURL
 * @param {Object} config `configurationSlice.js`'s state - Used to extract informations like `gridHeight`, `gridWidth`
 *      etc
 * @returns {string} The DataURL of the extracted part.
 */
export function dataURLExtractor(stage, config) {
    const { orientation } = config.general;
    if (orientation === 'horizontal')
        return horizontalDataURLExtractor(stage, config);
    return verticalDataURLExtractor(stage, config);
}


/**
 * @param {Konva.Stage} stage Konva stage to extract the timetable from into DataURL
 * @param {Object} config `configurationSlice.js`'s state - Used to extract informations like `gridHeight`, `gridWidth`
 *      etc
 * @returns {string} The DataURL of the extracted part.
 */
function horizontalDataURLExtractor(stage, config) {
    const { gridWidth, gridHeight, gap } = config.grid;
    const { weekends, timeframeBegin, timeframeEnd } = config.general;

    const y = weekends === 'sat/sun'?
        gap + gridHeight:
        0;
    const height = weekends === 'all'?
            (8 * gridHeight) + (9 * gap):
            (6 * gridHeight) + (7 * gap);

    const x = (gap + gridWidth) * timeframeBegin;
    const width = gap + (timeframeEnd - timeframeBegin + 1) * (gridWidth + gap);
        
    return stage.toDataURL({
        x, y, width, height
    });
}



/**
 * @param {Konva.Stage} stage Konva stage to extract the timetable from into DataURL
 * @param {Object} config `configurationSlice.js`'s state - Used to extract informations like `gridHeight`, `gridWidth`
 *      etc
 * @returns {string} The DataURL of the extracted part.
 */
function verticalDataURLExtractor(stage, config) {
    const { gridWidth, gridHeight, gap } = config.grid;
    const { weekends, timeframeBegin, timeframeEnd } = config.general;

    const x = weekends === 'sat/sun'?
        gap + gridWidth:
        0;
    const width = weekends === 'all'?
            (8 * gridWidth) + (9 * gap):
            (6 * gridWidth) + (7 * gap);

    const y = (gap + gridHeight) * timeframeBegin;
    const height = gap + (timeframeEnd - timeframeBegin + 1) * (gridHeight + gap);
        
    return stage.toDataURL({
        x, y, width, height
    });
}