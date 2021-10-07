import Konva from 'konva';
import { appendRect, appendText } from './KonvaUtils';
import { getTimeString, getTimeCode } from '../utils';

/**
 * @typedef {import('./themeMapper').Theme} Theme
 */



/**
 * @param {Object} config config object to refer `gridWidth`, `gridHeight`, `gap`, `orientation`, `weekend`, `beginTime`
 *      `endTime` etc which dictates how the timetable label and timegrid position and drawn
 * @param {Theme} theme Theme object to refer background color, font color and font.
 * @returns {Konva.Layer} Konva layer containing the background, oddRows and evenRows
 */
export function getLabelAndTimeLayer(config, theme) {
    const { orientation } = config.general;

    if (orientation === 'horizontal') 
        return getHorizontalLabelAndTimeLayer(config, theme);
    return getVerticalLabelAndTimeLayer(config, theme);
}


/**
 * @param {Object} config config object to refer `gridWidth`, `gridHeight`, `gap`, `orientation`, `weekend`, `beginTime`
 *      `endTime` etc which dictates how the timetable label and timegrid position and drawn
 * @param {Theme} theme Theme object to refer background color, font color and font.
 * @returns {Konva.Layer} Konva layer containing the background, oddRows and evenRows
 */
function getVerticalLabelAndTimeLayer(config, theme) {
    const layer = new Konva.Layer();
    drawDayOfWeekVertical(layer, config, theme);
    drawLabelGridVertical(layer, config, theme);
    drawTimeGridVertical(layer, config, theme);
    return layer;
}




/**
 * @param {Object} config config object to refer `gridWidth`, `gridHeight`, `gap`, `orientation`, `weekend`, `beginTime`
 *      `endTime` etc which dictates how the timetable label and timegrid position and drawn
 * @param {Theme} theme Theme object to refer background color, font color and font.
 * @returns {Konva.Layer} Konva layer containing the background, oddRows and evenRows
 */
 function getHorizontalLabelAndTimeLayer(config, theme) {
    const layer = new Konva.Layer();
    drawDayOfWeekHorizontal(layer, config, theme);
    drawLabelGridHorizontal(layer, config, theme);
    drawTimeGridHorizontal(layer, config, theme);
    return layer;
}


// * =======================================
// * Day Of Week
// * =======================================
/**
 * @param {Konva.Layer} layer The layer to draw on
 * @param {Object} config config object to refer `gridWidth`, `gridHeight`, `gap`, `orientation`, `weekend`, `beginTime`
 *      `endTime` etc which dictates how the timetable label and timegrid position and drawn
 * @param {Theme} theme Theme object to refer background color, font color and font.
 */
function drawDayOfWeekHorizontal(layer, config, theme) {
    const { weekends, timeframeBegin } = config.general;
    const { gridWidth, gridHeight, gap, courseNameFontSize } = config.grid;
    const { timeGridColor, timeGridFontColor, fontFamily } = theme;
    const x = gap + (gap + gridWidth) * timeframeBegin;

    // Day of Weeks
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].forEach((v,i)=> {
        if (i === 0 && weekends === 'sat/sun') return;
        if (i === 5 && weekends === 'fri/sat') return;
        if (i === 6 && weekends !== 'all') return;

        const y = gap + (gap + gridHeight) * (i + 1);

        // Background
        appendRect(layer, {
            fill: timeGridColor,
            x, y,
            width: gridWidth,
            height: gridHeight,
        });

        // Texts
        appendText(layer, {
            fontFamily,
            fontSize: courseNameFontSize,
            fontStyle: 'bold',
            fill: timeGridFontColor,
            text: v,
            x, y,
            width: gridWidth,
            height: gridHeight
        });
    });
}

