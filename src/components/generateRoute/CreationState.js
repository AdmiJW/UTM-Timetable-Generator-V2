import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { drawTimetable } from '../../logic/Timetable Generation/drawTimetable';
import { scrollMainContainerTo } from '../../logic/utils';




// Handles "Create" button click
function handleCreateButtonClick(setIsTimetableDrawn, containerRef, courses, config) {
    setIsTimetableDrawn(true);
    drawTimetable(containerRef.current, courses, config);
    scrollMainContainerTo('.creation');
}

// Handles 'Open in new tab' click
function handleOpenInNewTab(containerRef) {
    const w = window.open('');
    w.document.write( containerRef.current.outerHTML );
    w.document.close();
}

// Handles 'Download png' click
function handleDownloadPng(containerRef) {
    const anchor = document.createElement('a');
    anchor.href = containerRef.current.src;
    anchor.download = 'timetable.png';
    anchor.click();
}



function CreationState() {
    const config = useSelector((state)=> state.config);
    const courses = useSelector((state)=> state.classCourses);
    const [ isTimetableDrawn, setIsTimetableDrawn ] = useState(false);
    const timetableImgRef = useRef(null);


    return (
    <section className='generate__section creation'>
        <h4 className='generate__title'>Step 3: Creation 🎇</h4>
        <p className='generate__desc'>Minor lag spike incoming (Don't worry it's normal)</p>

        <div className='creation__btngrp'>
            <button className='creation__btn creation__create' type='button' aria-label='Create timetable' title='Create timetable' 
                onClick={()=> handleCreateButtonClick(setIsTimetableDrawn, timetableImgRef, courses, config) } >
                    Create
            </button>

            {/* Export as png. SHown only after timetable is drawn */}
            {
                isTimetableDrawn?
                <button className='creation__btn creation__png' type='button' aria-label='Download timetable as png image'
                    title='Download timetable as png image' 
                    onClick={ ()=> handleDownloadPng(timetableImgRef) } >
                        Download png
                </button>
                : null
            }

            {/* Open in new tab. SHown only after timetable is drawn */}
            {
                isTimetableDrawn?
                <button className='creation__btn creation__newtab' type='button' aria-label='Open timetable in new tab' 
                    title='Open timetable in new tab' 
                    onClick={ ()=> handleOpenInNewTab(timetableImgRef) } >
                        Open in new tab
                </button>
                : null
            }
        </div>

        <div className='creation__view'>
            <img className='creation__img' alt='generated timetable' id='timetable-img' ref={timetableImgRef} 
                style={ isTimetableDrawn? null: { display: 'none'} } />
        </div>
    </section>
    );
}

export default CreationState;