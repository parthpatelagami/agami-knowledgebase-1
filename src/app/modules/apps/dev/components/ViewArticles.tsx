import React, {useState,useEffect} from 'react'
import {KTIcon,toAbsoluteUrl} from '../../../../../knowledgebase/helpers'
import {EnableSidebar} from '../../../../../knowledgebase/layout/core'
import axios from "axios"
import { useParams } from 'react-router-dom';
const ViewArticles: React.FC = () => {

  const REACT_APP_API_URL =
  import.meta.env.REACT_APP_API_URL || "http://localhost:3001";
  const { id } = useParams();
  const [article, setArticles] = useState<any>([]);
  
  async function fetchArticlesById() {
    const response = await axios.get(`${REACT_APP_API_URL}/knowledgebase/articles/${id}`, {
    })
    .then(function (response: any) {
      if(response.status == 200) {
        console.log(response.data.data)
        setArticles(response.data.data)
      }
    })
    .catch(function (error: any) {
      console.log(error);
    })
    .finally(function () {
    });
  }

  useEffect(()=>{
    fetchArticlesById();
  },[])
 
  return (
    article && (
      <EnableSidebar>
      <div className='mb-0'>
        <div className='d-flex align-items-center mb-9'>
          <h1 className='fs-2x fw-bolder text-gray-900 mb-0 me-1'>
            {article.title}
          </h1>

          <div className='d-flex align-items-center'>
            <span className='ms-1' data-bs-toggle='tooltip' title='User replied'>
              <KTIcon iconName='check-circle' className='text-success fs-1' />
            </span>
          </div>
        </div>

        <div className='fs-4 fw-normal text-gray-800 mb-10'>
         <p dangerouslySetInnerHTML={{__html: article.description}}></p>
        </div>

        <div className='d-flex flex-stack flex-wrap'>
        <div className="d-flex align-items-center py-1">
                    <div className="symbol symbol-35px me-2">
                      {article.avatar && (
                        <img src={toAbsoluteUrl(article.avatar)} alt="user" />
                      )}
                      {!article.avatar && (
                        <div className="symbol-label bg-light-warning fs-3 fw-bold text-warning text-uppercase">
                          {article.createdBy?article.createdBy.name.charAt(0):"A"}
                        </div>
                      )}
                    </div>

                    <div className="d-flex flex-column align-items-start justify-content-center">
                      <span className="text-gray-900 fs-7 fw-bold lh-1 mb-2">
                        {article.createdBy?article.createdBy.name:"User"}
                      </span>
                      {new Date(article.created_date).toLocaleString()}
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
              title='Upvote this Article'
              data-bs-dismiss='click'
            >
              23
              <KTIcon iconName='black-up' className='fs-7 ms-1 me-1' />
            </a>
          </div>
        </div>
      </div>

      <div className='separator separator-dashed border-gray-300 mt-8 mb-10'></div>

      
      </EnableSidebar>));
}

export {ViewArticles}
