import React, { useState, useEffect, FC } from "react";
import { KTIcon } from "../../../helpers";
import { Link } from "react-router-dom";
import axios from "axios";

const SidebarPopularQuestions: FC = () => {
  const [questionsData, setQuestionsData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const REACT_APP_API_URL =
    import.meta.env.REACT_APP_API_URL || "http://localhost:3001";

  async function getPopularQuestions() {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/knowledgebase/getPopularQuestions/`
      );
      if (response.status === 200) {
        setQuestionsData(response.data);
      }
    } catch (error) {
      console.error(error);
      setError("Error fetching latest articles");
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getPopularQuestions();
  }, []);

  return (
    <div className='card bg-light mb-5 mb-lg-10 shadow-none border-0'>
      <div className='card-header align-items-center border-0'>
        <h3 className='card-title fw-bolder text-gray-900 fs-3'>
          Popular Questions
        </h3>
      </div>

      <div className='card-body pt-0'>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          questionsData.map((questions: any) => (
            <div className='d-flex mb-5' key={questions.id}>
              <KTIcon iconName='right-square' className='fs-2 mt-0 me-2' />
              <Link
                to={`/apps/devs/question/${questions.id}`}
                className='text-gray-700 text-hover-primary fs-6 fw-bold'
              >
                {questions.questionId.title}
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export { SidebarPopularQuestions };
