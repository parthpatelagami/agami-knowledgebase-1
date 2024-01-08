import React from 'react'
import { useState , useEffect} from 'react'
import {toAbsoluteUrl} from '../../../../../../knowledgebase/helpers'
import { TextFormatting } from './TextFormatting'
import { useFormik } from 'formik'
import axios from 'axios'

interface ReplyProps {
  questionId: any;
  isRenderPage:any;
  replyCount:number
}
const Replies: React.FC<ReplyProps> = (props) => {
  const [textReplybox, setTextReplybox] = useState(-1);
  const [textFormatting, setTextFormatting] = useState<boolean>(false)
  const [data, setData] = useState<any>([])
  const [loading, setLoading ] = useState(false)
  const [parentquestionId, setParentquestionId] = useState(null);
  const [offset, setOffset] = useState(0);
  const REACT_APP_API_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:3001";
  const [rerender, setRerender] = useState(false)
  const [limit, setLimit] = useState(0)

  
  useEffect(()=>{   

      async function fetchreplydata() {
        const response = await axios.get(`${REACT_APP_API_URL}/knowledgebase/question/reply/${props.questionId}/5/0`)
        const data = await response.data.data; 
        setData(data);
      }
      fetchreplydata(); 
      setRerender(false)
      setOffset(0)
      setLimit(0)
  },[props.isRenderPage, rerender])

  useEffect(()=>{    

    async function fetchreplydata() {      
      if(limit > 0 && offset > 0){

        const response = await axios.get(`${REACT_APP_API_URL}/knowledgebase/question/reply/${props.questionId}/${limit}/${offset}`)
        const data = await response.data.data;         
        setData((prev: any) => [...prev, ...data]);
      }      
    }
    fetchreplydata(); 
  },[offset])
  

  const initialValues = {
    reply: ""
  };
  
  const formik  = useFormik({
    initialValues:initialValues,
    onSubmit: async (values) => {
      setLoading(true)
      addReply(values.reply)
      values.reply = '';
      setRerender(true);
    }
    
  })
  
  
  function addReply(
    reply: string,
  ){
    return axios.post(`${REACT_APP_API_URL}/knowledgebase/question/reply`, {
      reply: reply,
      question_id: props.questionId,
      parent_question_reply_id: parentquestionId,
      // reply_by: userId
    })
    .then(response => {
      // console.log(response);
      setTimeout(() => {
        setLoading(false)
      }, 1000)
      // alert('Reply has been successfully Added!')
      setTextReplybox(-1);
    })
    .catch(error => {
      console.error(error);
    });
  }
  const cancelHandle =()=>{
    setTextReplybox(-1)
  }


  const handlePagination = ()=>{
    setOffset((prev)=>prev+5)
    setLimit(5)
  }

  
  return (
    <>
      { }
      <a href='#' data-kt-scroll-offset='{default: 100, lg: 125}'></a>
      <h2 className='fw-bolder text-gray-900 mb-10'>Replies({props.replyCount})</h2>

      <div className='mb-10'>
      <div className='overflow-y-auto pe-8'style={{maxHeight:"500px"}}>
        {data.map((item:any, i:number) => {
          return (            
            <div className={`border rounded p-2 p-lg-6 mb-10`} key={i}>
              <div className='mb-0'>
                <div className='d-flex flex-stack flex-wrap mb-5'>
                  <div className='d-flex align-items-center py-1'>
                    <div className='symbol symbol-35px me-2'>
                      {item.avatar && <img src={toAbsoluteUrl(item.avatar)} alt='user' />}
                      {!item.avatar && (
                        <div className='symbol-label bg-light-danger fs-3 fw-bold text-danger text-uppercase'>
                          {item.createdBy?item.createdBy.name.charAt(0):"A"}
                          {/* {item.author.charAt(0)} */}
                        </div>
                      )}
                    </div>

                    <div className='d-flex flex-column align-items-start justify-content-center'>
                      <span className='text-gray-800 fs-7 fw-bold lh-1 mb-2'>{item.createdBy.name}</span>
                      <span className='text-muted fs-8 fw-bold lh-1'>{new Date(item.reply_date).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className='d-flex align-items-center py-1'>
                    { }
                    {textReplybox != i && <a
                      
                      className='btn btn-sm btn-flex btn-color-gray-500 btn-active-light me-1'
                      onClick={() => {
                        setTextReplybox(i)
                        setParentquestionId(item.id)
                      }}
                    >
                      Reply
                    </a>}
                  </div>
                </div>

                <div className='fs-5 fw-normal text-gray-800'>{item.reply}</div>

                <div className="ps-7 mb-0 pe-5" id={'replyBox'+i}>
                {textReplybox === i &&                 
                <form onSubmit={formik.handleSubmit} className='form mb-3 ms-2 mt-10'>
                  <div className='form-group mb-2'>
                    <textarea
                      name='reply'
                      className='form-control'
                      rows={6}
                      placeholder='Your reply here..'
                      // maxLength={1000}
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
                    {loading && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                    <div className="d-flex ms-2">                    
                      <button className="btn btn-light-primary fw-bold me-3" onClick={cancelHandle}>Cancel</button>
                      <button className='btn btn-primary fw-bolder' type='submit'>Submit</button>
                    </div>
                  </div>
                    
                 {textFormatting && <TextFormatting />}
              </form>                
                }
              </div>  
                {
                  item.child_data.length ? 
                  <>
                  {item.child_data.map((items:any)=>
                   
                    <div className="ps-7 mb-0 pe-5">
                    <div className={`border rounded p-2 p-lg-6 mb-10 mt-10 ${items.indent}`} key={items.id}>
                      <div className='mb-0'>
                        <div className='d-flex flex-stack flex-wrap mb-5'>
                          <div className='d-flex align-items-center py-1'>
                            <div className='symbol symbol-35px me-2'>
                              {items.avatar && <img src={toAbsoluteUrl(items.avatar)} alt='user' />}
                              {!items.avatar && (
                                <div className='symbol-label bg-light-success fs-3 fw-bold text-success text-uppercase'>
                                  {item.createdBy?item.createdBy.name.charAt(0):"A"}
                                </div>
                              )}
                            </div>

                            <div className='d-flex flex-column align-items-start justify-content-center'>
                              <span className='text-gray-800 fs-7 fw-bold lh-1 mb-2'>{items.createdBy.name}</span>
                              <span className='text-muted fs-8 fw-bold lh-1'>{new Date(items.reply_date).toLocaleString()}</span>
                            </div>
                          </div>

                          <div className='d-flex align-items-center py-1'>
                            { }
                          </div>
                        </div>

                        <div className='fs-5 fw-normal text-gray-800'>{items.reply}</div>
                      </div>        

                      <div className='ps-10 mb-0'></div>
                    </div>
                
                    </div>
                  
                  )} 
                  </>
                :(<></>)
                }

              </div>
              <div className='ps-10 mb-0'></div>
            </div>
          
          
          )
        })}
        {
          ((props.replyCount)-(data.length)) > 0 ? 
          <div className='d-flex flex-center mb-0'>
            <button
              onClick={handlePagination}
              className='btn btn-icon btn-light btn-active-light-primary h-30px w-1000px fw-bold fs-6 mx-2'
            >
              View {(props.replyCount)-(data.length)} Reply
            </button>
          </div> 
          : 
          <></>
        }
        
        </div>
        
      </div>
      
      
    </>
  )
}

export {Replies}
