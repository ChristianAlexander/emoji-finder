
import React, { useState, useMemo } from 'react';
import emoji from 'unicode-emoji-json/data-by-emoji.json';
import Fuse from 'fuse.js';

// { "emoji" : {"name": "foo"}}
const allEmoji = Object.entries(emoji).map(([emojiLiteral, properties]) => (
    { emoji: emojiLiteral, name: properties.name }
));

function formatMatch({ indices, value }) {
    let lastIndex = 0;
    return (
        <span>
            {indices.map(([start, end], index) => {
                const nonMatch = value.slice(lastIndex, start);
                lastIndex = end + 1;
                const match = value.slice(start, lastIndex);
                return (
                    <React.Fragment key={index}>
                        {nonMatch}
                        <b>{match}</b>
                    </React.Fragment>
                );
            })}
            {value.slice(lastIndex)}
        </span>
    );
}

export function useEmojiSearch({ filter = "", limit = 100 }) {
    const fuse = useMemo(() => new Fuse(allEmoji, { keys: ['name'], includeMatches: true, threshold: 0.35 }), []);

    if (filter === "") {
        return { result: allEmoji.slice(0, limit), count: allEmoji.length}
    }

    const filteredEmoji = fuse.search(filter).map(result => ({
        ...result.item, displayName: formatMatch(result.matches[0])
    }));

    return { result: filteredEmoji.slice(0, limit), count: filteredEmoji.length }
}
