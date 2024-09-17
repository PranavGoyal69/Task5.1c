import React from 'react';
import { Form, Icon } from 'semantic-ui-react';

const PostTypeSelector = ({ postType, setPostType }) => (
  <Form.Group inline style={{ justifyContent: 'center', marginBottom: '20px' }}>
    <label style={{ marginRight: '20px' }}>Select Post Type:</label>
    <Form.Radio
      label={<><Icon name="question circle" /> Question</>}
      value='question'
      checked={postType === 'question'}
      onChange={() => setPostType('question')}
      className="custom-input"
      style={{ marginRight: '20px' }}
    />
    <Form.Radio
      label={<><Icon name="file alternate" /> Article</>}
      value='article'
      checked={postType === 'article'}
      onChange={() => setPostType('article')}
      className="custom-input"
    />
  </Form.Group>
);

export default PostTypeSelector;
