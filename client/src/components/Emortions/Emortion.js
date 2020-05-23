import React from 'react';
import Emoticon from '../Emortions/Emoticon'
import { emojiIndex } from 'emoji-mart';

function Emortion(emortion) {
    emortion=emortion.emortion

    //states and vars
    //const [postsArray, setPostsArray] = useState([]);
    //let posts = [];

    //useEffect
    // useEffect (() => {
    //    //UseEffect Function on Load
    //    axios.get('/api/posts')
    //   .then((res)=>{
    //     if(res.data.length > 0){
    //         console.log("posts");
    //         console.log(res.data);
    //         res.data.map(post => posts.push(post))
    //     }
    //     console.log(posts);
    //     setPostsArray(posts);
    // });
    // }, []);

    return (
        <div>
        <div class="card">
            <div class="card-header">
                Emortion By: 
            </div>
            <div class="card-body">
                <div>
                    {emortion.message.emojiArray.map((position, index)=>(
                        <Emoticon position={position}/>
                    ))}
                </div>
                <p class="card-text">Secret: {emortion.secretAnswer}</p>
                <hr></hr>
                    <p>Likes: {emortion.numLikes}</p>
            </div>
        </div>
        <br></br>
        </div>
    );
}

export default Emortion;