import { useState } from 'react'

const Statistics = (props) => {
  const StatisticsLine = (props) => {
    if (props.text=="positive") {
      return (
        <tr>
          <td>{props.text}</td>
          <td>{props.value} %</td>
        </tr>
      )
    }
    return (
      <tr>
        <td>{props.text}</td> 
        <td>{props.value}</td>
      </tr>
    )
  }
  if (props.total==0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={props.clicks.good}/>
        <StatisticsLine text="neutral" value={props.clicks.neutral}/>
        <StatisticsLine text="bad" value={props.clicks.bad}/>
        <StatisticsLine text="all" value={props.total}/>
        <StatisticsLine text="average" value={(props.clicks.good - props.clicks.bad) / props.total}/>
        <StatisticsLine text="positive" value={props.clicks.good / props.total*100}/>
      </tbody>
    </table>
  )
}

const App = () => {
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0
  })
  const [total, setTotal] = useState(0)
  const handleGood = () => {
    const updatedGood = clicks.good + 1
    setClicks({...clicks, good: updatedGood})
    setTotal(updatedGood + clicks.neutral + clicks.bad)
  }
  const handleNeutral = () => {
    const updatedNeutral = clicks.neutral + 1
    setClicks({...clicks, neutral: updatedNeutral})
    setTotal(clicks.good + updatedNeutral + clicks.bad)
}
  const handleBad = () => {
    const updatedBad = clicks.bad + 1
    setClicks({...clicks, bad: updatedBad})
    setTotal(clicks.good + clicks.neutral + updatedBad)
}
  const Button = (props) => {
    return (
      <button onClick={props.onClick}>
        {props.text}
      </button>
    )
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button
        onClick={handleGood} 
        text='good'
      />
      <Button 
        onClick={handleNeutral}
        text='neutral'
      />
      <Button 
        onClick={handleBad}
        text='bad'
      />
      <h1>statistics</h1>
      <Statistics
        clicks={clicks}
        total={total}
      />
    </div>
  )
}


export default App