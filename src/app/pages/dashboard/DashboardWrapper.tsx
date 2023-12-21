
import {FC} from 'react'
import {EnableSidebar, PageTitle} from '../../../knowledgebase/layout/core'
import {Questions} from '../../modules/apps/dev/components/partials/Questions'

const DashboardWrapper: FC = () => {
  // const intl = useIntl()
  return (
    <EnableSidebar>
      <PageTitle description='You’ve got 24 New Sales' breadcrumbs={[]}>
        Hello, Paul
      </PageTitle>
      <Questions />
    </EnableSidebar>
  )
}

export {DashboardWrapper}
