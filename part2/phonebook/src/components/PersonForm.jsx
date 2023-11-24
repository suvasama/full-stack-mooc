const Form = ({text, id, value, onChange}) => {
  return (
    <div>
      {text}: <input 
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

const PersonForm = (props) => {
    return (
      <form onSubmit={props.onSubmit}>
        <Form 
          id={props.person.id} 
          text='name' 
          value={props.person.name} 
          onChange={props.changeName}
        />
        <Form 
          id={props.person.id*10} 
          text='number' 
          value={props.person.number} 
          onChange={props.changeNumber}
        />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }
  
  export default PersonForm
