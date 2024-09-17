import React, { useState } from 'react';
import { db, storage } from '../firebaseConfig'; // Import Firebase config
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase storage
import { Button, Input } from 'semantic-ui-react';

const PostButton = ({ newPost }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    let imageUrl = '';
    if (image) {
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef); // Get image URL after upload
    }

    await addDoc(collection(db, 'posts'), { ...newPost, imageUrl }); // Save the post with image URL
    setLoading(false);
  };

  return (
    <div>
      <Input type="file" onChange={handleImageChange} /> {/* Image upload field */}
      <Button loading={loading} onClick={handleSubmit}>Submit Post</Button>
    </div>
  );
};

export default PostButton;
