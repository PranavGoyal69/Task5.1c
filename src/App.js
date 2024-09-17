import React, { useState, useEffect } from 'react';
import { Container, Card, Grid, Segment, Form } from 'semantic-ui-react';
import PostTypeSelector from './components/PostTypeSelector';
import QuestionForm from './components/QuestionForm';
import ArticleForm from './components/ArticleForm';
import PostButton from './components/PostButton';
import './App.css';

const App = () => {
  const [postType, setPostType] = useState('question');
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const changeBackground = () => {
      const randomImage = `https://picsum.photos/1920/1080?random=${Math.random()}`;
      setBackgroundImage(`url(${randomImage})`);
    };

    changeBackground(); // Set initial background
    const intervalId = setInterval(changeBackground, 50000); // Change background every 50 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <div className="app-background" style={{ backgroundImage }}>
      <Container style={{ marginTop: '40px' }}>
        <Grid centered columns={2}>
          <Grid.Column>
            <Card fluid className="custom-card">
              <Card.Content>
                <Card.Header className="card-header">Create a New Post</Card.Header>
                <Segment padded className="custom-segment">
                  <Form>
                    <PostTypeSelector postType={postType} setPostType={setPostType} />
                    {postType === 'question' ? <QuestionForm /> : <ArticleForm />}
                    <PostButton />
                  </Form>
                </Segment>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
