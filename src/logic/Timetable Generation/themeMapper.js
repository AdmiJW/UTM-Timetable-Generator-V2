/**
 * ! To add a new theme:
 * !    1. Import font in `main.scss`
 * !    2. In `configurationSlice.js`, include the font as available option in custom configuration
 * !    3. Write up the theme mapping here below
 */
/**
 * @typedef {import('../../redux/slices/configurationSlice').CustomConfig} CustomConfig
 */


/**
 * An object containing informations on how the timetable shall be drawn. This object is usually related to a specific theme.
 * Should resemble the same properties in reduxState.config.custom, so to maintain maximum compatibility between each other.
 * @typedef {Object} Theme
 * @property {string} theme Name of the theme. Easier debug perhaps?
 * @property {string} backgroundColor Base color of the timetable
 * @property {string} fontFamily Font name to be used in the timetable
 * @property {string} labelGridColor The background color for the topleft most grid - Label grid
 * @property {string} labelGridFontColor The font color for the topleft most grid - Label grid
 * @property {string} timeGridColor The background color for the day of week and time grids
 * @property {string} timeGridFontColor The font color for the day of week and time grids
 * @property {string} evenRowColor The background color for every even rows
 * @property {string} oddRowColor The background color for every odd rows
 * @property {string[]} courseBackgroundColors A list of colors that will be used as background of the courses
 * @property {string[]} courseFontColors A list of colors that will be used as font color of the course text
 * 
 */


/** An object that map theme strings to {@link Theme} objects. Used in step 1 - Get timetable properties from
 *  config file
 */
/** @type {Object.<string, Theme>} */
const themeMapper = {
    // Default Theme
    'default': {
        theme: 'default',
        backgroundColor : '#ffffff',
        labelGridColor : '#7f8082',
        timeGridColor : '#70ad46',
        oddRowColor : '#c6e0b3',
        evenRowColor : '#a9d08f',
        fontFamily: 'Roboto',
        labelGridFontColor: '#ffffff',
        timeGridFontColor: '#ffffff',
        courseBackgroundColors: [
            '#3498db',
            '#6ab04c',
            '#e74c3c',
            '#9b59b6',
            '#34495e',
            '#f1c40f',
            '#3a40b6',
            '#2ecc71',
            '#e67e22',
            '#686de0'
        ],
        courseFontColors: [
            '#ffffff'
        ]
    },

    'futuristic': {
        theme: 'futuristic',
        backgroundColor : '#2ecc71',
        labelGridColor : '#000000',
        timeGridColor : '#000000',
        oddRowColor : '#1b242e',
        evenRowColor : '#212d3b',
        fontFamily: 'Orbitron',
        labelGridFontColor: '#29e679',
        timeGridFontColor: '#29e679',
        courseBackgroundColors : [
            '#000000'
        ],
        courseFontColors: [
            '#29e679'
        ]
    }, 

    'cuteness': {
        theme: 'cuteness',
        backgroundColor : '#ffffff',
        labelGridColor : '#ff7199',
        timeGridColor : '#ff7199',
        oddRowColor : '#ffbada',
        evenRowColor : '#ffe2ea',
        fontFamily: 'Grandstander',
        labelGridFontColor: '#ffffff',
        timeGridFontColor : '#ffffff',
        courseBackgroundColors : [
            '#ff90c3'
        ],
        courseFontColors: [
            '#ffffff'
        ]
    },

    'spidey': {
        theme: 'spidey',
        backgroundColor : '#cccee3',
        labelGridColor : '#0861a3',
        timeGridColor : '#0268d7',
        oddRowColor : '#ca141d',
        evenRowColor : '#b31219',
        fontFamily: 'Marvel',
        labelGridFontColor: '#ffffff',
        timeGridFontColor : '#ffffff',
        courseBackgroundColors : [
            '#8f0505'
        ],
        courseFontColors: [
            '#ffffff'
        ]
    },

    'nature': {
        theme: 'nature',
        backgroundColor : '#392c1d',
        labelGridColor : '#55422b',
        timeGridColor : '#907a48',
        oddRowColor : '#4f6336',
        evenRowColor : '#4b6b3c',
        fontFamily: 'Cantora One',
        labelGridFontColor: '#e6deb9',
        timeGridFontColor : '#3b2e1e',
        courseBackgroundColors : [
            '#d4bf88'
        ],
        courseFontColors: [
            '#3b2e1e'
        ]
    }
};


/**
 * @param {Object} config The state (slice) of `configurationSlice.js`. Used to map themes
 * @returns {(Theme | CustomConfig)} The theme details to be used to draw the timetable.
 */
export function mapToTheme(config) {
    if (config.general.theme === 'custom')
        return config.custom;
    return themeMapper[config.general.theme];
}