import {KTIcon} from '../../../../../../../knowledgebase/helpers'
import {useListView} from '../../core/ListViewProvider'
// import {UsersListFilter} from './UsersListFilter'
import { useNavigate } from 'react-router-dom'

const UsersListToolbar = () => {
    // ** Hooks
const navigate = useNavigate()
    // ** Redirect back to form list
    const backToCategory = () => {
       navigate('/apps/devs/addCategory')
       }

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {/* begin::Add user */}
      <button type='button' className='btn btn-primary' onClick={backToCategory}>
        <KTIcon iconName='plus' className='fs-2' />
        Add Category
      </button>
      {/* end::Add user */}
    </div>
  )
}

export {UsersListToolbar}
