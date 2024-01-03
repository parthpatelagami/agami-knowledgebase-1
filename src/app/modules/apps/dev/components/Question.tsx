

import React, {useState,useEffect} from 'react'
import {KTIcon,toAbsoluteUrl} from '../../../../../knowledgebase/helpers'
import {TextFormatting} from './partials/TextFormatting'
import {EnableSidebar} from '../../../../../knowledgebase/layout/core'
import {Replies} from './partials/Replies'
import axios from "axios"
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'

const Question: React.FC = () => {

  const REACT_APP_API_URL =
  import.meta.env.REACT_APP_API_URL || "http://localhost:3001";
  const { id } = useParams();
  const [question, setQuestion] = useState<any>([]);
  const [replies, setReplies] = useState([]);
  const [textFormatting, setTextFormatting] = useState<boolean>(false)
  const [loading, setLoading ] = useState(false)
  let navigate = useNavigate();

  async function fetchAllReplies() {
    const response = await axios.get(`${REACT_APP_API_URL}/knowledgebase/question/replies/${id}`)
    setReplies(response.data.data);
    console.log("Response: ", response.data.data);

  }

  useEffect(() => {
    async function fetchQuesitonById() {
        const response = await axios.get(`${REACT_APP_API_URL}/knowledgebase/questions/${id}`, {
          headers: {
              'x-refresh-token': 'a1e87553-2ee2-441e-993b-876d01ea9d3d',
              'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pbWl0LmRlc2FpQGFnYW1pLXRlY2guY29tIiwiaWQiOjEsImlhdCI6MTcwMzIyODUxNiwiZXhwIjoxNzAzMjI5NDE2fQ.02ZF5q5mAW-S7fbY8EbfuqysdoG2aXnYuwdGWtG5PGA'
          }
      })
        .then(function (response: any) {
          console.log(response);
          if(response.status == 200) {
            console.log(response.data.data)
            setQuestion(response.data.data)
          }
        })
        .catch(function (error: any) {
          console.log(error);
        })
        .finally(function () {
        });
      }

     
      fetchAllReplies();
      fetchQuesitonById();
      console.log("Hello Question");
  }, []);

  const initialValues = {
    reply: ""
  };

  const formik  = useFormik({
    initialValues:initialValues,
    onSubmit: async (values) => {
      setLoading(true)
      addReply(values.reply)
      fetchAllReplies();
      // navigate('/dashboard')
      values.reply = ''
    }
    
  })
  
  function addReply(
    reply: string,
  ){
    return axios.post(`${REACT_APP_API_URL}/knowledgebase/question/replies`, {
      reply: reply,
      question_id: id,
      parent_question_reply_id: -1,
      reply_by: 1
    })
    .then(response => {
      console.log(response);
      setTimeout(() => {
        setLoading(false)
      }, 1000)
      alert('Reply has been successfully Added!')
    })
    .catch(error => {
      console.error(error);
    });
  }

  return (
    question && (
      <EnableSidebar>
      <div className='mb-0'>
        <div className='d-flex align-items-center mb-9'>
          <h1 className='fs-2x fw-bolder text-gray-900 mb-0 me-1'>
            {question.title}
          </h1>

          <div className='d-flex align-items-center'>
            <span className='ms-1' data-bs-toggle='tooltip' title='User replied'>
              <KTIcon iconName='check-circle' className='text-success fs-1' />
            </span>
          </div>
        </div>

        <div className='fs-4 fw-normal text-gray-800 mb-10'>
         <p>{question.description}</p>
        </div>

        <div className='d-flex flex-stack flex-wrap'>
        <div className="d-flex align-items-center py-1">
                    <div className="symbol symbol-35px me-2">
                      {question.avatar && (
                        <img src={toAbsoluteUrl(question.avatar)} alt="user" />
                      )}
                      {!question.avatar && (
                        <div className="symbol-label bg-light-warning fs-3 fw-bold text-warning text-uppercase">
                          {/* {question.createdBy.name.charAt(0)} */}
                          {question.createdBy?question.createdBy.name.charAt(0):"A"}
                        </div>
                      )}
                    </div>

                    <div className="d-flex flex-column align-items-start justify-content-center">
                      <span className="text-gray-900 fs-7 fw-bold lh-1 mb-2">
                        {/* {question.createdBy.name} */}
                        {question.createdBy?question.createdBy.name:"User"}
                      </span>
                      {new Date(question.created_date).toLocaleString()}
                    </div>
                  </div>

          <div className='d-flex align-items-center py-1'>
            <a
              href='#answers'
              data-kt-scroll-toggle='true'
              className='btn btn-sm btn-outline btn-outline-dashed btn-outline-default px-4 me-2'
            >
              12 Answers
            </a>

            <a
              href="<?php echo Theme::getPageUrl('apps/devs/tag')?>"
              className='btn btn-sm btn-light px-4 me-2'
            >
              Laravel
            </a>

            <a
              href="<?php echo Theme::getPageUrl('apps/devs/tag')?>"
              className='btn btn-sm btn-light px-4 me-2'
            >
              Metronic
            </a>

            <a
              href='#'
              className='btn btn-sm btn-icon btn-light me-2'
              data-bs-toggle='tooltip'
              title='Save for your future reference'
              data-bs-dismiss='click'
            >
              <KTIcon iconName='save-2' className='fs-2' />
            </a>

            <a
              href='#'
              className='btn btn-sm btn-flex btn-light px-2'
              data-bs-toggle='tooltip'
              title='Upvote this question'
              data-bs-dismiss='click'
            >
              23
              <KTIcon iconName='black-up' className='fs-7 ms-1 me-1' />
            </a>
          </div>
        </div>
      </div>

      <div className='separator separator-dashed border-gray-300 mt-8 mb-10'></div>

      <form id='kt_devs_reply_form' onSubmit={formik.handleSubmit} className='form mb-10'>
        <div className='form-group mb-2'>
          <textarea
            name='reply'
            className='form-control'
            rows={6}
            placeholder='Your reply here..'
            maxLength={1000}
            value={formik.values.reply}
            onChange={formik.handleChange}
            data-kt-autosize='true'
          />
        </div>

        <div className='d-flex align-items-center justify-content-between py-2 mb-5'>
          <div
            onClick={() => {
              setTextFormatting(!textFormatting)
            }}
            className='text-primary fs-base fw-bold cursor-pointer'
          >
            Text formatting options
          </div>

          <button className='btn btn-primary fw-bolder' type='submit'>
            Submit
          </button>
        </div>

        {textFormatting && <TextFormatting />}
      </form>
      
      {replies.length ? <><Replies questionId={id}/></>:(<><h2 className='fw-bolder text-gray-900 mb-10'>Replies({replies.length})</h2></>)}
      
    </EnableSidebar>));
}

export {Question}
