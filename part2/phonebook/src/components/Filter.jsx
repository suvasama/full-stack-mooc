const Filter = (props) => {
    return (
      <form>
        filter shown with <input 
          name="filter"
          value={props.value}
          onChange={props.onChange}
        />
      </form>
    )
  }

    export default Filter