/**
 * @param {Konva.Layer} layer The layer to draw on
 * @param {Object} config config object to refer `gridWidth`, `gridHeight`, `gap`, `orientation`, `weekend`, `beginTime`
 *      `endTime` etc which dictates how the timetable label and timegrid position and drawn
 * @param {Theme} theme Theme object to refer background color, font color and font.
 */
 function drawDayOfWeekVertical(layer, config, theme) {
    const { weekends, timeframeBegin } = config.general;
    const { gridWidth, gridHeight, gap, courseNameFontSize } = config.grid;
    const { timeGridColor, timeGridFontColor, fontFamily } = theme;
    const y = gap + (gap + gridHeight) * timeframeBegin;

    // Day of Weeks
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].forEach((v,i)=> {
        if (i === 0 && weekends === 'sat/sun') return;
        if (i === 5 && weekends === 'fri/sat') return;
        if (i === 6 && weekends !== 'all') return;

        const x = gap + (gap + gridWidth) * (i + 1);

        // Background
        appendRect(layer, {
            fill: timeGridColor,
            x, y,
            width: gridWidth,
            height: gridHeight,
        })

        // Texts
        appendText(layer, {
            fontFamily,
            fontSize: courseNameFontSize,
            fontStyle: 'bold',
            fill: timeGridFontColor,
            text: v,
            x, y,
            width: gridWidth,
            height: gridHeight,
        });
    });
}




// * =======================================
// * Label Grid
// * =======================================
/**
 * @param {Konva.Layer} layer The layer to draw on
 * @param {Object} config config object to refer `gridWidth`, `gridHeight`, `gap`, `weekend`, `beginTime`
 *      etc which dictates how the timetable label and timegrid position and drawn
 * @param {Theme} theme Theme object to refer background color, font color and font.
 */
function drawLabelGridHorizontal(layer, config, theme) {
    const { weekends, timeframeBegin } = config.general;
    const { gridWidth, gridHeight, gap, courseNameFontSize } = config.grid;
    const { backgroundColor, labelGridColor, labelGridFontColor, fontFamily } = theme;

    const y = weekends === 'sat/sun'?
        gap + gridHeight + gap:
        gap;
    const x = gap + (gridWidth + gap) * timeframeBegin;

    // Cover with background color first
    appendRect(layer, {
        x, y,
        width: gridWidth, height: gridHeight,
        fill: backgroundColor
    });

    // Divide into 2 halves
    const lowerY = y + (gridHeight / 2) + (gap / 2);
    const halfHeight = (gridHeight / 2) - (gap / 2);

    // Upper half
    appendRect(layer, {
        fill: labelGridColor,
        x, y,
        width: gridWidth, height: halfHeight
    });
    appendText(layer, {
        text: 'Time',
        fontFamily,
        fontSize: courseNameFontSize,
        fontStyle: 'bold',
        fill: labelGridFontColor,
        x, y,
        width: gridWidth, height: halfHeight,
    });


    appendRect(layer, {
        fill: labelGridColor,
        x, y: lowerY,
        width: gridWidth, height: halfHeight
    });
    appendText(layer, {
        text: 'Day of Week',
        fontFamily,
        fontSize: courseNameFontSize,
        fontStyle: 'bold',
        fill: labelGridFontColor,
        x, y: lowerY,
        width: gridWidth, height: halfHeight,
    });
}



/**
 * @param {Konva.Layer} layer The layer to draw on
 * @param {Object} config config object to refer `gridWidth`, `gridHeight`, `gap`, `weekend`, `beginTime`
 *      etc which dictates how the timetable label and timegrid position and drawn
 * @param {Theme} theme Theme object to refer background color, font color and font.
 */
 function drawLabelGridVertical(layer, config, theme) {
    const { weekends, timeframeBegin } = config.general;
    const { gridWidth, gridHeight, gap, courseNameFontSize } = config.grid;
    const { backgroundColor, labelGridColor, labelGridFontColor, fontFamily } = theme;

    const x = weekends === 'sat/sun'?
        gap + gridWidth + gap:
        gap;
    const y = gap + (gridHeight + gap) * timeframeBegin;

    // Cover with background color
    appendRect(layer, {
        x, y,
        width: gridWidth, height: gridHeight,
        fill: backgroundColor
    });

    // Divide into 2 halves
    const lowerY = y + (gridHeight / 2) + (gap / 2);
    const halfHeight = (gridHeight / 2) - (gap / 2);

    // Upper half
    appendRect(layer, {
        fill: labelGridColor,
        x, y,
        width: gridWidth, height: halfHeight
    });
    appendText(layer, {
        text: 'Day of Week',
        fontFamily,
        fontSize: courseNameFontSize,
        fontStyle: 'bold',
        fill: labelGridFontColor,
        x, y,
        width: gridWidth, height: halfHeight,
    });


    appendRect(layer, {
        fill: labelGridColor,
        x, y: lowerY,
        width: gridWidth, height: halfHeight
    });
    appendText(layer, {
        text: 'Time',
        fontFamily,
        fontSize: courseNameFontSize,
        fontStyle: 'bold',
        fill: labelGridFontColor,
        x, y: lowerY,
        width: gridWidth, height: halfHeight,
    });
}





