import { Form, useFormik } from "formik"
import { FormikProvider } from "formik"
import Header from "../../../../components/Header"
import { Steper } from "../../../../components/Stepper"
import { ActionButton } from "../../../../components/ActionButton"
import { InputField } from "../../../../components/Input-Field"
import { toast } from "react-toastify"
import { DropdownField } from "../../../../components"


const antibiotics = [
  {
      label: 'General',
      value: 'General'
  },
  {
      label: 'Cardiology',
      value: 'Cardiology'
  },
  {
      label: 'Neurology',
      value: 'Neurology'
  },
  {
      label: 'Orthopedics',
      value: 'Orthopedics'
  },
  {
      label: 'Gynecology',
      value: 'Gynecology'
  }
]



const AddCategory = () => {
  return (
    <div>
      <Header title="Add Sub-Category" hideHeader={true}
      listTitle="Add Sub-Category"
      />
      <div className="flex w-full gap-10">
        <div className="h-auto">  
          <div className="flex flex-col gap-4 bg-white mt-5 px-4 py-2">
            <Steper step={1} title="General Information" isActive={true} />
          </div>
          <div className="flex flex-col gap-3 col-span-2">

          </div>
        </div>

        <div className="w-full h-full">
          <EditVendor />
        </div>

      </div>
    </div>
    
  )
}

export default AddCategory


export const EditVendor = () => {
  const formik = useFormik({
    initialValues: {
        name: '',
        contactNumber: '',
        paitentId: '',
        department: '',
        date: '',
        doctor: ''
    },
    enableReinitialize: true,
    onSubmit: (values) => {
        toast.success('Form submitted successfully!');
        history.back();
        console.log(values)
    }
});

const { handleSubmit } = formik;

    return (
        <>
            <FormikProvider value={formik}>
                <Form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-5">
                        <div className="grid grid-cols-3 lg:grid-cols-3 gap-5 bg-white py-8 px-5">
                            <InputField
                                type="text"
                                label="Category Name"
                                placeholder="Medicine"
                                name="categoryname"
                            />
                             <InputField
                                type="text"
                                label="Description"
                                placeholder="Enter Short Description (optional)"
                                name="description"
                            />
                         <DropdownField
                                label="Status"
                                options={antibiotics}
                                name="selectStatus"
                            />
                            

                        </div>


                        <ActionButton
                            onCancel={() => {
                                history.back()
                            }}
                            onSubmit={handleSubmit}
                        />
                    </div>
                </Form>
            </FormikProvider>

        </>

  )
}
