import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({onClick, text}) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const Statistics = (props) => {
    if (props.good > 0 || props.neutral > 0 || props.bad > 0) {
        const average = (props.good - props.bad) / props.total;
        const positive = props.good * 100 / props.total
        return (
            <>
                <h2>{props.title}</h2>
                <table><tbody>
                    <Statistic text="good" value={props.good} />
                    <Statistic text="neutral" value={props.neutral} />
                    <Statistic text="bad" value={props.bad} />
                    <Statistic text="all" value={props.total} />
                    <Statistic text="average" value={average} />
                    <Statistic text="positive" value={positive} />
                </tbody></table>
                
            </>
        )
    } else {
        return (
            <>
                <h2>{props.title}</h2>
                <p>No feedback given yet</p>
            </>
        )
    }   
}

const Statistic = ({text, value}) => (
    <tr>
        <th>{text}</th>
        <td>{value}</td>
    </tr>
)

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const total = good + bad + neutral

    return (
        <>
            <h1>Give feedback</h1>
            <Button onClick={() => setGood(good+1)} text="good" />
            <Button onClick={() => setNeutral(neutral+1)} text="neutral" />
            <Button onClick={() => setBad(bad+1)} text="bad" />

            <Statistics title="Statistics"
                        good={good}
                        neutral={neutral}
                        bad={bad}
                        total={total}
            />
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
