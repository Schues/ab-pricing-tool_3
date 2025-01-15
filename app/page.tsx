// app/page.tsx

"use client"  // これを追加

import { useState } from 'react'
import questions from './data/questions.json'

// interface Option {
//   id: string;
//   label: string;
//   price: number;
// }

// interface Question {
//   id: number;
//   question: string;
//   options: Option[];
// }

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [answers, setAnswers] = useState<number[]>([])

  const handleOptionSelect = (price: number) => {
    setAnswers([...answers, price])
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      alert(`合計金額: ¥${answers.reduce((sum, p) => sum + p, 0) + price}`)
    }
  }

  return (
    <div className="app">
      {currentIndex < questions.length ? (
        <div className="content">
          <h2>{questions[currentIndex].question}</h2>
          <div className='question'>
            {questions[currentIndex].options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.price)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <h2>ありがとうございました！</h2>
      )}
    </div>
  )
}
