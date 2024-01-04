

import {FC, Fragment,useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {KTIcon, toAbsoluteUrl} from '../../../../../../knowledgebase/helpers'
import axios from "axios"

interface QuestionsProps {
  type: string;
}


const Questions: FC<QuestionsProps> = (props) => {
  const REACT_APP_API_URL =
  import.meta.env.REACT_APP_API_URL || "http://localhost:3001";
  const [questions, setQuestions] = useState<any>([]);
  const questions1 = [
    {
      id:1,
      title: 'How to use Metronic with Django Framework ?',
      summary:
        'I’ve been doing some ajax request, to populate a inside drawer, the content of that drawer has a sub menu, that you are using in list and all card toolbar.',
      author: 'James Hunt',
      date: '24 minutes ago',

      answers: '16',
      upvotes: '23',
      icons: [
        {
          path: 'information-5',
          class: 'text-primary',
          tooltip: 'New question',
        },
        {
          path: 'sms',
          class: 'text-danger',
          tooltip: 'User replied',
        },
      ],
      tags: ['Metronic'],
    },
    {
      id:2,
      title: 'When to expect new version of Laravel ?',
      summary:
        'When approx. is the next update for the Laravel version planned? Waiting for the CRUD, 2nd factor etc. features before starting my project. Also can we expect the Laravel + Vue version in the next update ?',
      author: 'Sandra Piquet',
      date: '1 day ago',
      avatar: 'media/avatars/300-2.jpg',
      answers: '2',
      upvotes: '4',
      icons: [
        {
          path: 'information-5',
          class: 'text-warning',
          tooltip: 'In-process',
        },
      ],
      tags: ['Pre-sale'],
    },
  ]

  useEffect(() => {
    async function fetchAllQuestions() {
        const response = await axios.get(`${REACT_APP_API_URL}/knowledgebase/questions`, {
      })
        .then(function (response: any) {
          console.log(response);
          if(response.status == 200) {
            // console.log(response.data)
             setQuestions(response.data.data)
          }
        })
        .catch(function (error: any) {
          console.log(error);
        })
        .finally(function () {
        });
      }

      async function fetchQuestionsByUser() {
        const response = await axios.get(`${REACT_APP_API_URL}/knowledgebase/questions/users/1`, {
      })
        .then(function (response: any) {
          console.log(response);
          if(response.status == 200) {
            // console.log(response.data)
             setQuestions(response.data.data)
          }
        })
        .catch(function (error: any) {
          console.log(error);
        })
        .finally(function () {
        });
      }
        
      if(props.type === "all") {
        fetchAllQuestions();
      }
      else if(props.type === "user") {
        fetchQuestionsByUser();
      }
  }, []);

  return (
    <>
    <div className='mb-10'>
        {questions.map((item:any, i:number) => {
          return (
            <Fragment key={`question_${i}`}>
              <div className="mb-0">
                <div className="d-flex align-items-center mb-4">
                  <Link
                    to={{
                      pathname: `/apps/devs/question/${item.id}`,
                    }}
                    className="fs-2 fw-bolder text-gray-900 text-hover-primary me-1"
                  >
                    {item.title}
                  </Link>
                  
                  <div className="d-flex align-items-center">
                    {/* {item.icons.map((icon, j) => {
                      return (
                        <span className='ms-1' key={`icons_${j}`}>
                          <KTIcon className={`fs-1 ${icon.class}`} iconName={icon.path} />
                        </span>
                      )
                    })} */}
                  </div>
                </div>
                <div className="fs-base fw-normal text-gray-700 mb-4">
                  {item.description}
                </div>

                <div className="d-flex flex-stack flex-wrap">
                  <div className="d-flex align-items-center py-1">
                    <div className="symbol symbol-35px me-2">
                      {item.avatar && (
                        <img src={toAbsoluteUrl(item.avatar)} alt="user" />
                      )}
                      {!item.avatar && (
                        <div className="symbol-label bg-light-warning fs-3 fw-bold text-warning text-uppercase">
                          {item.createdBy.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="d-flex flex-column align-items-start justify-content-center">
                      <span className="text-gray-900 fs-7 fw-bold lh-1 mb-2">
                        {item.createdBy.name}
                      </span>
                      {new Date(item.created_date).toLocaleString()}
                    </div>
                  </div>

                  <div className="d-flex align-items-center py-1">
                    <Link
                      to="/apps/devs/question"
                      className="btn btn-sm btn-outline btn-outline-dashed btn-outline-default px-4 me-2"
                    >
                      {item.answers} Answers
                    </Link>

                    {/* {item.tags.map((tag:any, j:any) => {
                      return (
                        <Link
                          to='/apps/devs/tag'
                          className='btn btn-sm btn-light px-4 me-2'
                          key={`link_${j}`}
                        >
                          {tag}
                        </Link>
                      )
                    })} */}
                  </div>
                </div>
              </div>
              <div className="separator separator-dashed border-gray-300 my-8"></div>
            </Fragment>
          );
        })}
        </div>
      <div className='mb-10'>
        {questions1.map((item, i) => {
          return (
            <Fragment key={`question_${i}`}>
              <div className='mb-0'>
                <div className='d-flex align-items-center mb-4'>
                  <Link
                    to={`/apps/devs/question/${item.id}`}
                    className='fs-2 fw-bolder text-gray-900 text-hover-primary me-1'
                  >
                    {item.title}
                  </Link>

                  <div className='d-flex align-items-center'>
                    {item.icons.map((icon, j) => {
                      return (
                        <span className='ms-1' key={`icons_${j}`}>
                          <KTIcon className={`fs-1 ${icon.class}`} iconName={icon.path} />
                        </span>
                      )
                    })}
                  </div>
                </div>

                <div className='fs-base fw-normal text-gray-700 mb-4'>{item.summary}</div>

                <div className='d-flex flex-stack flex-wrap'>
                  <div className='d-flex align-items-center py-1'>
                    <div className='symbol symbol-35px me-2'>
                      {item.avatar && <img src={toAbsoluteUrl(item.avatar)} alt='user' />}
                      {!item.avatar && (
                        <div className='symbol-label bg-light-success fs-3 fw-bold text-success text-uppercase'>
                          {item.author.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className='d-flex flex-column align-items-start justify-content-center'>
                      <span className='text-gray-900 fs-7 fw-bold lh-1 mb-2'>{item.author}</span>
                      <span className='text-muted fs-8 fw-bold lh-1'>{item.date}</span>
                    </div>
                  </div>

                  <div className='d-flex align-items-center py-1'>
                    <Link
                      to='/apps/devs/question'
                      className='btn btn-sm btn-outline btn-outline-dashed btn-outline-default px-4 me-2'
                    >
                      {item.answers} Answers
                    </Link>

                    {item.tags.map((tag, j) => {
                      return (
                        <Link
                          to='/apps/devs/tag'
                          className='btn btn-sm btn-light px-4 me-2'
                          key={`link_${j}`}
                        >
                          {tag}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>{' '}
              <div className='separator separator-dashed border-gray-300 my-8'></div>
            </Fragment>
          )
        })}
      </div>

      <div className='d-flex flex-center mb-0'>
        <a
          href='#'
          className='btn btn-icon btn-light btn-active-light-primary h-30px w-30px fw-bold fs-6 mx-2'
        >
          1
        </a>
        <a
          href='#'
          className='btn btn-icon btn-light btn-active-light-primary h-30px w-30px fw-bold fs-6 mx-2 active'
        >
          2
        </a>
        <a
          href='#'
          className='btn btn-icon btn-light btn-active-light-primary h-30px w-30px fw-bold fs-6 mx-2'
        >
          3
        </a>
        <a
          href='#'
          className='btn btn-icon btn-light btn-active-light-primary h-30px w-30px fw-bold fs-6 mx-2'
        >
          4
        </a>
        <a
          href='#'
          className='btn btn-icon btn-light btn-active-light-primary h-30px w-30px fw-bold fs-6 mx-2'
        >
          5
        </a>
        <span className='text-muted fw-bold fs-6 mx-2'>..</span>
        <a
          href='#'
          className='btn btn-icon btn-light btn-active-light-primary h-30px w-30px fw-bold fs-6 mx-2'
        >
          19
        </a>
      </div>
    </>
  )
}

export {Questions}
