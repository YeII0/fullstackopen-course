import React from 'react'

const Course = ({course}) => {
  return (
    <div>
      <Header courseName={course.name}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

const Header = ({courseName}) => {
  return (
    <h1>{courseName}</h1>
  )
}

const Content = ({course}) => {
  return (
    <div>
    {course.parts.map(
      part => <Part key={part.id} part={part.name} exercises={part.exercises}/>
      )
    }
    </div>
  )
}

const Part = ({part, exercises}) => {
  return (
    <p>
      {part} {exercises}
    </p>
  )
}

const Total = ({course}) => {
  return (
    <p>
      <b>
        Number of exercises: {
          course.parts.reduce((total, part) => total + part.exercises, 0)
        }
      </b>
    </p>
  )
}

export default Course