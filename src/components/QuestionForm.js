import React from 'react';
import { Form, TextArea } from 'semantic-ui-react';

const QuestionForm = ({ questionData, setQuestionData }) => (
  <>
    <Form.Input
      label='Title'
      placeholder='Start your question with how, what, why, etc.'
      value={questionData.title}
      onChange={(e) => setQuestionData({...questionData, title: e.target.value})}
    />
    <Form.Field
      control={TextArea}
      label='Describe your problem'
      placeholder='Describe your problem'
      value={questionData.description}
      onChange={(e) => setQuestionData({...questionData, description: e.target.value})}
    />
    <Form.Input
      label='Tags'
      placeholder='Please add up to 3 tags to describe what your question is about e.g., Java'
      value={questionData.tag}
      onChange={(e) => setQuestionData({...questionData, tag: e.target.value})}
    />
  </>
);


export default QuestionForm;