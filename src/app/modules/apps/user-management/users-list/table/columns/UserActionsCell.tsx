
import {FC, useEffect, useState} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {MenuComponent} from '../../../../../../../knowledgebase/assets/ts/components'
import {ID, KTIcon, QUERIES} from '../../../../../../../knowledgebase/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteUser, getUsers} from '../../core/_requests'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const REACT_APP_API_URL =
  import.meta.env.REACT_APP_API_URL || "http://localhost:3001";


type Props = {
  id: ID
}

const UserActionsCell: FC<Props> = ({id}) => {
  const {setItemIdForUpdate} = useListView()
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()
  const [selectedAction, setFormAction] = useState(null)

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const navigate = useNavigate()

  const deleteItem = () =>  {
    // 💡 response of the mutation is passed to onSuccess
      MySwal.fire({
        title: 'Are you sure?',
        text: `You won't be able to revert ${id} form data!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ms-1'
        },
        buttonsStyling: false,
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        async preConfirm() {
            try {
              await deleteUser(id)
              setFormAction(null)
              queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`]);
              toast.success('Category has been successfully Deleted!', {
                position: toast.POSITION.TOP_RIGHT,
              });
              return true
            } catch (error) {
              setFormAction(null)
                MySwal.showValidationMessage(`Oops! We cannot delete ${id} form, please try again or contact support.`)
            }
        }
    }).then(function (result) {
        if (result.value) {
            MySwal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: `${id} form has been deleted.`,
                customClass: {
                    confirmButton: 'btn btn-success'
                },
                allowOutsideClick: false
            })
        } else if (result.dismiss === MySwal.DismissReason.cancel) {
          setFormAction(null)
        }
    })
}

  const editUser = () => {
    navigate(`/apps/devs/editCategory/${id}`);
}

  return (
    <>
      <a
        href='#'
        className='btn btn-light btn-active-light-primary btn-sm'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        Actions
        <KTIcon iconName='down' className='fs-5 m-0' />
      </a>
      {/* begin::Menu */}
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
        data-kt-menu='true'
      >
        {/* begin::Menu item */}
        <div className='menu-item px-3'>
          <a className='menu-link px-3' onClick={editUser}>    
                  Edit
          </a>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className='menu-item px-3'>
          <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            onClick={deleteItem}
          >
            Delete
          </a>
        </div>
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  )
}

export {UserActionsCell}
