

import React, {useState,useEffect} from 'react'
import {TextFormatting} from './partials/TextFormatting'
import {EnableSidebar} from '../../../../../knowledgebase/layout/core'
import axios from "axios"

interface Product {
  id: number;
  product_name: string;
}

const REACT_APP_API_URL =
  import.meta.env.REACT_APP_API_URL || "http://localhost:3001";


const Ask: React.FC = () => {
  const [textFormatting, setTextFormatting] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);


  useEffect(() => {
    async function fetchProducts() {
        const response = await axios.get(`${REACT_APP_API_URL}/knowledgebase/products`, {
        headers: {
            'x-refresh-token': 'a1e87553-2ee2-441e-993b-876d01ea9d3d',
            'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pbWl0LmRlc2FpQGFnYW1pLXRlY2guY29tIiwiaWQiOjEsImlhdCI6MTcwMzIyODUxNiwiZXhwIjoxNzAzMjI5NDE2fQ.02ZF5q5mAW-S7fbY8EbfuqysdoG2aXnYuwdGWtG5PGA'
        }
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

  return (
    <EnableSidebar>
      <form className='form'>
        <div className='d-flex flex-column mb-8 fv-row'>
          <label className='d-flex align-items-center mb-2'>
            <span className='text-gray-700 fs-6 fw-bolder required'>Title</span>

            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title="Specify your question's title"
            ></i>
          </label>

          <input
            type='text'
            className='form-control'
            placeholder='Your question title'
            name='title'
          />
        </div>

        <div className='d-flex flex-column mb-8'>
          <label className='mb-2'>
            <span className='text-gray-700 fs-6 fw-bolder required'>Question</span>
          </label>

          <div className='fv-row'>
            <textarea
              className='form-control mb-3'
              rows={10}
              name='question'
              placeholder='Please specify your question'
              data-kt-autosize='true'
            ></textarea>
          </div>

          <div
            onClick={() => {
              setTextFormatting(!textFormatting)
            }}
            className='text-primary fs-base fw-bold cursor-pointer'
          >
            Text formatting options
          </div>

          {textFormatting && <TextFormatting />}
        </div>

        <div className='d-flex flex-column mb-8'>
          <label className='mb-2'>
            <span className='text-gray-700 fs-6 fw-bolder'>Product</span>
            <span className='text-muted fs-7'>(optional)</span>
          </label>

          <select
            className='form-select'
            data-control='select2'
            data-placeholder='Select a product'
            name='product'
          >
            {products.map(product => (
            <option value={product.id}>
              {product.product_name}
            </option>
          ))}
      {JSON.stringify(products)}                
          </select>
        </div>

        <div className='d-flex flex-column mb-8 fv-row'>
          <label className='mb-2'>
            <span className='text-gray-700 fs-6 fw-bolder'>Tags</span>
            <span className='text-muted fs-7'>(optional)</span>
          </label>

          <input className='form-control' placeholder='E.g:  PHP, React, Vue' name='tags' />
        </div>

        <div className='d-flex flex-stack'>
          <label className='form-check form-switch form-check-custom form-check-solid'>
            <input className='form-check-input' type='checkbox' name='public' value='1' />
            <span className='form-check-label fs-7 fw-bolder text-gray-800'>
              Public
              <i
                className='fas fa-exclamation-circle ms-2 fs-7'
                data-bs-toggle='tooltip'
                data-bs-dismiss='click'
                title='Make your question public to help others with solutions'
              />
            </span>
          </label>

          <button className='btn btn-primary'>Submit</button>
        </div>
      </form>
    </EnableSidebar>
  )
}

export {Ask}
