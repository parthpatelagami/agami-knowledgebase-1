import {FC} from 'react'

type Props = {
  active?: boolean
}

const UserTwoStepsCell: FC<Props> = ({active}) => (
  <> {Number(active) === 1 ? 
  <div className='badge badge-light-info fw-bolder'>Activate</div> : 
  <div className='badge badge-light-warning fw-bolder'>Deactivate</div> 
  }</>
)

export {UserTwoStepsCell}
