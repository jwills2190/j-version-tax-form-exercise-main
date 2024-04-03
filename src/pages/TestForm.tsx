
import { useFormik } from 'formik';
import * as Yup from "yup"
export default function TestForm() {

    const formik = useFormik({
        initialValues: {
            name: "",
            addressOne: "",
            requestExtension: ""
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(20, "Must be 20 Characters or Less")
                .required("Required"),
            addressOne: Yup.string().max(30, "Must be 30 Characters or Less").required("Required"),
            requestExtension: Yup.string()
                .required("You must include a reason for you extension request")
                .min(10, "Your reason must be 10 or more characters.")
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    });
    console.log(formik.touched);
    console.log(formik.values);
    return (
        <form style={{ lineHeight: 7, padding: 20 }} onSubmit={formik.handleSubmit}>
            <div>
                <input style={{ width: "500px", height: "100px" }}
                    id="name"
                    name='name'
                    type="text"
                    placeholder="Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? <p>{formik.errors.name}</p> : null}
            </div>
            <div>
                <input style={{ width: "500px", height: "100px" }}
                    id="addressOne"
                    name='addressOne'
                    type="text"
                    placeholder="Address 1"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.addressOne}
                />
                {formik.touched.addressOne && formik.errors.addressOne ? <p>{formik.errors.addressOne}</p> : null}
            </div>

            <div>
                <input style={{ width: "500px", height: "100px" }}
                    id="requestExtension"
                    name="requestExtension"
                    type="test"
                    placeholder="Reason for Extension"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.requestExtension}
                />
                {formik.touched.requestExtension && formik.errors.requestExtension ? <p>{formik.errors.requestExtension}</p> : null}
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}
