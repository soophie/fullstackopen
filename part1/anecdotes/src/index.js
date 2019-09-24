import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({onClick, text}) => (
    <button onClick={onClick}>{text}</button>
)

const Statistics = (props) => {
  console.log(props);
  return (
    <>
      <h2>Anecdotes with the most votes</h2>
      <p>{props.anecdote}</p>
      <Vote vote={props.rating} />
    </>
  )
}

const Vote = ({vote}) => {
  return (
    <p>has {vote} votes</p>
  )
}

const App = (props) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVote] = useState(props.anecdotes.map(anecdote => 0));
    const bestVote = votes.indexOf(Math.max.apply(Math, votes));
    
    const increaseVoting = (selected) => {
        const copy = [...votes];
        copy[selected] += 1;
        setVote(copy);
    }

    const setRandom = () => {
      const random = Math.floor(Math.random() * props.anecdotes.length);
      setSelected(random)
    }

    return (
      <div>
        <p>{props.anecdotes[selected]}</p>
        <Vote vote={votes[selected]} />
        <Button onClick={() => increaseVoting(selected)} text="vote" />
        <Button onClick={() => setRandom()} text="random" />
        <Statistics anecdote={props.anecdotes[bestVote]} rating={votes[bestVote]}  />
      </div>
    )
  }
  
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  
  ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
  )
