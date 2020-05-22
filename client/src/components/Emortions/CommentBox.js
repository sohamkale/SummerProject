import React, {useEffect, useState} from 'react'
import { Button, Container, Card, Row, Col } from 'react-bootstrap'
import "./CommentBox.css";
import CommentCard from "./CommentCard";
const CommentBox = (props) => {
    return(
        <div className="commentDiv fluid bg-dark">
        <Container fluid className="commentBox">
            {console.log(props.postsArray)}
            {props.postsArray.map((post) => (
                <Row className="mt-3">
                    <Col >
                    <CommentCard 
                        post = {post}/>
                    </Col>
                </Row>
            ))}
            
        </Container>
        </div>
    );
}

export default CommentBox;

{/* <span style="width: 24px; height: 24px; display: inline-block; background-image: url(&quot;https://unpkg.com/emoji-datasource-apple@5.0.1/img/apple/sheets-256/64.png&quot;); background-size: 5700% 5700%; background-position: 53.5714% 62.5%;"></span> */}