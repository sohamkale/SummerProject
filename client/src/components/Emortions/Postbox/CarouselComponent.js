import React from 'react'
import Emortion from "./EmortionH";
import {Carousel} from "react-bootstrap";
import './CarouselComponent.css'

function CarouselComponent(props)
{
var masterId ="";
var masterArray=[]
if(props.postsArray!=null /*|| props.postsArray.length!=0 || props.postsArray.length!=1*/)
{
    masterId=props.postsArray[0].userId;
    var temparr=[]

    props.postsArray.forEach((item,index)=>{
        if(masterId==item.userId)
            temparr.push(item);
        else
        {
            masterArray.push(temparr);
            temparr=[];
            masterId=item.userId;
        }
    })
    masterArray.push(temparr);
}
    return (
        <div>{
            masterArray.map((item,indext)=>(
        <Carousel key={indext} interval={10000} controls={false}>
            {
                item.map((post,index)=>(
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
            ))}</div>
    )
}

    export default CarouselComponent;