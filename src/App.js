import './App.css';
import styled from '@emotion/styled';
import { Component } from 'react';
import {axiosRoute} from './utils/helper'
import Textform from './components/Textform'
import { Paper } from '@material-ui/core';


class App extends Component {

  state = {
    data: null
  }

  async componentDidMount() {
    const method = 'GET';
    const url = 'https://api.hatchways.io/assessment/students'
    const students = await axiosRoute(method, url)
    const rawData = students.data.students
    const formatted = rawData.map(student => {
      student['average'] = student.grades.reduce((a,b) => parseInt(a) + parseInt(b), 0) /student.grades.length
      student['tags'] = []
      return student
    })
    this.setState({data: formatted})
  }

  render() {
    return (
      <MainContainer>
        {!this.state.data ? (
        // loader to account for data fetch
        <div>
          Loading...
        </div>
        ) : (
            <Paper 
              elevation={3} 
              style={{
              position: 'absolute',
              display: 'flex',
              margin: '10vh 12.5vw',
              width: '60%',
              height: '80%',
              fontSize: '1rem',
              backgroundColor: 'white',
              borderRadius: '20px',
              overflow: 'auto'
            }}>
              <Textform data={this.state.data}/>
            </Paper>
        )}
      </MainContainer>
    );
  }
}

export default App;

const MainContainer = styled.div`
    font-size: 0;
    position: absolute;
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #EFEFEF
`