// * =======================================
// * Time Grid
// * =======================================
/**
 * @param {Konva.Layer} layer The layer to draw on
 * @param {Object} config config object to refer `gridWidth`, `gridHeight`, `gap`, `weekend`, `beginTime`
 *      etc which dictates how the timetable label and timegrid position and drawn
 * @param {Theme} theme Theme object to refer background color, font color and font.
 */
function drawTimeGridHorizontal(layer, config, theme) {
    const { weekends, timeframeBegin, timeframeEnd } = config.general;
    const { gridWidth, gridHeight, gap, courseNameFontSize } = config.grid;
    const { backgroundColor, timeGridColor, timeGridFontColor, fontFamily } = theme;
    const timeFontSize = courseNameFontSize * 0.75;

    const y = weekends === 'sat/sun'? gap * 2 + gridHeight : gap;
    const lowerY = y + (gridHeight / 2) + (gap / 2);
    const halfHeight =  (gridHeight / 2) - (gap / 2);

    for (let i = timeframeBegin; i < timeframeEnd; ++i) {
        const x = gap + (i+1) * (gap + gridWidth);

        // Fill with background first
        appendRect(layer, {
            fill: backgroundColor,
            x, y,
            height: gridHeight, width: gridWidth
        });

        // Upper half
        appendRect(layer, {
            fill: timeGridColor,
            x, y,
            height: halfHeight, width: gridWidth
        });
        appendText(layer, {
            text: `${getTimeString(i)}\n${getTimeString(i+1)}`,
            fontFamily,
            fontSize: timeFontSize,
            fill: timeGridFontColor,
            x, y,
            height: halfHeight, width: gridWidth,
            lineHeight: 1.6,
        });

        // Lower half
        appendRect(layer, {
            fill: timeGridColor,
            x, y: lowerY,
            height: halfHeight, width: gridWidth
        });
        appendText(layer, {
            text: `${getTimeCode(i)}`,
            fontFamily,
            fontSize: courseNameFontSize,
            fontStyle: 'bold',
            fill: timeGridFontColor,
            x, y: lowerY,
            height: halfHeight, width: gridWidth,
        });
    }
}



/**
 * @param {Konva.Layer} layer The layer to draw on
 * @param {Object} config config object to refer `gridWidth`, `gridHeight`, `gap`, `weekend`, `beginTime`
 *      etc which dictates how the timetable label and timegrid position and drawn
 * @param {Theme} theme Theme object to refer background color, font color and font.
*/
function drawTimeGridVertical(layer, config, theme) {
    const { weekends, timeframeBegin, timeframeEnd } = config.general;
    const { gridWidth, gridHeight, gap, courseNameFontSize } = config.grid;
    const { timeGridColor, timeGridFontColor, fontFamily } = theme;
    const timeFontSize = courseNameFontSize * 0.75;

    const x = weekends === 'sat/sun'? gap * 2 + gridWidth : gap;
    const quarterHeight = (gridHeight * 0.25);

    for (let i = timeframeBegin; i < timeframeEnd; ++i) {
        const y = gap + (i+1) * (gap + gridHeight);
        const lowerY = y + (gridHeight * 0.75);

        // Fill with background first
        appendRect(layer, {
            fill: timeGridColor,
            x, y,
            height: gridHeight, width: gridWidth
        });

        // Upper half
        appendText(layer, {
            text: `${getTimeString(i)}\n${getTimeString(i+1)}`,
            fontFamily,
            fontSize: timeFontSize,
            fill: timeGridFontColor,
            x, y,
            height: gridHeight - quarterHeight, width: gridWidth,
            lineHeight: 1.6,
        });

        // Lower half
        appendText(layer, {
            text: `${getTimeCode(i)}`,
            fontFamily,
            fontSize: courseNameFontSize,
            fontStyle: 'bold',
            fill: timeGridFontColor,
            x, y: lowerY,
            height: quarterHeight, width: gridWidth,
        });
    }
}