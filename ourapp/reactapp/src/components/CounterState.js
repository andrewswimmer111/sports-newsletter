import React, { useState } from 'react';

function CounterState() {
  // We're setting up "useState" here to keep track of our count.
  const [count, setCount] = useState(0); // Start counting from zero

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default CounterState;