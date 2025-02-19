"use client"

import { useState } from "react"
import questions from "./data/questions.json"

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [answers, setAnswers] = useState<{ label: string; price: number }[]>(Array(questions.length).fill(null))

  const handleOptionSelect = (option: { label: string; price: number }) => {
    const newAnswers = [...answers]
    newAnswers[currentIndex] = option
    setAnswers(newAnswers)
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleGoBack = () => {
    if (currentIndex > 0) {
      const newAnswers = [...answers]
      newAnswers[currentIndex - 1] = null // 戻ったらその質問の回答を削除
      setAnswers(newAnswers)
      setCurrentIndex(currentIndex - 1)
    }
  }

  const totalPrice = answers.reduce((sum, item) => sum + (item ? item.price : 0), 0)

  return (
    <div className="app">
      <p>Sakura Instsu Webteam</p>
      <h1>見積もりシミュレーション</h1>
      <p>version 2.02</p>
      {currentIndex < questions.length ? (
        <div className="content">
          <h2>{questions[currentIndex].question}</h2>
          {questions[currentIndex].options ? (
            <div className="question">
              {questions[currentIndex].options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option.label} (¥{option.price.toLocaleString()})
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <div>
          <h2>ありがとうございました！</h2>
          <p>以上です。</p>
        </div>
      )}

      <button onClick={handleGoBack} disabled={currentIndex === 0}>
        前の質問に戻る
      </button>

      <div className="summary">
        <h2>現在の合計: ¥{totalPrice.toLocaleString()}</h2>
        <ul>
          {answers.map((answer, index) => (
            answer ? (
              <li key={index}>
                {questions[index].question}: {answer.label} (¥{answer.price.toLocaleString()})
              </li>
            ) : null
          ))}
        </ul>
      </div>
    </div>
  )
}