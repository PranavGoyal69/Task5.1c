import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Container, Card, Button, Form } from 'semantic-ui-react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const FindQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState('');
  const [newQuestion, setNewQuestion] = useState({ title: '', description: '', tag: '', date: new Date().toLocaleDateString() });
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  // Fetch questions from Firestore
  useEffect(() => {
    const fetchQuestions = async () => {
      const q = query(collection(db, 'questions'));
      const querySnapshot = await getDocs(q);
      const questionsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuestions(questionsList);
    };

    fetchQuestions();
  }, []);

  // Add new question
  const handleAddQuestion = async () => {
    const docRef = await addDoc(collection(db, 'questions'), newQuestion);
    setQuestions([...questions, { id: docRef.id, ...newQuestion }]);
    setNewQuestion({ title: '', description: '', tag: '' });
  };

  // Delete a question
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'questions', id));
    setQuestions(questions.filter(question => question.id !== id));
  };

  // Filter questions
  const filteredQuestions = questions.filter(q => q.title.includes(filter) || q.tag.includes(filter));

  // Expand question details
  const handleExpand = (id) => {
    setExpandedQuestionId(expandedQuestionId === id ? null : id);
  };

  // Reorder questions using Drag and Drop
  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;
    const reorderedQuestions = Array.from(questions);
    const [moved] = reorderedQuestions.splice(result.source.index, 1);
    reorderedQuestions.splice(result.destination.index, 0, moved);
    setQuestions(reorderedQuestions);

    // Update the order in Firestore (optional)
    reorderedQuestions.forEach(async (question, index) => {
      try {
        const questionRef = doc(db, 'questions', question.id);
        await updateDoc(questionRef, { order: index });
      } catch (error) {
        console.error('Error updating order:', error);
      }
    });
  };

  return (
    <Container>
      <h2>Find Questions</h2>
      <Form>
        <Form.Input
          placeholder="Filter by title or tag"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Form.Input
          placeholder="Title"
          value={newQuestion.title}
          onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
        />
        <Form.Input
          placeholder="Description"
          value={newQuestion.description}
          onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
        />
        <Form.Input
          placeholder="Tag"
          value={newQuestion.tag}
          onChange={(e) => setNewQuestion({ ...newQuestion, tag: e.target.value })}
        />
        <Button onClick={handleAddQuestion}>Add Question</Button>
      </Form>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="questions">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {filteredQuestions.map((question, index) => (
                <Draggable key={question.id} draggableId={question.id} index={index}>
                  {(provided) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => handleExpand(question.id)}
                      style={{ marginBottom: '10px', ...provided.draggableProps.style }}
                    >
                      <Card.Content>
                        <Card.Header>{question.title}</Card.Header>
                        <Card.Meta>{question.tag} - {question.date}</Card.Meta>
                        {expandedQuestionId === question.id && (
                          <Card.Description>{question.description}</Card.Description>
                        )}
                        <Button onClick={(e) => { e.stopPropagation(); handleDelete(question.id); }}>Delete</Button>
                      </Card.Content>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};

export default FindQuestions;
