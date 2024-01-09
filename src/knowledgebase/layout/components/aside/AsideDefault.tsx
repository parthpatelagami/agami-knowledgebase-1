import React, { useState, useEffect, FC } from "react";
import clsx from "clsx";
import { useLayout } from "../../core";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";

const AsideDefault: FC = () => {
  const REACT_APP_API_URL =
    import.meta.env.REACT_APP_API_URL || "http://localhost:3001";
  const { config, classes } = useLayout();
  const { aside } = config;
  const [countsData, setCountsData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  async function getDashboardData() {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/knowledgebase/getDashBoardData/`
      );
      if (response.status === 200) {
        setCountsData(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div
      id='kt_aside'
      className={clsx("aside", classes.aside.join(" "), {
        "d-none": !aside.display,
      })}
      data-kt-drawer='true'
      data-kt-drawer-name='aside'
      data-kt-drawer-activate='{default: true, lg: false}'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'200px', '300px': '225px'}"
      data-kt-drawer-direction='start'
      data-kt-drawer-toggle='#kt_aside_toggle'
    >
      <div
        className='hover-scroll-overlay-y my-5 my-lg-5 w-100 ps-4 ps-lg-0 pe-4 me-1'
        id='kt_aside_menu_wrapper'
        data-kt-scroll='true'
        data-kt-scroll-activate='{default: false, lg: true}'
        data-kt-scroll-height='auto'
        data-kt-scroll-dependencies='#kt_header'
        data-kt-scroll-wrappers='#kt_aside'
        data-kt-scroll-offset='5px'
      >
        <div
          className='menu menu-column menu-active-bg menu-hover-bg menu-title-gray-700 fs-6 menu-rounded w-100'
          id='#kt_aside_menu'
          data-kt-menu='true'
        >
          <div className='menu-item'>
            <div className='menu-content pb-2'>
              <span className='menu-section text-muted text-uppercase fs-7 fw-bolder'>
                Public
              </span>
            </div>
          </div>

          <div className='menu-item'>
            <NavLink to='/dashboard' className='menu-link'>
              <span className='menu-title'>All Questions</span>
              <span className='menu-badge'>
                {isLoading ? "Loading..." : countsData.all_questions_count}
              </span>
            </NavLink>
          </div>

          <div className='menu-item'>
            <NavLink to='/articles' className='menu-link'>
              <span className='menu-title'>All Articles</span>
              <span className='menu-badge'>
                {isLoading ? "Loading..." : countsData.all_articles_count}
              </span>
            </NavLink>
          </div>

          <div className='menu-item'>
            <NavLink to='/apps/devs/search' className='menu-link'>
              <span className='menu-title'>Search</span>
            </NavLink>
          </div>

          <div className='menu-item'>
            <NavLink to='/apps/devs/ask' className='menu-link'>
              <span className='menu-title'>Ask Question</span>
            </NavLink>
          </div>
          <div className='menu-item'>
            <NavLink to='/apps/devs/article' className='menu-link'>
              <span className='menu-title'>Add Articles</span>
            </NavLink>
          </div>

          <div className='menu-item pt-5'>
            <div className='menu-content pb-2'>
              <span className='menu-section text-muted text-uppercase fs-7 fw-bolder'>
                My Activity
              </span>
            </div>
          </div>

          <div className='menu-item'>
            <Link to='/apps/devs/questions' className='menu-link'>
              <span className='menu-title'>My Questions</span>
              <span className='menu-badge'>
                {isLoading ? "Loading..." : countsData.my_questions_count}
              </span>
            </Link>
          </div>
          <div className='menu-item'>
            <Link to='/apps/devs/myarticle' className='menu-link'>
              <span className='menu-title'>My Articles</span>
              <span className='menu-badge'>
                {isLoading ? "Loading..." : countsData.my_article_count}
              </span>
            </Link>
          </div>

          <div className='menu-item'>
            <Link to='/' className='menu-link'>
              <span className='menu-title'>Saved</span>
              <span className='menu-badge'>6</span>
            </Link>
          </div>

          <div className='menu-item pt-5'>
            <div className='menu-content pb-2'>
              <span className='menu-section text-muted text-uppercase fs-7 fw-bolder'>
                Categories
              </span>
            </div>
          </div>

          <div className='menu-item'>
            <NavLink to='/apps/category-management' className='menu-link'>
              <span className='menu-title'>My Categories</span>
            </NavLink>
          </div>

          {isLoading ? (
            <div>Loading Categories...</div>
          ) : (
            countsData.category_count.map((category: any) => (
              <div className='menu-item' key={category.name}>
                <NavLink to='/apps/category-management' className='menu-link'>
                  <span className='menu-title'>{category.name}</span>
                  <span className='menu-badge'>{category.count}</span>
                </NavLink>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export { AsideDefault };
