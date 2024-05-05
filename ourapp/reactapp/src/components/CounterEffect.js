import React, { useState, useEffect } from 'react';

function CounterEffect() {
  const [count, setCount] = useState(0);

  // "useEffect" is like setting up an alarm or reminder.
  useEffect(() => {
    // This function runs every time the count changes.
    document.title = `You clicked ${count} times`;
  }, [count]); // The [count] tells React to run the function when 'count' changes.

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default CounterEffect;