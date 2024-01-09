import React, {useState} from 'react'
import {INotifications, notifications} from '../SettingsModel'

const Notifications: React.FC = () => {
  const [data, setData] = useState<INotifications>(notifications)

  const updateData = (fieldsToUpdate: Partial<INotifications>) => {
    const updatedData = {...data, ...fieldsToUpdate}
    setData(updatedData)
  }

  const [loading, setLoading] = useState(false)

  const click = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_notifications'
        aria-expanded='true'
        aria-controls='kt_account_notifications'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Notifications</h3>
        </div>
      </div>

      <div id='kt_account_notifications' className='collapse show'>
        <form className='form'>
          <div className='card-body border-top px-9 pt-3 pb-4'>
            <div className='table-responsive'>
              <table className='table table-row-dashed border-gray-300 align-middle gy-6'>
                <tbody className='fs-6 fw-bold'>
                  <tr>
                    <td className='min-w-250px fs-4 fw-bolder'>Notifications</td>
                    <td className='w-125px'>
                      <div className='form-check form-check-solid'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          value=''
                          id='kt_settings_notification_email'
                          defaultChecked={data.notifications.email}
                          onChange={() =>
                            updateData({
                              notifications: {
                                phone: data.notifications.phone,
                                email: !data.notifications.email,
                              },
                            })
                          }
                        />
                        <label
                          className='form-check-label ps-2'
                          htmlFor='kt_settings_notification_email'
                        >
                          Email
                        </label>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>Reply Questions</td>
                    <td>
                      <div className='form-check form-check-solid'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          value='1'
                          id='billing1'
                          defaultChecked={data.billingUpdates.email}
                          onChange={() =>
                            updateData({
                              billingUpdates: {
                                phone: data.billingUpdates.phone,
                                email: !data.billingUpdates.email,
                              },
                            })
                          }
                        />
                        <label className='form-check-label ps-2' htmlFor='billing1'></label>
                      </div>
                    </td>
                    <td>
                      <div className='form-check form-check-solid'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          value=''
                          id='billing2'
                          defaultChecked={data.billingUpdates.phone}
                          onChange={() =>
                            updateData({
                              billingUpdates: {
                                phone: !data.billingUpdates.phone,
                                email: data.billingUpdates.email,
                              },
                            })
                          }
                        />
                        <label className='form-check-label ps-2' htmlFor='billing2'></label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button className='btn btn-light btn-active-light-primary me-2'>Discard</button>
            <button type='button' onClick={click} className='btn btn-primary'>
              {!loading && 'Save Changes'}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export {Notifications}
