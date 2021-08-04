import React, { useState, useEffect } from 'react';
import '../App.css';

export default function HomePage() {
    const [decks, setDecks] = useState([])
    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + 'decks', { method: 'GET', mode: 'cors' })
            .then(res => res.json())
            .then(data => setDecks(data))
    }, []);
    return (<div>Decks: {decks.map(d => <div key={d.id}>{d.name}</div>)}</div>)
}