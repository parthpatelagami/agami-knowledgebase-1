

import React, {useState,useEffect} from 'react'
import {TextFormatting} from './partials/TextFormatting'
import {EnableSidebar} from '../../../../../knowledgebase/layout/core'
import axios from "axios"
import { useFormik } from 'formik'
import { questionSchema } from '../../../../../knowledgebase/schemas'
import { useNavigate } from 'react-router-dom'
import { _steppedLineTo } from 'chart.js/helpers'

interface Product {
  id: number;
  product_name: string;
}


const REACT_APP_API_URL =
  import.meta.env.REACT_APP_API_URL || "http://localhost:3001";


const Ask: React.FC = () => {
  const [textFormatting, setTextFormatting] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();



  useEffect(() => {
    async function fetchProducts() {
        const response = await axios.get(`${REACT_APP_API_URL}/knowledgebase/products`)
      .then(function (response: any) {
        console.log(response);
        if(response.status == 200) {
          console.log(response)
          setProducts(response.data.products)
        }
      })
      .catch(function (error: any) {
        console.log(error);
      })
      .finally(function () {
      });
    }
    fetchProducts();
  }, []);

  const initialValues = {
    title: "",
    question: "",
    product: "0",
    tags: "",
    public:'1'
  };
  

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues:initialValues,
    validationSchema:questionSchema,
    onSubmit: async (values) => {
      setLoading(true);
      addQuestion(values.title,values.question,values.product,values.public,values.tags)
    }
  })
  
  function addQuestion(
    title: string,
    question:string,
    product:string,
    visibility:string,
    tags:string
  ) {
    return axios.post(`${REACT_APP_API_URL}/knowledgebase/questions`, {
      title: title,
      description: question,
      product_id: product,
      visibility: visibility,
      tags: tags,
    })
    .then(response => {
      console.log(response);
      setTimeout(() => {
        setLoading(false)
      }, 1000)
      navigate('/dashboard')
      alert('Question Added Successfully')
    })
    .catch(error => {
      console.error(error);
      setTimeout(() => {
        setLoading(false)
      }, 1000)
      navigate('/apps/devs/ask')
      alert('ERROR, Please try again')
    });
  }

  return (
    <EnableSidebar>
          {/* <div className="toastr toastr-success toastr-top-center">
    <button className="toastr-close-button"></button>
    <div className="toastr-title">Info Toast</div>
    <div className="toastr-message">This is an example of an info toast message.</div>
</div> */}
      <form className="form" onSubmit={handleSubmit}>
        <div className="d-flex flex-column mb-8 fv-row">
          <label className="d-flex align-items-center mb-2">
            <span className="text-gray-700 fs-6 fw-bolder required">Title</span>
            <i
              className="fas fa-exclamation-circle ms-2 fs-7"
              data-bs-toggle="tooltip"
              title="Specify your question's title"
            ></i>
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Your question title"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.title && touched.title ? (
            <p className="form-error" style={{ color: "red" }}>
              {errors.title}
            </p>
          ) : null}
        </div>

        <div className="d-flex flex-column mb-8">
          <label className="mb-2">
            <span className="text-gray-700 fs-6 fw-bolder required">
              Question
            </span>
          </label>

          <div className="fv-row">
            <textarea
              className="form-control mb-3"
              rows={10}
              name="question"
              placeholder="Please specify your question"
              data-kt-autosize="true"
              value={values.question}
              onChange={handleChange}
              onBlur={handleBlur}
            ></textarea>
            {errors.question && touched.question ? (
              <p className="form-error" style={{ color: "red" }}>
                {errors.question}
              </p>
            ) : null}
          </div>

          <div
            onClick={() => {
              setTextFormatting(!textFormatting);
            }}
            className="text-primary fs-base fw-bold cursor-pointer"
          >
            Text formatting options
          </div>

          {textFormatting && <TextFormatting />}
        </div>

        <div className="d-flex flex-column mb-8">
          <label className="mb-2">
            <span className="text-gray-700 fs-6 fw-bolder">Product</span>
            <span className="text-muted fs-7">(optional)</span>
          </label>

          <select
            className="form-select"
            data-control="select2"
            data-placeholder="Select a Product"
            name="product"
            data-live-search="true"
            value={values.product}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="0">--- Select a Product ---</option>
            {products.map((product) => (
              <option value={product.id}>{product.product_name}</option>
            ))}
          </select>
        </div>

        <div className="d-flex flex-column mb-8 fv-row">
          <label className="mb-2">
            <span className="text-gray-700 fs-6 fw-bolder">Tags</span>
            <span className="text-muted fs-7">(optional)</span>
          </label>

          <input
            className="form-control"
            placeholder="E.g:  PHP, React, Vue"
            name="tags"
            value={values.tags}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {/* <TagifySelectExample /> */}
        </div>

        <div className="d-flex flex-stack">
          <label className="form-check form-switch form-check-custom form-check-solid">
            <input
              className="form-check-input"
              type="checkbox"
              name="public"
              defaultChecked
              value={values.public}
              onChange={(e) => {
                const newValue = e.target.checked ? 1 : 0;
                handleChange({ target: { name: "public", value: newValue } });
              }}
            />
            <span className="form-check-label fs-7 fw-bolder text-gray-800">
              Public
              <i
                className="fas fa-exclamation-circle ms-2 fs-7"
                data-bs-toggle="tooltip"
                data-bs-dismiss="click"
                title="Make your question public to help others with solutions"
              />
            </span>
          </label>
          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button type='submit' className='btn btn-primary' disabled={loading}>
              {!loading && 'Save Changes'}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </div>
      </form>
    </EnableSidebar>
  );
}

export {Ask}
