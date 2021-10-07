# 📅 UTM Timetable Generator V2 📅

### - [__Application Link HERE__](https://admijw.github.io/UTM-Timetable-Generator-V2/) -

Timetable Generator specifically for UTM students. The sequel of the previous [Timetable Generator](https://github.com/AdmiJW/UTM_Timetable_Generator) but now back stronger. Students from other universities are able to use this timetable generator if they don't mind filling in their courses manually.

![Screenshot of the application](/public/img/tutorial4_guide.png)

## Features:

* Browse from a list of courses and add them quickly into your timetable.
* Ability to save and load timetable. 
* Clash checking. Notifies user when there is a clash in the timetable
* Stylized and customizable timetable. Set themes, font-sizes, grid sizes, number of columns
* Further customization available. Every course can be drawn in the color you want, by selecting __Custom__ as your __Theme__ option.
* Downloadable timetable in png format

<br>
---
<br>

## Dependencies:

* Modern [React](https://reactjs.org/). Unlike previous generator, this time no `class` components, only `function` components with `hooks`.
* Modern [Redux](https://redux-toolkit.js.org/) using Redux toolkit. Writing in pure redux (previous project) is quite painful.
* [SASS](https://sass-lang.com/) - css

Other dependencies:

* [KonvaJS](https://konvajs.org/) - Main library used to draw the timetable. Great for drawing on HTML Canvas
* [react-markdown](https://github.com/remarkjs/react-markdown) - React and markdown.

## Project Structure

* `components` - React components. May be further broken down into Routes.
* `logic` - Contains logic code. For example, clash checking, timetable drawing using `Konva`
* `redux` - Redux (Toolkit). Contains the redux store, and `slices` of redux state.
* `styles` - SASS stylesheets. The `main.css` generated is used in the application.

<br>