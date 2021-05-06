import { useState, useEffect } from 'react';
import StudentList from './StudentList';
import './App.css';

function App() {
  const [studentList, setStudentList] = useState([]); // Initial value for studentList

  // Performs a GET request to the API once and updates the studentList stateful value
  useEffect(() => {
    setStudentList(() => []);
    const abortController = new AbortController();

    const loadStudents = async () => {
      try {
        const response = await fetch(
          'https://api.hatchways.io/assessment/students',
          { signal: abortController.signal },
        );
        const { students } = await response.json();
        setStudentList(() => students);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Aborted');
        } else {
          throw error;
        }
      }
    };
    loadStudents();
    return () => abortController.abort();
  }, []);

  // Renders the StudentList component passing studentList as props
  return (
    <div className="main_container">
      <StudentList studentList={studentList} />
    </div>
  );
}

export default App;
