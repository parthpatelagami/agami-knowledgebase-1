import {FC} from 'react'
import {EnableSidebar, PageTitle} from '../../../knowledgebase/layout/core'
import {Questions} from '../../modules/apps/dev/components/partials/Questions'
import { Articles } from '../../modules/apps/dev/components/Article'

const ArticleWrapper: FC = () => {
  // const intl = useIntl()
  return (
    <EnableSidebar>
      <PageTitle description='You’ve got 24 New Sales' breadcrumbs={[]}>
        Hello, Paul
      </PageTitle>
      <Articles type="all"/>
    </EnableSidebar>
  )
}

export {ArticleWrapper}
