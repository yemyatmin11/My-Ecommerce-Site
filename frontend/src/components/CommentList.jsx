import React, { useEffect, useState } from 'react';
import heroImage from '../assets/heroImage.jpg';
import { useParams } from 'react-router-dom';
import axios from '../helpers/axios';
import deleteIcon from '../assets/deleteIcon.svg';
import editIcon from '../assets/editIcon.svg';
import moment from 'moment';
import CommentForm from './CommentForm';

export default function CommentList() {

    let [comments, setComments] = useState([]);
    let [editComment, setEditComment] = useState(null);
    let { id } = useParams();
    
    useEffect(() => {
        let fetchComments = async () => {
            let res = await axios.get(`/api/products/${id}/comments`);
            if(res.status == 200) {
                setComments(res.data);
            }
        }
        fetchComments();
    }, [id]);

    let deleteComment = async (commentId) => {
        let res = await axios.delete(`/api/comments/${commentId}`);
        if(res.status == 200) {
            setComments(prevState => prevState.filter(comment => comment._id !== commentId))
        }
    }
    console.log(editComment)

  return (
    <>
        {comments.length > 0 && comments.map(comment => (
            <div key={comment._id} className='mt-8 border-2 shadow-md rounded-sm p-3 bg-white'>
                <div className='flex justify-between items-center'>
                    <div className='flex space-x-3 items-center'>
                        <img src={"http://localhost:4000/users"+ comment.user.photo} alt="" className='w-12 h-12 rounded-full'/>
                        <div>
                            <h1>{comment.user.name}</h1>
                            <p>{moment(comment.createdAt).fromNow()}</p>
                        </div>
                    </div>
                    <div className='space-y-3'>
                        <img onClick={() => setEditComment(comment)} src={editIcon} alt="" className='bg-green-500 px-2 py-1 cursor-pointer rounded-lg text-sm hover:bg-green-600'/>
                        <img onClick={() => deleteComment(comment._id)} src={deleteIcon} className='bg-red-500 text-white px-2 py-1 cursor-pointer rounded-lg text-sm hover:bg-red-600'/>
                    </div>         
                </div>
                <div className='mt-3 text-gray-500'>
                    {editComment?._id !== comment._id && <p>{comment.body}</p>}
                    {editComment?._id === comment._id && <CommentForm type='update' setEditComment={setEditComment} editComment={editComment}/>}
                </div>
            </div>
        ))}
    </>
  )
}
