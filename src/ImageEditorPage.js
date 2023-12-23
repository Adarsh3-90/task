

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col } from 'react-bootstrap';

const ImageEditorPage = ({ image }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
  
    const captionText = '';

    localStorage.setItem('imageUrl', image.urls.small);
    
    navigate('/caption', { state: { image,captionText } });
    // navigate(`/canvas-editor/${image.urls.small}`);

  };

  return (
    <Col xs={12} md={4} lg={3} className="mb-4">
      <Card style={{ width: '100%', backgroundColor: 'blue',height:"200px" }}>
        <Card.Img variant='top' src={image.urls.small} alt={image.alt_description} style={{ maxWidth: '100%' }} />
        <Card.Body>
          <Button onClick={handleButtonClick} variant='primary'  style={buttonStyle} >
            Add Caption
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ImageEditorPage;



const buttonStyle = {
   
    backgroundColor: "#4CAF50",
    border: "none",
    color: "white",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 2px",
    cursor: "pointer",
  };
  