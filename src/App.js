import './App.css';
import styled from '@emotion/styled';
import { Component } from 'react';
import {axiosRoute} from './utils/helper'

class App extends Component {

  state = {
    name: 'Landing Page Check'
  }

  async componentDidMount() {
    console.log('hello');
    const method = 'GET';
    const url = 'https://api.github.com/users'
    const { data } = await axiosRoute(method, url)
    console.log(data)
  }

  render() {
    return (
      <LandingPageContent>
        {this.state.name}
      </LandingPageContent>
    );
  }
}

export default App;

const LandingPageContent = styled.div`
    position: absolute;
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
`