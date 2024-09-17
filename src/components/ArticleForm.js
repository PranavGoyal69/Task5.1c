import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { db, storage } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ArticleForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [image, setImage] = useState(null);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 5 * 1024 * 1024) { // check file size < 5MB
      setImage(file);
    } else {
      alert('File size should be less than 5MB');
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = '';
      if (image) {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }
      await addDoc(collection(db, 'articles'), { title, description, tag, imageUrl });
      setTitle('');
      setDescription('');
      setTag('');
      setImage(null);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Form.TextArea
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Form.Input
        label="Tag"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      <Form.Input
        type="file"
        label="Upload Image"
        onChange={handleImageChange}
      />
      <Button type="submit">Add Article</Button>
    </Form>
  );
};

export default ArticleForm;
