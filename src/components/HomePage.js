import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../App.css';

export default function HomePage() {
    const [decks, setDecks] = useState([])
    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + 'decks', { method: 'GET', mode: 'cors' })
            .then(res => res.json())
            .then(data => setDecks(data))
    }, []);

    const deckLinks = decks.map(d =>
        <div key={d.id}>
            <Link to={`/${d.id}`}>{d.name}</Link>
        </div>
    )

    return (
        <div>
            Decks: {deckLinks}
        </div>
    )
}