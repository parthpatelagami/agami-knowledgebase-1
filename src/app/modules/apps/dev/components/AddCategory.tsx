

import React, {useState,useEffect} from 'react'
import {TextFormatting} from './partials/TextFormatting'
import {EnableSidebar} from '../../../../../knowledgebase/layout/core'
import axios from "axios"
import { useFormik } from 'formik'
import { CategorySchema } from '../../../../../knowledgebase/schemas'
import { useNavigate } from 'react-router-dom';

const REACT_APP_API_URL =
  import.meta.env.REACT_APP_API_URL || "http://localhost:3001";


const AddCategory: React.FC = () => {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const initialValues = {
    name: "",
    status:'1'
  };
  

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues:initialValues,
    validationSchema:CategorySchema,
    onSubmit: async (values) => {
      setLoading(true);
      addCategory(values.name,values.status)
    }
  })
  
  function addCategory(
    name: string,
    status:string
  ) {
    return axios.post(`${REACT_APP_API_URL}/knowledgebase/category`, {
      category_name: name,
      active: status
        }
    , {
      headers: {
        // 'x-refresh-token': 'a1e87553-2ee2-441e-993b-876d01ea9d3d',
        // 'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pbWl0LmRlc2FpQGFnYW1pLXRlY2guY29tIiwiaWQiOjEsImlhdCI6MTcwMzIyODUxNiwiZXhwIjoxNzAzMjI5NDE2fQ.02ZF5q5mAW-S7fbY8EbfuqysdoG2aXnYuwdGWtG5PGA'
      }
    })
    .then(response => {
      console.log(response);
      setTimeout(() => {
        setLoading(false)
      }, 1000)
      alert('Category has been successfully Added!')
      navigate("/apps/category-management/category");
    })
    .catch(error => {
      console.error(error);
    });
  }

    const backToCategory = () => {
       navigate('/apps/category-management/category')
       }

  return (
    <EnableSidebar>
      <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {/* begin::Add user */}
      <button type='button' className='btn btn-primary' onClick={backToCategory}>
        Back To Category
      </button>
      {/* end::Add user */}
    </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="d-flex flex-column mb-8 fv-row">
          <label className="d-flex align-items-center mb-2">
            <span className="text-gray-700 fs-6 fw-bolder required">Name</span>
            <i
              className="fas fa-exclamation-circle ms-2 fs-7"
              data-bs-toggle="tooltip"
              title="Specify your Name's title"
            ></i>
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Your Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && touched.name ? (
            <p className="form-error" style={{ color: "red" }}>
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="d-flex flex-stack">
          <label className="form-check form-switch form-check-custom form-check-solid">
            <input
              className="form-check-input"
              type="checkbox"
              name="status"
              defaultChecked
              value={values.status}
              onChange={(e) => {
                const newValue = e.target.checked ? "1" : "0";
                handleChange({ target: { name: "status", value: newValue } });
              }}
            />
            <span className="form-check-label fs-7 fw-bolder text-gray-800">
              Status
              <i
                className="fas fa-exclamation-circle ms-2 fs-7"
                data-bs-toggle="tooltip"
                data-bs-dismiss="click"
                title="Make your Article public to help others with solutions"
              />
            </span>
          </label>
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </EnableSidebar>
  );
}

export {AddCategory}
