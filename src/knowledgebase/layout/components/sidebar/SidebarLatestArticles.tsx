import React, { useState, useEffect, FC } from "react";
import { Link } from "react-router-dom";
import { KTIcon } from "../../../helpers";
import axios from "axios";

const SidebarLatestArticles: FC = () => {
  const [articlesData, setArticlesData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const REACT_APP_API_URL =
    import.meta.env.REACT_APP_API_URL || "http://localhost:3001";

  async function getLatestArticles() {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/knowledgebase/getLatestArticles/`
      );
      if (response.status === 200) {
        setArticlesData(response.data);
      }
    } catch (error) {
      console.error(error);
      setError("Error fetching latest articles");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getLatestArticles();
  }, []);

  return (
    <div className='card bg-light mb-5 mb-lg-10 shadow-none border-0'>
      <div className='card-header align-items-center border-0'>
        <h3 className='card-title fw-bolder text-gray-900 fs-3'>
          Latest Articles
        </h3>
      </div>

      <div className='card-body pt-0'>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          articlesData.map((article: any) => (
            <div className='d-flex mb-5' key={article.id}>
              <KTIcon iconName='right-square' className='fs-2 mt-0 me-2' />
              <Link
                to={`/apps/devs/viewarticle/${article.id}`}
                className='text-gray-700 text-hover-primary fs-6 fw-bold'
              >
                {article.title}
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export { SidebarLatestArticles };
