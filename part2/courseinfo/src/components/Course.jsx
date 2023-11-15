const Title = ({ title }) => <h1>{title}</h1>
const Header = ({ header }) => <h2>{header}</h2>

const Total = ({ parts }) =>  {
  const sum = parts.reduce((total, part) =>
    total + part.exercises,
    0,
  )
  return (
    <p><b>Total of {sum} exercises</b></p>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => 
        <p key={part.id}> 
          {part.name} {part.exercises}
        </p>
      )}
    </>
  )
}

const DisplayCourse = ({course}) => {
  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Course = (props) => {
  return (
    <>
      <Title title={props.title} />
      {props.courses.map(
        course => <DisplayCourse key={course.id} course={course}/>)}
    </>
  )
}

export default Course