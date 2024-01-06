import * as Yup from "yup";

export const questionSchema = Yup.object({
    title:Yup.string().min(2).required("Please enter Question Title"),
    question:Yup.string().min(2).required("Please enter Question Description"),
    product: Yup.number().min(1).required("Product is required."),
})
export const ArticleSchema = Yup.object({
    title:Yup.string().min(2).required("Please enter Article Title"),
    //article:Yup.string().min(2).required("Please enter Article Description")
})

export const CategorySchema = Yup.object({
    name:Yup.string().min(2).required("Please enter Name"),
})
