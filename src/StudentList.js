import { useState } from 'react';
import Student from './Student';
import './StudentList.css';

function StudentList({ studentList, tagHandler }) {
  // Initializing stateful values
  const [searchCriteria, setSearchCriteria] = useState('');
  const [tagSearchCriteria, setTagSearchCriteria] = useState('');

  return (
    <div className="container">
      <label htmlFor="studentSearch">
        <input // Updates searchCriteria on input
          onChange={(event) => {
            setSearchCriteria(event.target.value);
          }}
          id="studentSearch"
          type="search"
          name="studentSearch"
          placeholder="Search by name"
        ></input>
      </label>
      <label htmlFor="tagSearch">
        <input
          onChange={(event) => {
            // Updates tagSearchCriteria on input
            setTagSearchCriteria(event.target.value);
          }}
          id="tagSearch"
          name="tagSearch"
          type="search"
          placeholder="Search by tag"
        ></input>
      </label>
      {studentList
        .filter((student) => {
          // Filters by searchCriteria value against firstName and lastName properties from studentList props
          if (searchCriteria === '') {
            return student;
          } else if (
            student.firstName
              .toLowerCase()
              .includes(searchCriteria.toLowerCase()) ||
            student.lastName
              .toLowerCase()
              .includes(searchCriteria.toLowerCase()) ||
            `${student.firstName} ${student.lastName}`
              .toLowerCase()
              .includes(searchCriteria.toLowerCase())
          ) {
            return student;
          }
        })
        .map(
          // Renders a Student component per student object from StudentList passing props to each component
          (
            { id, pic, firstName, lastName, email, company, skill, grades },
            index,
          ) => (
            <Student
              key={index}
              pic={pic}
              firstName={firstName}
              lastName={lastName}
              email={email}
              company={company}
              skill={skill}
              grades={grades}
              tagSearchCriteria={tagSearchCriteria}
            />
          ),
        )}
    </div>
  );
}

export default StudentList;
