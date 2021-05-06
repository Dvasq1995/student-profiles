import { useState } from 'react';
import './Student.css';

function Student({
  pic,
  firstName,
  lastName,
  email,
  company,
  skill,
  grades,
  tagSearchCriteria,
}) {
  // Initializing stateful values
  const [toggle, setToggle] = useState(false);
  const [tags, setTags] = useState([]);

  // returns average of grades property
  const calculateGradeAvg = (grades) => {
    const sum = grades.reduce((a, b) => parseFloat(a) + parseFloat(b));
    const average = sum / grades.length;
    return average;
  };

  // Updates tags to input after pressing enter key
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && event.target.value !== '') {
      setTags((tags) => [...tags, event.target.value]);
    }
  };

  // Render only if there is no tag criteria or whether tag criteria exists in tags
  if (tagSearchCriteria === '' || tags.includes(tagSearchCriteria)) {
    return (
      <div className="item_container">
        <div className="item">
          <img className="profile_pic" src={pic} alt="student profile" />
        </div>
        <div className="item">
          <div className="heading_container">
            <h1 className="heading">{`${firstName} ${lastName}`}</h1>
            <div className="item2">
              <button
                className="gradesBtn"
                onClick={(event) => {
                  // Toggles the display of individual grades
                  setToggle(!toggle);
                  console.log(toggle);
                }}
                type="button"
              >
                {!toggle ? '+' : '-'}
              </button>
            </div>
          </div>
          <div className="subheading">
            <p>Email: {email}</p>
            <p>Company: {company}</p>
            <p>Skill: {skill}</p>
            <p>Average: {`${calculateGradeAvg(grades)}%`}</p>
            {tags.length ? (
              <ul>
                {tags.map((
                  tag,
                  index, // Displays tags added
                ) => (
                  <li key={index} className="tag">
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
            <label htmlFor="tagAdd">
              <input
                onKeyPress={handleKeyPress} // Command for adding tags
                className="tagAdd"
                type="text"
                placeholder="Add a tag"
              ></input>
            </label>

            {toggle ? (
              <ul>
                {grades.map((grade, index) => {
                  // Renders all the individual grade percentages
                  return (
                    <li>
                      Test {index + 1}: {grade}%
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Student;
