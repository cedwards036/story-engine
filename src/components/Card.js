import React from 'react';
import '../App.css';

export default function Card(props) {
    return (
        <div className='card-wrapper'>
            <div className='card'>
                <div className='card-header'>{props.category}</div>
                <div className='card-body'>{props.cue}</div>
                <div className='card-footer'>{props.pack}</div>
            </div>
            <button type='button' onClick={props.handleReroll}>Re-Roll</button>
        </div>
    )

}