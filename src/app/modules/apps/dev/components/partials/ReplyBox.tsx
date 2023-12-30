import { useState, FC } from "react";
import { TextFormatting } from './TextFormatting'
import { Replies } from "./Replies";
import { Link } from "react-router-dom";


const ReplyBox = (props:any)=>{
    const [textFormatting, setTextFormatting] = useState<boolean>(false)
    console.log("Propse: ", props.id)
    return(
            <form id='somthing' className='form mb-3 ms-2 mt-10'>
                <div className='form-group mb-2'>
                  <textarea
                    name='comment'
                    className='form-control'
                    rows={6}
                    placeholder='Your reply here..'
                    maxLength={1000}
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
                  <div className="d-flex ms-2">                    
                    <Link className="btn btn-light-primary fw-bold me-3" to={'/apps/devs/question/'}>Cancel</Link>
                    <Link className='btn btn-primary fw-bolder' to={'/dashboard'}>Submit</Link>
                  </div>
                </div>
                    
                 {textFormatting && <TextFormatting />}
              </form>
    )
}
export {ReplyBox}