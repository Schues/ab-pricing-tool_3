"use client"

import { useState } from "react"
import questions from "./data/questions.json"

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [answers, setAnswers] = useState<{ label: string; price: number }[]>([])

  const handleOptionSelect = (option: { label: string; price: number }) => {
    // すでに回答済みの質問には選択できない
    if (answers.length > currentIndex) return

    setAnswers([...answers, option])
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const totalPrice = answers.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="app">
      <h1>見積もりシミュレーション</h1>
      
      {/* 質問セクション */}
      {currentIndex < questions.length ? (
        <div className="content">
          <h2>{questions[currentIndex].question}</h2>
          <div className="question">
            {questions[currentIndex].options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option)}
                disabled={answers.length > currentIndex} // すでに回答済みなら無効化
              >
                {option.label} (¥{option.price.toLocaleString()})
              </button>
            ))}
          </div>
        </div>
      ) : (
        <h2>ありがとうございました！</h2>
      )}

      {/* 合計金額と選択履歴 */}
      <div className="summary">
        <h2>現在の合計: ¥{totalPrice.toLocaleString()}</h2>
        <ul>
          {answers.map((answer, index) => (
            <li key={index}>
              {questions[index].question}: {answer.label} (¥{answer.price.toLocaleString()})
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
