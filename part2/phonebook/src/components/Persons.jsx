const Button = (props) => {
  return (
    <button onClick={props.onClick} type="submit">delete</button>
  )
}

const Persons = (props) => {
    return (
      <>
        {props.ar.map(
          person => <div key={person.id}>
            {person.name} {person.number} <Button onClick={() => props.onClick(person.id)}/>
          </div>
        )}
      </>
    )
  }

  export default Persons