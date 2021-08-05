import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';
import '../App.css';

export default function DeckPage() {
    const { deckId } = useParams();
    const [packs, setPacks] = useState([]);
    const [selectedPacks, setSelectedPacks] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + 'decks/' + deckId + '/packs', { method: 'GET', mode: 'cors' })
            .then(res => res.json())
            .then(data => {
                setPacks(data);
                const initialSelectedPacks = initializeSelectedPacks(data)
                setSelectedPacks(initialSelectedPacks);
                loadHand(initialSelectedPacks)
            });
        // eslint-disable-next-line
    }, [deckId]);

    function initializeSelectedPacks(packData) {
        return packData.reduce((selectedPacks, pack) => {
            selectedPacks[pack.id] = true;
            return selectedPacks;
        }, {});
    }

    function handleCheckboxChange(event) {
        setSelectedPacks({
            ...selectedPacks,
            [event.target.value]: !selectedPacks[event.target.value]
        });
    }

    function create_pack_url_string(selectedPacks) {
        const selected_pack_ids = Object.entries(selectedPacks)
            .filter(([id, isSelected]) => isSelected)
            .map(keyValuePair => keyValuePair[0])
        return selected_pack_ids.map(pack_id => `pack=${pack_id}`).join('&')
    }

    function handleReroll(category_id, index) {
        const api_url = process.env.REACT_APP_API_URL + 'decks/' + deckId + '/random/card?category=' + category_id + '&' + create_pack_url_string(selectedPacks)
        fetch(api_url, { method: 'GET', mode: 'cors' })
            .then(res => res.json())
            .then(data => {
                const newCards = [...cards];
                newCards[index] = data;
                setCards(newCards);
            });
    }

    function loadHand(selectedPacks) {
        const api_url = process.env.REACT_APP_API_URL + 'decks/' + deckId + '/random/hand?' + create_pack_url_string(selectedPacks)
        fetch(api_url, { method: 'GET', mode: 'cors' })
            .then(res => res.json())
            .then(data => setCards(data));
    }

    function handleSubmit(event) {
        loadHand(selectedPacks);
        event.preventDefault();
    }

    const packDivs = packs.map(p =>
        <div key={p.id}>
            <input
                type='checkbox'
                name={p.name}
                value={p.id}
                checked={!!selectedPacks[p.id]}
                onChange={handleCheckboxChange}
            />
            <label htmlFor={p.name}>{p.name}</label>
        </div>
    )
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {packDivs}
                <input type='submit' value='Draw New Hand' />
            </form>
            <div className='hand'>
                {
                    cards.map((card, index) =>
                        <Card
                            key={card.id}
                            category={card.category}
                            pack={card.pack}
                            cue={card.cue}
                            handleReroll={() => handleReroll(card.category_id, index)}
                        />
                    )
                }
            </div>
        </div>
    )
}