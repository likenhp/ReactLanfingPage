import React, { useState, useEffect, Fragment } from 'react';
import styled from '@emotion/styled';
import { Divider, Grid, List, ListItem } from '@material-ui/core';

const TextForm = ({data}) => {

  const [students, setStudents] = useState([])
  const [submission, setSubmission] = useState(null)

  useEffect(()=> {
    console.log('props', data)
    if (data) {
      setStudents(data.students)
    } 
  })

  const handleChange = e => {
    setSubmission(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log(submission)
  }

  return (
    // <form onSubmit={handleSubmit}>
    //   <label>
    //     Name:
    //     <input type="text" value={submission} onChange={handleChange} />
    //   </label>
    //   <input type="submit" value="Submit" />
    // </form>
    <div style={{width: '100%'}}>
      <List>
        {students.length ? students.map((student,index) => {
          return(
            <Fragment>
              <ListItem key={index} style={{padding: '0 0 1rem 0'}}>
                <Grid container spacing={0}>
                  <Grid item xs={4} >
                    <Container>
                      <ImageContainer icon={student.pic}></ImageContainer>
                    </Container>
                  </Grid>
                  <Grid item xs={8}>
                    <h1>{student.firstName} {student.lastName}</h1>
                    <div style={{paddingLeft: '1rem'}}>
                      <div>Email: {student.email}</div>
                      <div>Company: {student.company}</div>
                      <div>Skill: {student.skill}</div>
                      <div>Average: {student.average}%</div>
                    </div>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider/>
            </Fragment>
          )
        }) : <div>Hello</div>}
      </List>
    </div>
  );
}

export default TextForm;

const ImageContainer = styled.div`
  & {
    background-image: url("${props => props.icon ? props.icon : null}");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    // width: 70%;
    width: 120px;
    height: 120px;
    // margin: 15%;
    margin: auto;
    border-radius: 50%;
    border: 1px solid black;
  }
  // &:after {
  //   padding-bottom: 100%;
  //   content: "";
  //   display: block;
  // }
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justifyContent: center;
  alignItems: center;
`