import React from 'react'
import Emortion from "./EmortionH";
import {Carousel} from "react-bootstrap";
import './CarouselComponent.css'
import Emoticon from "./Emoticon";
import {Collapse, Dropdown} from "react-bootstrap";
import $ from 'jquery'

function CarouselComponent(props)
{

    return (

        <Carousel interval={6000} controls={false}>
            {props.postsArray.map((post,index)=>(
                <Carousel.Item key={index}>
                    <Emortion ENDPOINT={props.ENDPOINT} user={props.user} key={post._id}  socket={props.socket} getPosts={props.getPosts} emortion={post} index={index} size={props.postsArray.length}/>
                    {/*  <div><br/><br/><br/><br/></div>
                            <div className="carousel-caption d-none d-md-block text-black-50">
                        <h5>First slide label</h5>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </div>*/}
                </Carousel.Item>
            ))}

        </Carousel>

    )
}

    export default CarouselComponent;