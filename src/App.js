
import React, { useState } from 'react';
import { useCopyToClipboard } from 'usehooks-ts'

import { useEmojiSearch } from './use-emoji-search'

function App() {
  const [filterValue, setFilterValue] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [copiedText, copy] = useCopyToClipboard();

  const { result: filteredEmoji, count } = useEmojiSearch({ filter: filterValue });

  const reset = () => {
    setFilterValue("");
    setSelectedEmoji(null);
    copy("");
  }

  return (
    <div className="window" style={{ maxWidth: 500 }}>
      <div className="title-bar">
        <div className="title-bar-text">Emoji Search</div>
      </div>
      <div className="window-body">
        <div className="field-row" style={{ marginBottom: 12 }}>
          <label>Filter</label>
          <input value={filterValue} onChange={e => setFilterValue(e.target.value)} type="text" style={{ flex: 1 }} />
          <button onClick={reset}>Reset</button>
        </div>
        <div className="sunken-panel" style={{ height: 300 }}>
          <table className="interactive" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Emoji</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmoji.map(({ emoji, name, displayName }) => (
                <tr key={emoji} onClick={() => setSelectedEmoji(emoji)} className={emoji === selectedEmoji ? 'highlighted' : ''}>
                  <td>{emoji}</td>
                  <td>{displayName ?? name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedEmoji && (
          <fieldset style={{ marginTop: 12 }}>
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, cursor: 'pointer' }}
              onClick={() => copy(selectedEmoji)}
            >{selectedEmoji}</div>
          </fieldset>
        )}
      </div>
      <div className="status-bar">
        <p className="status-bar-field" style={{lineHeight: 2}}>Showing {filteredEmoji.length} / {count} results</p>
        {copiedText && (
          <p className="status-bar-field" style={{lineHeight: 2}}>Copied {copiedText} to clipboard</p>
        )}
      </div>
    </div>
  );
}

export default App;
