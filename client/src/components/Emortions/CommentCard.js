import React, {useEffect, useState} from 'react'
import { Button, Container, Card, Row, Col } from 'react-bootstrap'

const CommentCard= (props) => {
    return(
        <Card>
            <Card.Header>Featured</Card.Header>
            <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                    {props.post.message.emojiArray.map((emoji, index) => (
                        <p>{emoji}</p>
                    ))}
                    Likes: {props.post.numLikes}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}

export default CommentCard;