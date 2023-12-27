import * as Yup from "yup";

export const questionSchema = Yup.object({
    title:Yup.string().min(2).required("Please enter Question Title"),
    question:Yup.string().min(2).required("Please enter Question Description")
})