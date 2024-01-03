

import {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import { register,generateOTP,login} from '../core/_requests'
import {Link} from 'react-router-dom'
import {PasswordMeterComponent} from '../../../../knowledgebase/assets/ts/components'
import {useAuth} from '../core/Auth'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { setAuth } from '..'
import { UserModel } from '..'

const initialValues = {
  firstname: '',
  email: '',
  password: '',
  changepassword: '',
  // acceptTerms: false,
  otp:''
}

export function Registration() {
  const [loading, setLoading] = useState(false)
  const [isoptverifired, setIsotpverified] = useState(false)
  const [isoptsend, setIsotpsend] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()

  const registrationSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('First name is required'),
    email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Email is required'),
    password: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Password is required'),
    changepassword: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Password confirmation is required')
      .oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
    otp: !isoptsend
          ?Yup.string()
          : Yup.string().
          min(6,'Minimum 6 digit').
          max(6, 'Maximum 6 digit').
          required('OTP is required')
  })

  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)

      if(!isoptsend) {
        try {
          const {data: auth} = await generateOTP(
            values.email,
          )
          setIsotpsend(true);
          setSubmitting(false)
          setLoading(false)
          // showSuccessToastMessage("Sent OTP Successfully to "+formik.values.email)
        } catch (error) {
          setIsotpsend(false);
          console.error(error)
          saveAuth(undefined)
          showErrorToastMessage("ERROR! An error occured while sending otp")
          setStatus('An error occured while sending otp')
          setSubmitting(false)
          setLoading(false)
        }
      }
      else {
        try {
          await register(
            values.email,
            values.firstname,
            values.password,
            values.changepassword,
            values.otp,
          )
          showSuccessToastMessage(
            "Register successfully with " + values.email + " email."
          );          
          const { data: { api_token, refreshToken } } = await login(values.email, values.password);
          setLoading(false)
          
          const decodedRefreshToken = refreshToken ? jwtDecode(refreshToken) : null;
          const userId = decodedRefreshToken?.id ?? "";
          const companyId = decodedRefreshToken?.companyId ?? "";

          saveAuth({
            id: userId,
            api_token,
            refreshToken,
          });

          const userModelObject: UserModel | undefined =
            decodedRefreshToken && {
              id: userId,
              email: values.email,
              password: values.password,
              companyId,
              name: values.firstname,
            };            
          userModelObject && setCurrentUser(userModelObject)
        
        } catch (error) {
          console.error(error)
          saveAuth(undefined)
          setStatus('The registration details is incorrect')
          showErrorToastMessage("ERROR! The registration details are incorrect")
          setSubmitting(false)
          setLoading(false)
        }
      }
    },
  })

  const handleResendOTP = async () => {
    try {
      const {data: auth} = await generateOTP(
        formik.values.email
      )
      setIsotpsend(true);
      setLoading(false)
      showSuccessToastMessage("Sent OTP Successfully to "+formik.values.email)
    } catch (error) {
      showErrorToastMessage("ERROR! An error occured while sending otp")
      setIsotpsend(false);
      console.error(error)
      saveAuth(undefined)
      setLoading(false)
    }
  };

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])

  const showSuccessToastMessage = (message:string) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showErrorToastMessage = (message:string) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <form
      className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      noValidate
      id="kt_login_signup_form"
      onSubmit={formik.handleSubmit}
    >
      {/* begin::Heading */}
      <div className="text-center mb-11">
        {/* begin::Title */}
        <h1 className="text-gray-900 fw-bolder mb-3">Sign Up</h1>
        {/* end::Title */}
      </div>
      {/* end::Heading */}

      {/* begin::Login options */}

      {formik.status && (
        <div className="mb-lg-15 alert alert-danger">
          <div className="alert-text font-weight-bold">{formik.status}</div>
        </div>
      )}

      {/* begin::Form group Firstname */}
      <div className="fv-row mb-8">
        <label className="form-label fw-bolder text-gray-900 fs-6">
          Name
        </label>
        <input
          placeholder="First name"
          type="text"
          autoComplete="off"
          {...formik.getFieldProps("firstname")}
          className={clsx(
            "form-control bg-transparent",
            {
              "is-invalid": formik.touched.firstname && formik.errors.firstname,
            },
            {
              "is-valid": formik.touched.firstname && !formik.errors.firstname,
            }
          )}
        />
        {formik.touched.firstname && formik.errors.firstname && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.firstname}</span>
            </div>
          </div>
        )}
      </div>

      {/* begin::Form group Email */}
      <div className="fv-row mb-8">
        <label className="form-label fw-bolder text-gray-900 fs-6">Email</label>
        <input
          placeholder="Email"
          type="email"
          autoComplete="off"
          {...formik.getFieldProps("email")}
          className={clsx(
            "form-control bg-transparent",
            { "is-invalid": formik.touched.email && formik.errors.email },
            {
              "is-valid": formik.touched.email && !formik.errors.email,
            }
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Password */}
      <div className="fv-row mb-8" data-kt-password-meter="true">
        <div className="mb-1">
          <label className="form-label fw-bolder text-gray-900 fs-6">
            Password
          </label>
          <div className="position-relative mb-3">
            <input
              type="password"
              placeholder="Password"
              autoComplete="off"
              {...formik.getFieldProps("password")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.password && formik.errors.password,
                },
                {
                  "is-valid":
                    formik.touched.password && !formik.errors.password,
                }
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.password}</span>
                </div>
              </div>
            )}
          </div>
          {/* begin::Meter */}
          <div
            className="d-flex align-items-center mb-3"
            data-kt-password-meter-control="highlight"
          >
            <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
            <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
            <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
            <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div>
          </div>
          {/* end::Meter */}
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Form group Confirm password */}
      <div className="fv-row mb-5">
        <label className="form-label fw-bolder text-gray-900 fs-6">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Password confirmation"
          autoComplete="off"
          {...formik.getFieldProps("changepassword")}
          className={clsx(
            "form-control bg-transparent",
            {
              "is-invalid":
                formik.touched.changepassword && formik.errors.changepassword,
            },
            {
              "is-valid":
                formik.touched.changepassword && !formik.errors.changepassword,
            }
          )}
        />
        {formik.touched.changepassword && formik.errors.changepassword && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.changepassword}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* <div className="fv-row mb-8">
        <label
          className="form-check form-check-inline"
          htmlFor="kt_login_toc_agree"
        >
          <input
            className="form-check-input"
            type="checkbox"
            id="kt_login_toc_agree"
            {...formik.getFieldProps("acceptTerms")}
          />
          <span>
            <a
              href="https://www.agami-tech.com/"
              target="_blank"
              className="ms-1 link-primary"
            >
            I Accept the Terms and Conditions
            </a>
            .
          </span>
        </label>
        {formik.touched.acceptTerms && formik.errors.acceptTerms && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.acceptTerms}</span>
            </div>
          </div>
        )}
      </div> */}

      <div className="separator my-10">
      </div>

            {/* begin::Form group Confirm password */}
  <div className="fv-row mb-5">
    <label className="form-label fw-bolder text-gray-900 fs-6">
      Enter OTP
    </label>
    <input
      type="text"
      placeholder="OTP"
      autoComplete="off"
      {...formik.getFieldProps("otp")}
      className={clsx(
        "form-control bg-transparent",
        {
          "is-invalid": formik.touched.otp && formik.errors.otp,
        },
        {
          "is-valid": formik.touched.otp && !formik.errors.otp,
        }
      )}
    />
    {formik.touched.otp && formik.errors.otp && (
      <div className="fv-plugins-message-container">
        <div className="fv-help-block">
          <span role="alert">{formik.errors.otp}</span>
        </div>
      </div>
    )}
    <div className="text-muted">
      {isoptsend && formik.isValid && (<a href="#" className="link-primary p-0 btn" onClick={handleResendOTP}>Resend OTP</a> )}
      {isoptsend && !formik.isValid && (<a href="#" className="link-primary p-0 btn disabled" onClick={handleResendOTP}>Resend OTP</a> )}      
      <ToastContainer />
    </div>
    <div className="text-muted">
      {isoptsend && (<p className="text-success">OTP Send Successfully to {formik.values.email}</p>)}
      <ToastContainer />
    </div>
  </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className="text-center">
        <button
          type="submit"
          id="kt_sign_up_submit"
          className="btn btn-lg btn-primary w-100 mx-auto mb-5"
          disabled={
            formik.isSubmitting || !formik.isValid
          }
        >
          {!loading && isoptsend && <span className="indicator-label">Submit</span>}
          {!loading && !isoptsend && <span className="indicator-label">Get OTP</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              Please wait...{" "}
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>

        <Link to="/auth/login">
          <button
            type="button"
            id="kt_login_signup_form_cancel_button"
            className="btn btn-lg btn-light-primary w-100 mb-5"
          >
            Cancel
          </button>
        </Link>
      </div>
      {/* end::Form group */}
    </form>
  );
}
