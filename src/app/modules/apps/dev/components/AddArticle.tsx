

import React, {useState,useEffect,useRef, useMemo} from 'react'
import {TextFormatting} from './partials/TextFormatting'
import {EnableSidebar} from '../../../../../knowledgebase/layout/core'
import axios from "axios"
import { useFormik } from 'formik'
import { ArticleSchema } from '../../../../../knowledgebase/schemas'
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import { config } from 'process'
import { JoditComponent } from '../JoditComponent'

interface Product {
  id: number;
  product_name: string;
}

const REACT_APP_API_URL =
  import.meta.env.REACT_APP_API_URL || "http://localhost:3001";


const Article: React.FC = () => {
  const [textFormatting, setTextFormatting] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('')
  const editor=useRef(null)
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
        const response = await axios.get(`${REACT_APP_API_URL}/knowledgebase/products`, {
        // headers: {
        //     'x-refresh-token': 'a1e87553-2ee2-441e-993b-876d01ea9d3d',
        //     'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pbWl0LmRlc2FpQGFnYW1pLXRlY2guY29tIiwiaWQiOjEsImlhdCI6MTcwMzIyODUxNiwiZXhwIjoxNzAzMjI5NDE2fQ.02ZF5q5mAW-S7fbY8EbfuqysdoG2aXnYuwdGWtG5PGA'
        // }
    })
      .then(function (response: any) {
        console.log(response);
        if(response.status == 200) {
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
    article: "",
    product: "0",
    tags: "",
    public:'1'
  };
  

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues:initialValues,
    validationSchema:ArticleSchema,
    onSubmit: async (values) => {
      values.article=content;
      setLoading(true);
      addArticle(values.title,values.article,values.product,values.public,values.tags)
      navigate("/apps/devs/myarticle");
    }
  })
  
  function addArticle(
    title: string,
    description:string,
    product:string,
    visibility:string,
    tags:string
  ) {
    return axios.post(`${REACT_APP_API_URL}/knowledgebase/articles`, {
      title: title,
      description: description,
      product_id: product,
      visibility: visibility,
      tag_id: 1
    }, {
      // headers: {
      //   'x-refresh-token': 'a1e87553-2ee2-441e-993b-876d01ea9d3d',
      //   'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pbWl0LmRlc2FpQGFnYW1pLXRlY2guY29tIiwiaWQiOjEsImlhdCI6MTcwMzIyODUxNiwiZXhwIjoxNzAzMjI5NDE2fQ.02ZF5q5mAW-S7fbY8EbfuqysdoG2aXnYuwdGWtG5PGA'
      // }
    })
    .then(response => {
      console.log(response);
      setTimeout(() => {
        setLoading(false)
      }, 1000)
      alert('Article has been successfully Added!')
    })
    .catch(error => {
      console.error(error);
    });
  }

  return (
    <EnableSidebar>
      <form className="form" onSubmit={handleSubmit}>
        <div className="d-flex flex-column mb-8 fv-row">
          <label className="d-flex align-items-center mb-2">
            <span className="text-gray-700 fs-6 fw-bolder required">Title</span>
            <i
              className="fas fa-exclamation-circle ms-2 fs-7"
              data-bs-toggle="tooltip"
              title="Specify your Article's title"
            ></i>
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Your Article title"
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
              Article
            </span>
          </label>

          <div className="fv-row">
            {/* <textarea
              className="form-control mb-3"
              rows={10}
              name="article"
              placeholder="Please specify your Article"
              data-kt-autosize="true"
              value={values.article}
              onChange={handleChange}
              onBlur={handleBlur}
            ></textarea> */}
            <JoditComponent placeholder="Enter Content" content={content} setContent={setContent}/>
            {errors.article && touched.article ? (
              <p className="form-error" style={{ color: "red" }}>
                {errors.article}
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
          {/* <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span> */}
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
                title="Make your Article public to help others with solutions"
              />
            </span>
          </label>
          {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </EnableSidebar>
  );
}

export {Article}
