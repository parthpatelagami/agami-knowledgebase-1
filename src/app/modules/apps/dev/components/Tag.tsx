

import React from 'react'
import {Questions} from './partials/Questions'
import {EnableSidebar} from '../../../../../knowledgebase/layout/core'

const Tag: React.FC = () => {
  return (
    <EnableSidebar>
      <Questions type="all"/>
    </EnableSidebar>
  )
}

export {Tag}
