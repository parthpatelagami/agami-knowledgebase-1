import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import {UserSwitchCell} from './UserSwitchCell'
import {UserLastLoginCell} from './UserLastLoginCell'
import {UserTwoStepsCell} from './UserTwoStepsCell'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'category_name',
    Cell: ({ ...props }) => {
      console.log("props", props.data); // Log props.data to the console
      return <UserInfoCell user={props.data[props.row.index]} />;
    },
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Status' className='min-w-125px' />
    ),
    id: 'active',
    Cell: ({...props}) => <UserTwoStepsCell active={props.data[props.row.index].active} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Created Date' className='min-w-125px' />
    ),
    accessor: 'created_date',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <UserActionsCell  id={props.data[props.row.index].id} />,
  },
]

export {usersColumns}
