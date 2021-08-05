import React from 'react';
import '../App.css';

export default function Card(props) {
    return (
        <div>
            <div>{props.category}: {props.cue} ({props.pack})</div>
            <button type='button' onClick={props.handleReroll}>Re-Roll</button>
        </div>
    )

}