import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [openIndexes, setOpenIndexes] = useState([]);

  const faqs = [
    {
      question: 'What is the newsletter about?',
      answer: 'Our newsletter provides personalized updates on NFL and NBA teams, delivered weekly to your inbox.',
    },
    {
      question: 'How can I track my favorite teams?',
      answer: 'You can easily follow your favorite teams directly in the newsletter interface.',
    },
    {
      question: 'Is the newsletter free?',
      answer: 'Yes, the newsletter is completely free to subscribe to and receive.',
    },
    {
      question: 'How often will I receive updates?',
      answer: 'You will receive updates once a week with game results and news on your favorite teams.',
    },
  ];

  const toggleAnswer = (index) => {
    setOpenIndexes((prevIndexes) => {
      if (prevIndexes.includes(index)) {
        // If the index is already open, remove it
        return prevIndexes.filter((i) => i !== index);
      } else {
        // Otherwise, add the index to the open list
        return [...prevIndexes, index];
      }
    });
  };

  return (
    <div className="faq-container">
      <div className="faq-title">FAQ</div>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className="faq-question"
              onClick={() => toggleAnswer(index)}
            >
              {faq.question}
            </div>
            <div
              className={`faq-answer ${openIndexes.includes(index) ? 'open' : ''}`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
