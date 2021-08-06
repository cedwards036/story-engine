import React from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import { ReactComponent as Hamburger } from './hamburger_icon.svg'

export default function Header(props) {
    return (
        <header>
            <button onClick={props.openSidebar}>
                <Hamburger height={20} width={20} />
            </button>
            <Link to="/">The Story Engine</Link>
        </header>
    )
}