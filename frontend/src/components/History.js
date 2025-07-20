// import React from 'react';

// function History() {
//   const history = JSON.parse(localStorage.getItem('history') || '[]');
//   return (
//     <div className="mt-4">
//       <h5>Conversion History</h5>
//       <ul className="list-group">
//         {history.map((h, i) => (
//           <li key={i} className="list-group-item">
//             {h.amount} {h.from} ➡️ {h.result} {h.to} at {h.date}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default History;
import React, { useEffect, useState } from 'react';

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('history') || '[]');
    setHistory(saved);
  }, []);

  return (
    <div className="mt-4">
      <h5>Conversion History</h5>
      {history.length === 0 ? (
        <p className="text-muted">No conversion history found.</p>
      ) : (
        <ul className="list-group">
          {history.map((h, i) => (
            <li key={i} className="list-group-item">
              {h.amount} {h.from} ➡️ {h.result} {h.to} <br />
              <small className="text-muted">at {h.date}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History;
