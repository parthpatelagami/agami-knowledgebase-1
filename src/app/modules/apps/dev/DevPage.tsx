import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../knowledgebase/layout/core'
import {Ask} from './components/Ask'
import {Question} from './components/Question'
import {Search} from './components/Search'
import {Tag} from './components/Tag'
import { Questions } from './components/partials/Questions'
import { Article } from './components/AddArticle'
import { Articles } from './components/Article'
import { AddCategory } from './components/AddCategory'
import {EditCategory} from './components/EditCategory'

const devBreadCrumbs: Array<PageLink> = [
  {
    title: 'Dev',
    path: '/apps/dev/questions',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const DevPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='ask'
          element={
            <>
              <PageTitle breadcrumbs={devBreadCrumbs}>Private chat</PageTitle>
              <Ask />
            </>
          }
        />
        <Route
          path='article'
          element={
            <>
              <PageTitle breadcrumbs={devBreadCrumbs}>Private chat</PageTitle>
              <Article />
            </>
          }
        />
        <Route
          path='myarticle'
          element={
            <>
              <PageTitle breadcrumbs={devBreadCrumbs}>Private chat</PageTitle>
              <Articles />
            </>
          }
        />
        <Route
          path='questions'
          element={
            <>
              <PageTitle breadcrumbs={devBreadCrumbs}>Group chat</PageTitle>
              <Questions type="user"/>
            </>
          }
        />
        <Route
          path='question/:id'
          element={
            <>
              <PageTitle breadcrumbs={devBreadCrumbs}>Group chat</PageTitle>
              <Question/>
            </>
          }
        />
        <Route
          path='search'
          element={
            <>
              <PageTitle breadcrumbs={devBreadCrumbs}>Drawer chat</PageTitle>
              <Search />
            </>
          }
        />
        <Route
         path='addCategory'
         element={
           <>
             <PageTitle breadcrumbs={devBreadCrumbs}>Private chat</PageTitle>
<AddCategory />
           </>
         }
       />
                 <Route
         path='editCategory/:id'
         element={
           <>
             <PageTitle breadcrumbs={devBreadCrumbs}>Private chat</PageTitle>
<EditCategory />
           </>
         }
       />
        <Route
          path='tag'
          element={
            <>
              <PageTitle breadcrumbs={devBreadCrumbs}>Drawer chat</PageTitle>
              <Tag />
            </>
          }
        />
        <Route index element={<Navigate to='/apps/devs/questions' />} />
      </Route>
    </Routes>
  )
}

export default DevPage
