const Persons = (props) => {
    return (
      <>
        {props.ar.map(
          person => <div key={person.id}>{person.name} {person.number}</div>
        )}
      </>
    )
  }

  export default Persons