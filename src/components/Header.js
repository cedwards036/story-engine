import React from 'react';
import { Link } from "react-router-dom";
import '../App.css';

export default function Header() {
    return (
        <header><Link to="/">The Story Engine</Link></header>
    )
}