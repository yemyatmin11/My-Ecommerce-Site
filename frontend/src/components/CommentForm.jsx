import React, { useContext, useEffect, useState } from 'react';
import {AuthContext} from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import axios from '../helpers/axios';

export default function CommentForm({ type = 'create', setEditComment, editComment}) {

    let { id } = useParams();
    let [body, setBody] = useState('');
    let { user } = useContext(AuthContext);

    useEffect(() => {
        if(type === 'update') {
            setBody(editComment.body);
        }
    }, [type])

    const submitComment = async (e) => {
        e.preventDefault();
        try {
            let comment = {
                body,
                productId: id,
                user: user._id
            };
            let res;
            if(type === 'update') {
                res = await axios.patch(`/api/comments/${editComment._id}`, comment)
            }
            else {
                res = await axios.post(`/api/comments/${id}`, comment);
            }
            
            if (res.status === 200) {
                setBody('');
                setEditComment(null)
            }
        } catch (error) {
            console.error(error);
        }
    };


  return (
    <form onSubmit={submitComment}>
        <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            className='bg-gray-50 w-full shadow-md p-3 rounded-lg mt-3' 
            rows={5} 
            cols={30}>
        </textarea>
        <div className='space-x-3'>
            <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white font-bold mt-2 py-2 px-3 rounded focus:outline-none focus:shadow-outline" >
                {type == 'create' ? 'Add' : 'Update'} Comments
            </button>
            {type === 'update' && <button onClick={() => setEditComment(null)} className='border-2 border-orange-600 text-orange-600 mt-2 py-1 px-3 rounded focus:outline-none focus:shadow-outline'>Cancel</button>}
        </div>
    </form>
  )
}
