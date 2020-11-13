import React, { useState, useEffect, Fragment } from 'react';
import styled from '@emotion/styled';
import { Divider, Grid, List, ListItem, TextField, Button } from '@material-ui/core';
import {nameFilter, tagFilter} from '../utils/helper';

const TextForm = ({data}) => {

  const [students, setStudents] = useState([])
  const [defaultStudents, setDefault] = useState([])
  const [detailedStudents, setDetailed] = useState([])
  const [taggedStudents, setTaggedStudents] = useState([])
  const [tagWords, setTag] = useState({})
  // flags used to allow searching by both fields
  const [tagFlag, setTagFlag] = useState(null)
  const [nameFlag, setnameFlag] = useState(null)

  useEffect(()=> {
    if (data) {
      setStudents(data)
      setDefault(data)
    } 
  },[data])

  // filters by name
  const handleFilter = (e) => {
    e.preventDefault();
    const characters = e.target.value
    characters.length ? setnameFlag(characters) : setnameFlag(null)
    let filtered = null
    filtered = nameFilter(defaultStudents, characters)
    if (tagFlag) {
      filtered = tagFilter(filtered, tagFlag)
    }
    setStudents(filtered)
  }

  // toggles the detail grade view  
  const handleDetailedView = (student, param) => {
    if (param) {
      setDetailed([...detailedStudents, student])
    } else {
      setDetailed(detailedStudents.filter(id => id !== student))
    }
  }

  // filters based on tags
  const handleSearchTag = (e) => {
    e.preventDefault();
    const characters = e.target.value
    characters.length ? setTagFlag(characters) : setTagFlag(null)
    let filtered = null
    if (characters.length) {
      filtered = tagFilter(defaultStudents, characters)
    } else {
      filtered = defaultStudents
    }
    if (nameFlag) {
      filtered = nameFilter(filtered, nameFlag)
    }
    setStudents(filtered)
  }

  // process to add a tag to a student
  const handleAddTag = (e, student) => {
    e.preventDefault()
    student.tags.push(tagWords[student.id])
    if (!taggedStudents.includes(student.id)) {
      setTaggedStudents([...taggedStudents, student.id])
    }
    setTag({...tagWords, [student.id]: ''})
  }

  // handles the changing of the word
  const handleChangeTag = (e, student) => {
    setTag({...tagWords, [student.id]: e.target.value})
  }

  return (
    <div style={{width: '100%'}}>
      <form noValidate autoComplete="off" style={{marginLeft: '5%', marginTop: '1%'}}>
        <TextField id="standard-basic" label="Search by Name" style={{width: '93%'}} onChange={e => handleFilter(e) }/>
      </form>
      <form noValidate autoComplete="off" style={{marginLeft: '5%', marginTop: '1%'}}>
        <TextField id="standard-basic" label="Search by Tag" style={{width: '93%'}} onChange={e => handleSearchTag(e)}/>
      </form>
      <List>
        {students.length ? students.map((student) => {
          return(
            <Fragment key={student.id}>
              <ListItem style={{padding: '0 0 1rem 0'}}>
                <Grid container spacing={0}>
                  <Grid item xs={4}>
                    <Container>
                      <ImageContainer icon={student.pic}></ImageContainer>
                    </Container>
                  </Grid>
                  <Grid item xs={6}>
                    <h1>{student.firstName} {student.lastName}</h1>
                    <div style={{paddingLeft: '1rem'}}>
                      <div>Email: {student.email}</div>
                      <div>Company: {student.company}</div>
                      <div>Skill: {student.skill}</div>
                      {!detailedStudents.includes(student.id) ?
                        (<div>Average: {student.average}%</div>) : (
                          student.grades.map( (grade, gIndex) =>
                        <div key={student.firstName + gIndex}>Test {gIndex}: <span style={{marginLeft: '1rem'}}></span> {Number.parseFloat(grade).toFixed(0)}%</div>
                          )
                        )
                      }
                      {taggedStudents.includes(student.id) ? (
                      <div>
                        {student.tags.map((tag, tIndex) => 
                        <Button 
                          key={tag + student.id + tIndex} variant="contained" 
                          style={{margin: '0.2rem', textTransform: 'none'}}>
                          {tag}
                        </Button>)}
                        </div>
                      ) : null}
                      <form noValidate autoComplete="off" onSubmit={e => handleAddTag(e, student)}>
                        <TextField id="standard-basic" label="Add a tag" value={tagWords[student.id] || ''} onChange={e => handleChangeTag(e, student)} />
                      </form>
                    </div>
                  </Grid>
                </Grid>
                <Grid item xs={2}>
                  <ExpandContainer>
                    {!detailedStudents.includes(student.id) ? (
                      <Expand onClick={() => handleDetailedView(student.id, true)}>+</Expand>
                    ) : (
                      <Expand onClick={() => handleDetailedView(student.id, false)}>-</Expand>)}
                  </ExpandContainer>
                </Grid>
              </ListItem>
              <Divider/>
            </Fragment>
          )
        }) : null}
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
  alignItems: center;
`

const ExpandContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justifyContent: center;
  alignItems: top;
`

const Expand = styled.div`
  font-size: 4rem;
  cursor: pointer
`