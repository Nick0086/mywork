// import { Modal } from 'antd'
// import React, { useEffect, useState } from 'react'
// import { Button } from 'react-bootstrap'
// import { useForm } from 'react-hook-form';
// import Select from 'react-select';
// import MF from './data/ModemFirmware.json'
// import MD from './data/Modemdata.json'
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import Accordion from 'react-bootstrap/Accordion';

// import  './Transceiver.css'


// export default function Transceiver() {

//     const [isModalOpen, setIsModalOpen] = useState(false)
//     const [datas, setDatas] = useState([]);

//     const { register, handleSubmit, setValue, formState: { errors }, control, reset,watch } = useForm();

//     const selectedOptions = watch("ModemFirmware");
//     const selectedOptions2 = watch("modemdata");

//     const submitHandler = (data) => {

//         console.log(data)
//         setDatas([...datas, data])
//         setValue('modemdata', null);
//         setValue('ModemFirmware', null);

//     };

//     const handleCancel = () => {
//         setIsModalOpen(false);
//         setValue('modemdata', '');
//         setValue('ModemFirmware', '');
//     };


//     return (
//         <div className='tw-pl-[280px] tw-pt-[105px] tw-pr-[30px] tw-w-full' >
//             <div className='tw-flex tw-justify-end tw-mb-4' >
//                 <Button type="primary" onClick={() => setIsModalOpen(true)}  >
//                     Add +
//                 </Button>
//             </div>
//             <Modal
//                 title="Transceiver"
//                 visible={isModalOpen}
//                 onCancel={handleCancel}
//                 width={920}
//                 footer={[
//                     <div className='tw-flex tw-items-center'>
//                         <div class="buttons tw-mt-5">
//                             <button type='button' className='btn btn-danger' onClick={handleSubmit(submitHandler)} >Add</button>
//                             <button type='button' className="btn btn-light text-dark" onClick={handleCancel} >Cancel</button>
//                         </div>
//                     </div>
//                 ]} a
//             >
//                 <form onSubmit={handleSubmit(submitHandler)} >
//                     <div class="tw-mb-5 tw-flex tw-items-center tw-justify-between">
//                         <label for="exampleFormControlInput1" className="tw-mr-2 tw-mb-0 form-label tw-w-1/5 tw-flex tw-items-center tw-justify-between">Title<span>:</span></label>
//                         <input {...register("title")} type="text" className="form-control tw-w-[79%] " id="exampleFormControlInput1" placeholder="" />
//                     </div>
//                     <div class="tw-mb-5 tw-flex tw-items-center tw-justify-between">
//                         <label for="exampleFormControlInput1" className="tw-mr-2 tw-mb-0 form-label tw-w-1/5 tw-flex tw-items-center tw-justify-between">CMD Description<span>:</span></label>
//                         <div className='tw-w-[79%] ' >
//                             <CKEditor
//                                 editor={ClassicEditor}
//                                 config={{
//                                     placeholder: "CMD Description ",
//                                     toolbar: {
//                                         removeItems: ['uploadImage']
//                                     }
//                                 }}
//                                 data=""
//                                 onChange={(event, editor) => {
//                                     const data = editor.getData();
//                                     setValue('CMD_description', data)
//                                 }}
//                                 onBlur={(event, editor) => {
//                                     console.log('Blur.', editor);
//                                 }}
//                                 onFocus={(event, editor) => {
//                                     console.log('Focus.', editor);
//                                 }}
//                             />
//                         </div>
//                     </div>

//                     <div class="tw-mb-5 tw-flex tw-items-center tw-justify-between">
//                         <label for="exampleFormControlInput1" className="tw-mr-2 tw-mb-0 form-label tw-w-1/5 tw-flex tw-items-center tw-justify-between">Response Description<span>:</span></label>
//                         <div className='tw-w-[79%] ' >
//                             <CKEditor
//                                 editor={ClassicEditor}
//                                 config={{
//                                     placeholder: "Response Description ",
//                                     toolbar: {
//                                         removeItems: ['uploadImage']
//                                     }
//                                 }}
//                                 data=""
//                                 onChange={(event, editor) => {
//                                     const data = editor.getData();
//                                     setValue('Response_description', data)
//                                 }}
//                                 onBlur={(event, editor) => {
//                                     console.log('Blur.', editor);
//                                 }}
//                                 onFocus={(event, editor) => {
//                                     console.log('Focus.', editor);
//                                 }}
//                             />
//                         </div>
//                     </div>

//                     <div class="tw-mb-5 tw-flex tw-items-center tw-justify-between">
//                         <label for="exampleFormControlInput1" className="tw-mr-2 tw-mb-0 form-label tw-w-1/5 tw-flex tw-items-center tw-justify-between">CMD Example<span>:</span></label>
//                         <div className='tw-w-[79%] ' >
//                             <CKEditor
//                                 editor={ClassicEditor}
//                                 config={{
//                                     placeholder: "CMD Example ",
//                                     toolbar: {
//                                         removeItems: ['uploadImage']
//                                     }
//                                 }}
//                                 data=""
//                                 onChange={(event, editor) => {
//                                     const data = editor.getData();
//                                     setValue('CMD_Example', data)
//                                 }}
//                                 onBlur={(event, editor) => {
//                                     console.log('Blur.', editor);
//                                 }}
//                                 onFocus={(event, editor) => {
//                                     console.log('Focus.', editor);
//                                 }}
//                             />
//                         </div>
//                     </div>

//                     <div class="tw-mb-5 tw-flex tw-items-center tw-justify-between">
//                         <label for="exampleFormControlInput1" className="tw-mr-2 tw-mb-0 form-label tw-w-1/5 tw-flex tw-items-center tw-justify-between">CMD Response Example<span>:</span></label>
//                         <div className='tw-w-[79%] ' >
//                             <CKEditor
//                                 editor={ClassicEditor}
//                                 config={{
//                                     placeholder: "CMD Response Example ",
//                                     toolbar: {
//                                         removeItems: ['uploadImage']
//                                     }
//                                 }}
//                                 data=""
//                                 onChange={(event, editor) => {
//                                     const data = editor.getData();
//                                     setValue('CMD_Response_Example', data)
//                                 }}
//                                 onBlur={(event, editor) => {
//                                     console.log('Blur.', editor);
//                                 }}
//                                 onFocus={(event, editor) => {
//                                     console.log('Focus.', editor);
//                                 }}
//                             />
//                         </div>
//                     </div>

//                     <div class="tw-mb-5 tw-flex tw-items-center tw-justify-between">
//                         <label for="exampleFormControlInput3" className="tw-mr-2 tw-mb-0 form-label tw-w-1/5 tw-flex tw-items-center tw-justify-between">Modem Type<span>:</span></label>
//                         <div className='tw-w-[79%] ' >
//                             <Select
//                                 isMulti
//                                 name="modemdata"
//                                 options={MD.map(mf => ({
//                                     'label': mf.MODEM_TYPE,
//                                     'value': mf
//                                 }))}
//                                 defaultValue={selectedOptions2}
//                                 styles={{
//                                     control: (baseStyles, state) => ({
//                                         ...baseStyles,
//                                         borderColor: state.isFocused ? '#6366f1' : '#a5b4fc',
//                                     }),
//                                 }}
//                                 onChange={selectedOptions => {
//                                     setValue("modemdata", selectedOptions.map(option => option.value));
//                                 }}
//                             />
//                         </div>
//                     </div>
//                     <div class="tw-mb-5 tw-flex tw-items-center tw-justify-between">
//                         <label for="exampleFormControlInput3" className="tw-mr-2 tw-mb-0 form-label tw-w-1/5 tw-flex tw-items-center tw-justify-between">Modem Fv<span>:</span></label>
//                         <div className='tw-w-[79%] ' >
//                             <Select
//                                 isMulti
//                                 name="ModemFirmware"
//                                 options={[
//                                     ...MF.map(mf => ({
//                                         'label': mf.MODEM_FIRMWARE_NAME,
//                                         'value': mf
//                                     })),
//                                     { 'label': '', 'value': '' } 
//                                 ]}
//                                 defaultValue={selectedOptions}
//                                 styles={{
//                                     control: (baseStyles, state) => ({
//                                         ...baseStyles,
//                                         borderColor: state.isFocused ? '#6366f1' : '#a5b4fc',
//                                     }),
//                                 }}
//                                 onChange={selectedOptions => {
//                                     setValue("ModemFirmware", selectedOptions.map(option => option.value));
//                                 }}
//                             />
//                         </div>
//                     </div>
//                 </form>
//             </Modal>
//             {
//                 datas && datas.length > 0 && datas.map((data, index) => (
//                     <div className='card tw-mb-5 ' key={index} >
//                         <div className="accordion-item">
//                             <h2 className="accordion-header tw-outline-none focus:tw-shadow-none  ">
//                                 <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#${index}`} aria-expanded="true" aria-controls={`${index}`}>
//                                 {data.title}
//                                 </button>
//                             </h2>
//                             <div id={`${index}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
//                                 <div class="accordion-body">
//                                     <div className='tw-grid tw-grid-cols-12 tw-gap-x-2 tw-mb-4 ' >
//                                         <div className='tw-col-span-3' >Title</div>
//                                         <div className='tw-col-span-9' >
//                                             {data.title}
//                                         </div>
//                                     </div>
//                                     <div className='tw-grid tw-grid-cols-12 tw-gap-x-2 tw-mb-4 ' >
//                                         <div className='tw-col-span-3' >CMD_description</div>
//                                         <div className='tw-col-span-9'  dangerouslySetInnerHTML={{ __html: data.CMD_description }} ></div>
//                                     </div>
//                                     <div className='tw-grid tw-grid-cols-12 tw-gap-x-2 tw-mb-4 ' >
//                                         <div className='tw-col-span-3' >Response_description</div>
//                                         <div className='tw-col-span-9'  dangerouslySetInnerHTML={{ __html: data.Response_description }} ></div>
//                                     </div>
//                                     <div className='tw-grid tw-grid-cols-12 tw-gap-x-2 tw-mb-4 ' >
//                                         <div className='tw-col-span-3' >CMD_Example</div>
//                                         <div className='tw-col-span-9'  dangerouslySetInnerHTML={{ __html: data.CMD_Example }} ></div>
//                                     </div>
//                                     <div className='tw-grid tw-grid-cols-12 tw-gap-x-2 tw-mb-4 ' >
//                                         <div className='tw-col-span-3' >CMD_Response_Example</div>
//                                         <div className='tw-col-span-9'  dangerouslySetInnerHTML={{ __html: data.CMD_Response_Example }} ></div>
//                                     </div>
//                                     <div className='tw-grid tw-grid-cols-12 tw-gap-x-2 tw-mb-4 ' >
//                                         <div className='tw-col-span-3' >Modem Type</div>
//                                         <div className='tw-col-span-9' >
//                                             {data.modemdata && data.modemdata.map(data => {
//                                                 return (
//                                                     <span key={data.SRNO} >{data.MODEM_TYPE}</span>
//                                                 )
//                                             })}
//                                         </div>
//                                     </div>
//                                     <div className='tw-grid tw-grid-cols-12 tw-gap-x-2 tw-mb-4 ' >
//                                         <div className='tw-col-span-3' >Modem Firmware</div>
//                                         <div className='tw-col-span-9' >
//                                             {data.ModemFirmware && data.ModemFirmware.map(data => {
//                                                 return (
//                                                     <span key={data.SRNO} >{data.MODEM_FIRMWARE_NAME}</span>
//                                                 )
//                                             })}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))
//             }
//         </div>
//     )
// }


<div className="accordion" id="accordionExample5">
    {ScriptIdData?.map((items) => (<div className="accordion-item bg-white border border-gray-200">
        <h2 className="accordion-header !tw-p-0 " id="headingOne5">
            <button className="accordion-button tw-relative tw-flex tw-items-center tw-w-full tw-py-4 tw-px-5 tw-text-base tw-text-gray-800 tw-text-left tw-bg-white tw-border-0 tw-rounded-none tw-transition focus:!tw-outline-none focus:tw-shadow-none" type="button" data-toggle="collapse" data-target={`#${items?.NAME}`} aria-expanded="true" aria-controls={items?.NAME} >
                ({items?.MODEM_NAME + ' _ ' + items?.METER_NAME}) {items?.NAME}
            </button>
        </h2>
        <div id={items?.NAME} className={`accordion-collapse collapse`} aria-labelledby={items?.NAME}>
            <div className="accordion-body tw-py-4 tw-px-5">
                your code
            </div>
        </div>
    </div>))}


</div>



// import React, { useEffect, useRef, useState } from 'react';
// import { Modal } from 'antd';
// import { Button } from 'react-bootstrap'
// import { Controller, useForm } from 'react-hook-form';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import Select from 'react-select';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import initialModems from './data/Modemdata.json';
// import initialFirmware from './data/ModemFirmware.json';
// import axios from 'axios';
// import moment from 'moment';

// export default function Transrecrver() {

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [dataLists, setDataList] = useState([]);
//     const [editData, setEditData] = useState(null);

//     useEffect(async () => {
//         const fetchData = async () => {
//             const response = await axios.get('http://localhost:5000/api/v1/transciver');
//             setDataList(response.data.res);
//         };
//         fetchData();
//     }, [])

//     const handleCancel = () => {
//         setEditData(null);
//         setIsModalOpen(false);
//     };

//     const handleEditData = (data) => {
//         console.log("edit", data)
//         setEditData(data);
//         setIsModalOpen(true);
//     };

//     const handleDataOnsubmit = async (data) => {
//         if (editData) {
//             const updatedDataLists = dataLists.map(item => (item === editData.data ? data : item));
//             setDataList(updatedDataLists);
//             var updated_by = 'testUser'
//             await axios.post('http://localhost:5000/api/v1/transciver/update', { ...data, updated_by: updated_by })
//                 .then(res => console.log(res))
//         } else {
//             const newData = { ...data, unique_id: `MTD${Date.now()}`, created_by: 'testUser', updated_by: 'testUser' };
//             setDataList([...dataLists, newData]);
//             await axios.post('http://localhost:5000/api/v1/transciver/add', newData);
//         }
//     };



//     return (
//         <div className='tw-pl-[280px] tw-pt-[105px] tw-pr-[30px] tw-w-full' >
//             <div className='card tw-p-4 '>
//                 <div className='tw-text-end tw-mb-6'>
//                     <Button type="primary" onClick={() => setIsModalOpen(true)}>
//                         Add +
//                     </Button>
//                 </div>
//                 <div className="accordion  !tw-mb-0" id="accordionExample" >
//                     {dataLists && dataLists.length > 0 ? (
//                         dataLists.map((datalist, index) => (
//                             <div key={index} className="card">
//                                 <div className="card-header" id={`heading${index}`}>
//                                     <h2 className="mb-0 tw-flex tw-w-full tw-justify-between">
//                                         <button
//                                             className="btn btn-block text-left tw-w-4/5"
//                                             type="button"
//                                             data-toggle="collapse"
//                                             data-target={`#collapse${index}`}
//                                             aria-expanded="true"
//                                             aria-controls={`collapse${index}`}
//                                         >
//                                             {datalist.cmd_title}
//                                         </button>
//                                         <div className="tw-w-1/5 tw-text-end">
//                                             <button
//                                                 onClick={() => handleEditData({ data: datalist, id: index })}
//                                                 className="btn btn-primary btn-block tw-w-3/5"
//                                                 type="button"
//                                             >
//                                                 Edit Data
//                                             </button>
//                                         </div>
//                                     </h2>
//                                 </div>
//                                 <div id={`collapse${index}`} className="collapse" aria-labelledby={`heading${index}`} data-parent="#accordionExample">
//                                     <div className="card-body">
//                                         <DataBody title={'Title'} content={datalist?.cmd_title} />
//                                         <DataBody title={'CMD Description'} content={datalist?.cmd_description} />
//                                         <DataBody title={'Response description'} content={datalist?.response_description} />
//                                         <DataBody title={'CMD Example'} content={datalist?.cmd_example} />
//                                         <DataBody title={'CMD Response Example'} content={datalist?.response_example} />
//                                         <DataBody title={'Modemdata'} content={datalist?.modem_type} />
//                                         <DataBody title={'ModemFirmware'} content={datalist?.modem_firmware} />
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <h4 className="tw-text-center tw-font-bold">Data Not Found</h4>
//                     )}
//                 </div>
//                 <AddListModal editData={editData?.data} handleEditData={handleEditData} isModalOpen={isModalOpen} handleCancel={handleCancel} handleDataOnsubmit={handleDataOnsubmit} />
//             </div>
//         </div >
//     );
// }

// function AddListModal({ editData, isModalOpen, handleCancel, handleDataOnsubmit }) {

//     const [modems, setModems] = useState(initialModems);
//     const [firmware, setFirmware] = useState(initialFirmware);

//     const formSchema = yup.object({
//         cmd_title: yup.string().required('Title is required'),
//         modem_type: yup.array().typeError("Atleast one Modemdata selected ").min(1, "Atleast one Modemdata selected"),
//         modem_firmware: yup.array().typeError("Atleast one Modem Firmware selected").min(1, "Atleast one Modem Firmware selected"),
//     }).required();

//     const { register, handleSubmit, setValue, reset, formState: { errors }, control } = useForm({
//         resolver: yupResolver(formSchema)
//     });

//     let cmd_description = useRef(null);
//     let response_description = useRef(null);
//     let cmd_example = useRef(null);
//     let response_example = useRef(null);

//     useEffect(() => {
//         if (!isModalOpen) {
//             reset();
//         }
//     }, [isModalOpen, reset]);

//     useEffect(() => {
//         if (editData) {
//             cmd_description.current.editor.setData(editData?.cmd_description)
//             response_description.current.editor.setData(editData?.response_description)
//             cmd_example.current.editor.setData(editData?.cmd_example)
//             response_example.current.editor.setData(editData?.response_example)
//             if (editData) {
//                 if (cmd_description.current && editData.cmd_description) {
//                     cmd_description.current.editor.setData(editData.cmd_description);
//                 }
//                 if (response_description.current && editData.response_description) {
//                     response_description.current.editor.setData(editData.response_description);
//                 }
//                 if (cmd_example.current && editData.cmd_example) {
//                     cmd_example.current.editor.setData(editData.cmd_example);
//                 }
//                 if (response_example.current && editData.response_example) {
//                     response_example.current.editor.setData(editData.response_example);
//                 }
//             }
//             setValue("cmd_title", editData?.cmd_title)
//             setValue("modem_type", editData?.modem_type)
//             setValue("modem_firmware", editData?.modem_firmware)
//             setValue("cmd_description", editData?.cmd_description)
//             // setValue("response_description", editData?.response_description)
//             // setValue("cmd_example", editData?.cmd_example)
//             // setValue("response_example", editData?.response_example)
//         }
//     }, [editData, isModalOpen]);

//     const clearEditor = () => {
//         cmd_description.current.editor.setData('')
//         response_description.current.editor.setData('')
//         cmd_example.current.editor.setData('')
//         response_example.current.editor.setData('')
//     };

//     const handleCancelModal = () => {
//         clearEditor();
//         reset({
//             cmd_title: null,
//             modem_type: [],
//             modem_firmware: [],
//         });
//         reset();
//         handleCancel();
//     };

//     const submitHandler = (data) => {
//         handleDataOnsubmit(data);

//         reset({
//             cmd_title: null,
//             modem_type: [],
//             modem_firmware: [],
//             // cmd_description:'',
//             // response_description:'',
//             // cmd_example:'',
//             // response_example:'',
//         });
//         clearEditor();
//         handleCancel();
//     };

//     return (
//         <Modal
//             title="Basic Modal"
//             visible={isModalOpen}
//             onCancel={handleCancelModal}
//             width={920}
//             maskClosable={false}
//             footer={[
//                 <div className='tw-flex tw-gap-x-3 tw-items-center'>
//                     <button type='button' className='btn btn-danger' onClick={handleSubmit(submitHandler)}>{editData ? "Edit" : "Add"}</button>
//                     <button type='button' className="btn btn-light text-dark" onClick={handleCancelModal}>Cancel</button>
//                 </div>
//             ]}
//         >
//             <form onSubmit={handleSubmit(submitHandler)}>
//                 <div>
//                     <FormField label="Title">
//                         <input {...register("cmd_title")} type="text" className="form-control tw-w-[79%] " placeholder="" />
//                     </FormField>
//                     {errors.cmd_title && <p className='tw-text-red-500 tw-font-bold' >{errors.cmd_title.message}</p>}
//                 </div>



//                 {/* <FormField label={'CMD Description'}>
//                     <div className='tw-w-[79%]' >
//                         <Controller
//                             name='cmd_description'
//                             control={control}
//                             render={({ field }) => (
//                                 <CKEditor
//                                     editor={ClassicEditor}
//                                     {...field}
//                                     data={field.value}
//                                     config={{
//                                         placeholder: "CMD Description",
//                                         toolbar: { removeItems: ['uploadImage'] }
//                                     }}
//                                     onChange={(event, editor) => {
//                                         const data = editor.getData();
//                                         setValue("cmd_description", data)
//                                     }}
//                                 />
//                             )}
//                         />
//                     </div>
//                 </FormField>

//                 <FormField label={'Response Description'}>
//                     <div className='tw-w-[79%]' >
//                         <Controller
//                             name='response_description'
//                             control={control}
//                             render={({ field }) => (
//                                 <CKEditor
//                                     editor={ClassicEditor}
//                                     {...field}
//                                     data={field.value}
//                                     config={{
//                                         placeholder: "Response description",
//                                         toolbar: { removeItems: ['uploadImage'] }
//                                     }}
//                                     onChange={(event, editor) => {
//                                         const data = editor.getData();
//                                         setValue("response_description", data)
//                                     }}
//                                 />
//                             )}
//                         />
//                     </div>
//                 </FormField>

//                 <FormField label={'CMD Example'}>
//                     <div className='tw-w-[79%]' >
//                         <Controller
//                             name='cmd_example'
//                             control={control}
//                             render={({ field }) => (
//                                 <CKEditor
//                                     editor={ClassicEditor}
//                                     {...field}
//                                     data={field.value}
//                                     config={{
//                                         placeholder:"CMD Example",
//                                         toolbar: { removeItems: ['uploadImage'] }
//                                     }}
//                                     onChange={(event, editor) => {
//                                         const data = editor.getData();
//                                         setValue("cmd_example", data)
//                                     }}
//                                 />
//                             )}
//                         />
//                     </div>
//                 </FormField>

//                 <FormField label={'CMD Response Example'}>
//                     <div className='tw-w-[79%]' >
//                         <Controller
//                             name='response_example'
//                             control={control}
//                             render={({ field }) => (
//                                 <CKEditor
//                                     editor={ClassicEditor}
//                                     {...field}
//                                     data={field.value}
//                                     config={{
//                                         placeholder:"CMD Response Example",
//                                         toolbar: { removeItems: ['uploadImage'] }
//                                     }}
//                                     onChange={(event, editor) => {
//                                         const data = editor.getData();
//                                         setValue("response_example", data)
//                                     }}
//                                 />
//                             )}
//                         />
//                     </div>
//                 </FormField> */}

//                 {/* <CKEditorFormField
//                     label="CMD Description"
//                     name="cmd_description"
//                     editorRef={cmd_description}
//                     setValue={setValue}
//                     placeholder="CMD Description"
//                 />

//                 <CKEditorFormField
//                     label="Response Description"
//                     name="response_description"
//                     editorRef={response_description}
//                     setValue={setValue}
//                     placeholder="Response description"
//                 />

//                 <CKEditorFormField
//                     label="CMD Example"
//                     name="cmd_example"
//                     editorRef={cmd_example}
//                     setValue={setValue}
//                     placeholder="CMD Example"
//                 />

//                 <CKEditorFormField
//                     label="CMD Response Example"
//                     name="response_example"
//                     editorRef={response_example}
//                     setValue={setValue}
//                     placeholder="CMD Response Example"
//                 /> */}

//                 <div>
//                     <FormField label="Modem data">
//                         <div className='tw-w-[79%]' >
//                             <Controller
//                                 name="modem_type"
//                                 control={control}
//                                 render={({ field }) => (
//                                     <Select
//                                         isMulti
//                                         {...field}

//                                         options={modems.map((fw) => ({
//                                             label: fw.MODEM_PROFILE_NAME,
//                                             value: fw.MODEM_UNIQUE_ID
//                                         }))}
//                                         getOptionLabel={(option) => option.label}
//                                         getOptionValue={(option) => option.label}
//                                         isClearable
//                                     />
//                                 )}
//                             />
//                         </div>
//                     </FormField>
//                     {errors.modem_type && <p className='tw-text-red-500 tw-font-bold' >{errors.modem_type.message}</p>}
//                 </div>

//                 <div>
//                     <FormField label="Modem Firmware">
//                         <div className='tw-w-[79%]' >
//                             <Controller
//                                 name="modem_firmware"
//                                 control={control}
//                                 render={({ field }) => (
//                                     <Select
//                                         isMulti
//                                         {...field}
//                                         options={firmware.map((modem) => ({
//                                             label: modem.MODEM_FIRMWARE_NAME,
//                                             value: modem.MODEM_FIRMWARE_UNIQUE_ID
//                                         }))}
//                                         getOptionLabel={(option) => option.label}
//                                         getOptionValue={(option) => option.label}
//                                         isClearable
//                                     />
//                                 )}
//                             />
//                         </div>
//                     </FormField>
//                     {errors.modem_type && <p className='tw-text-red-500 tw-font-bold' >{errors.modem_type.message}</p>}
//                 </div>
//             </form>
//         </Modal>
//     );
// }

// function FormField({ label, children }) {
//     return (
//         <div className="tw-mb-5 tw-flex tw-items-center tw-justify-between">
//             <label className="tw-mr-2 tw-mb-0 form-label tw-w-1/5 tw-flex tw-items-center tw-justify-between">{label}<span>:</span></label>
//             {children}
//         </div>
//     );
// }

// function CKEditorFormField({ label, name, editorRef, setValue, placeholder }) {
//     return (
//         <FormField label={label}>
//             <div className="tw-w-[79%]">
//                 <CKEditor
//                     editor={ClassicEditor}
//                     ref={editorRef}
//                     config={{
//                         placeholder: placeholder,
//                         toolbar: { removeItems: ['uploadImage'] }
//                     }}
//                     onChange={(event, editor) => {
//                         const data = editor.getData();
//                         setValue(name, data);
//                     }}
//                 />
//             </div>
//         </FormField>
//         // <FormField label={label}>
//         //     <div className='tw-w-[79%]' >
//         //         <Controller
//         //             name={name}
//         //             control={control}
//         //             render={({ field }) => (
//         //                 <CKEditor
//         //                     editor={ClassicEditor}
//         //                     data={field.value}
//         //                     onChange={(event, editor) => {
//         //                         const data = editor.getData();
//         //                         field.onChange(data);
//         //                     }}
//         //                     onBlur={field.onBlur}
//         //                 />
//         //             )}
//         //         />
//         //     </div>
//         // </FormField>
//     );
// }

// function DataBody({ title, content }) {
//     return (
//         <div className='tw-grid tw-grid-cols-12 tw-gap-x-2 tw-mb-4 border-bottom'>
//             <div className='tw-col-span-3 tw-flex tw-justify-between tw-items-center tw-mb-4 '>{title} <span>:</span></div>
//             {
//                 typeof content === 'string' ?
//                     <div className='tw-col-span-9' dangerouslySetInnerHTML={{ __html: content }} />
//                     :
//                     <div className='tw-col-span-9 tw-flex tw-items-center tw-gap-x-1 tw-flex-wrap'>
//                         {
//                             content && content.map((info) => {
//                                 return (
//                                     <span key={info?.value} className='tw-bg-gray-200 tw-rounded-sm tw-px-2 tw-py-1 tw-mb-4' >{info?.value}</span>
//                                 )
//                             }
//                             )
//                         }

//                     </div>
//             }

//         </div>
//     )

// }




import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'antd';
import { Button } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import initialModems from './data/Modemdata.json';
import initialFirmware from './data/ModemFirmware.json';
import axios from 'axios';
import moment from 'moment';

export default function Transrecrver() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataLists, setDataList] = useState([]);
    const [editData, setEditData] = useState(null);
    let cmd_description = useRef(null);
    let response_description = useRef(null);
    let cmd_example = useRef(null);
    let response_example = useRef(null);
    useEffect(async () => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:5000/api/v1/transciver');
            setDataList(response.data.res);
        };
        fetchData();
    }, [])

    const handleCancel = () => {
        setEditData(null);
        setIsModalOpen(false);
    };

    const handleEditData = (data) => {
        console.log("edit", data)
        setEditData(data);
        setIsModalOpen(true);
        console.log(cmd_description)
        
    };

    useEffect(()=>{
        if (cmd_description.current && editData.data.cmd_description) {
            cmd_description.current.editor.setData(editData.data.cmd_description);
        }
    },[cmd_description])

    useEffect(()=>{
        if (response_description.current && editData.data.response_description) {
            response_description.current.editor.setData(editData.data.response_description);
        }
    },[response_description])

    useEffect(()=>{
        if (cmd_example.current && editData.data.cmd_example) {
            cmd_example.current.editor.setData(editData.data.cmd_example);
        }
    },[cmd_example])

    useEffect(()=>{
        if (response_example.current && editData.data.response_example) {
            response_example.current.editor.setData(editData.data.response_example);
        } 
    },[response_example])

    const handleDataOnsubmit = async (data) => {
        if (editData) {
            const updatedDataLists = dataLists.map(item => (item === editData.data ? data : item));
            setDataList(updatedDataLists);
            var updated_by = 'testUser'
            await axios.post('http://localhost:5000/api/v1/transciver/update', { ...data, updated_by: updated_by })
                .then(res => console.log(res))
        } else {
            const newData = { ...data, unique_id: `MTD${Date.now()}`, created_by: 'testUser', updated_by: 'testUser' };
            setDataList([...dataLists, newData]);
            await axios.post('http://localhost:5000/api/v1/transciver/add', newData);
        }
    };



    return (
        <div className='tw-pl-[280px] tw-pt-[105px] tw-pr-[30px] tw-w-full' >
            <div className='card tw-p-4 '>
                <div className='tw-text-end tw-mb-6'>
                    <Button type="primary" onClick={() => setIsModalOpen(true)}>
                        Add +
                    </Button>
                </div>
                <div className="accordion  !tw-mb-0" id="accordionExample" >
                    {dataLists && dataLists.length > 0 ? (
                        dataLists.map((datalist, index) => (
                            <div key={index} className="card">
                                <div className="card-header" id={`heading${index}`}>
                                    <h2 className="mb-0 tw-flex tw-w-full tw-justify-between">
                                        <button
                                            className="btn btn-block text-left tw-w-4/5"
                                            type="button"
                                            data-toggle="collapse"
                                            data-target={`#collapse${index}`}
                                            aria-expanded="true"
                                            aria-controls={`collapse${index}`}
                                        >
                                            {datalist.cmd_title}
                                        </button>
                                        <div className="tw-w-1/5 tw-text-end">
                                            <button
                                                onClick={() => handleEditData({ data: datalist, id: index })}
                                                className="btn btn-primary btn-block tw-w-3/5"
                                                type="button"
                                            >
                                                Edit Data
                                            </button>
                                        </div>
                                    </h2>
                                </div>
                                <div id={`collapse${index}`} className="collapse" aria-labelledby={`heading${index}`} data-parent="#accordionExample">
                                    <div className="card-body">
                                        <DataBody title={'Title'} content={datalist?.cmd_title} />
                                        <DataBody title={'CMD Description'} content={datalist?.cmd_description} />
                                        <DataBody title={'Response description'} content={datalist?.response_description} />
                                        <DataBody title={'CMD Example'} content={datalist?.cmd_example} />
                                        <DataBody title={'CMD Response Example'} content={datalist?.response_example} />
                                        <DataBody title={'Modemdata'} content={datalist?.modem_type} />
                                        <DataBody title={'ModemFirmware'} content={datalist?.modem_firmware} />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h4 className="tw-text-center tw-font-bold">Data Not Found</h4>
                    )}
                </div>
                <AddListModal editData={editData?.data} handleEditData={handleEditData} cmd_description={cmd_description} response_description={response_description} response_example={response_example} cmd_example={cmd_example} isModalOpen={isModalOpen} handleCancel={handleCancel} handleDataOnsubmit={handleDataOnsubmit} />
            </div>
        </div >
    );
}

function AddListModal({ editData, isModalOpen, handleCancel, handleDataOnsubmit, cmd_description, response_description, response_example, cmd_example }) {

    const [modems, setModems] = useState(initialModems);
    const [firmware, setFirmware] = useState(initialFirmware);

    const [formDatas, setFormDatas] = useState({
        cmd_title: '',
        cmd_description: '',
        response_description: 'nbvcnghfh',
        cmd_example: '',
        response_example: '',
    })

    const formHandler = (name, value) => {
        setFormDatas(prevFormDatas => ({ ...prevFormDatas, [name]: value }));
        console.log("formData", formDatas);

    }



    useEffect(() => {
        if (editData) {
            setValue("cmd_title", editData?.cmd_title)
            setValue("modem_type", editData?.modem_type)
            setValue("modem_firmware", editData?.modem_firmware)
            setValue("cmd_description", editData?.cmd_description)
            setValue("response_description", editData?.response_description)
            setValue("cmd_example", editData?.cmd_example)
            setValue("response_example", editData?.response_example)
        }
    }, [editData, isModalOpen]);

    const formSchema = yup.object({
        cmd_title: yup.string().required('Title is required'),
        modem_type: yup.array().typeError("Atleast one Modemdata selected ").min(1, "Atleast one Modemdata selected"),
        modem_firmware: yup.array().typeError("Atleast one Modem Firmware selected").min(1, "Atleast one Modem Firmware selected"),
    }).required();

    const { register, handleSubmit, setValue, reset, formState: { errors }, control } = useForm({
        resolver: yupResolver(formSchema)
    });

    useEffect(() => {
        if (!isModalOpen) {
            reset();
        }
    }, [isModalOpen, reset]);

    const clearEditor = () => {
        cmd_description.current.editor.setData('')
        response_description.current.editor.setData('')
        cmd_example.current.editor.setData('')
        response_example.current.editor.setData('')
    };

    const handleCancelModal = () => {
        clearEditor();
        handleCancel();
    };

    const submitHandler = (data) => {
        handleDataOnsubmit(data);
        clearEditor();
        handleCancel();
    };

    return (
        <Modal
            title="Basic Modal"
            visible={isModalOpen}
            onCancel={handleCancelModal}
            width={920}
            maskClosable={false}
            footer={[
                <div className='tw-flex tw-gap-x-3 tw-items-center'>
                    <button type='button' className='btn btn-danger' onClick={submitHandler}>{editData ? "Edit" : "Add"}</button>
                    <button type='button' className="btn btn-light text-dark" onClick={handleCancelModal}>Cancel</button>
                </div>
            ]}
        >
            <form onSubmit={handleSubmit(submitHandler)}>
                <div>
                    <div>
                        <FormField label="Title">
                            <input {...register("cmd_title")} type="text" className="form-control tw-w-[79%] " placeholder="" />
                        </FormField>
                        {errors.cmd_title && <p className='tw-text-red-500 tw-font-bold' >{errors.cmd_title.message}</p>}
                    </div>
                    <CKEditorFormField
                        label="CMD Description"
                        name="cmd_description"
                        editorRef={cmd_description}
                        setValue={setValue}
                        placeholder="CMD Description"
                    />

                    <CKEditorFormField
                        label="Response Description"
                        name="response_description"
                        editorRef={response_description}
                        setValue={setValue}
                        placeholder="Response description"
                    />

                    <CKEditorFormField
                        label="CMD Example"
                        name="cmd_example"
                        editorRef={cmd_example}
                        setValue={setValue}
                        placeholder="CMD Example"
                    />

                    <CKEditorFormField
                        label="CMD Response Example"
                        name="response_example"
                        editorRef={response_example}
                        setValue={setValue}
                        placeholder="CMD Response Example"
                    />
                    <div>
                        <FormField label="Modem data">
                            <div className='tw-w-[79%]' >
                                <Controller
                                    name="modem_type"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            isMulti
                                            {...field}

                                            options={modems.map((fw) => ({
                                                label: fw.MODEM_PROFILE_NAME,
                                                value: fw.MODEM_UNIQUE_ID
                                            }))}
                                            getOptionLabel={(option) => option.label}
                                            getOptionValue={(option) => option.label}
                                            isClearable
                                        />
                                    )}
                                />
                            </div>
                        </FormField>
                        {errors.modem_type && <p className='tw-text-red-500 tw-font-bold' >{errors.modem_type.message}</p>}
                    </div>

                    <div>
                        <FormField label="Modem Firmware">
                            <div className='tw-w-[79%]' >
                                <Controller
                                    name="modem_firmware"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            isMulti
                                            {...field}
                                            options={firmware.map((modem) => ({
                                                label: modem.MODEM_FIRMWARE_NAME,
                                                value: modem.MODEM_FIRMWARE_UNIQUE_ID
                                            }))}
                                            getOptionLabel={(option) => option.label}
                                            getOptionValue={(option) => option.label}
                                            isClearable
                                        />
                                    )}
                                />
                            </div>
                        </FormField>
                        {errors.modem_type && <p className='tw-text-red-500 tw-font-bold' >{errors.modem_type.message}</p>}
                    </div>
                </div>
                {/* <FormField label="CMD Description">
                        <div className='tw-w-[79%]' >
                            <CKEditor
                                ref={cmd_description}
                                editor={ClassicEditor}
                                config={{
                                    // placeholder: placeholder,
                                    toolbar: { removeItems: ['uploadImage'] }
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    formHandler('cmd_description', data);
                                }}
                            />
                        </div>
                    </FormField>
                    <FormField label="Response Description">
                        <div className='tw-w-[79%]' >
                            <CKEditor
                                ref={response_description}
                                editor={ClassicEditor}
                                config={{
                                    // placeholder: placeholder,
                                    toolbar: { removeItems: ['uploadImage'] }
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    formHandler('response_description', data);
                                }}
                            />
                        </div>
                    </FormField>
                    <FormField label="CMD Description">
                        <div className='tw-w-[79%]' >
                            <CKEditor
                                ref={cmd_example}
                                editor={ClassicEditor}
                                config={{
                                    // placeholder: placeholder,
                                    toolbar: { removeItems: ['uploadImage'] }
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    formHandler('cmd_example', data);
                                }}
                            />
                        </div>
                    </FormField>
                    <FormField label="CMD Description">
                        <div className='tw-w-[79%]' >
                            <CKEditor
                                ref={response_example}
                                editor={ClassicEditor}
                                config={{
                                    // placeholder: placeholder,
                                    toolbar: { removeItems: ['uploadImage'] }
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    formHandler('response_example', data);
                                }}
                            />
                        </div>
                    </FormField> */}


            </form>
        </Modal >
    );
}

function FormField({ label, children }) {
    return (
        <div className="tw-mb-5 tw-flex tw-items-center tw-justify-between">
            <label className="tw-mr-2 tw-mb-0 form-label tw-w-1/5 tw-flex tw-items-center tw-justify-between">{label}<span>:</span></label>
            {children}
        </div>
    );
}

function CKEditorFormField({ label, name, editorRef, setValue, placeholder }) {
    return (
        <FormField label={label}>
            <div className="tw-w-[79%]">
                <CKEditor
                    editor={ClassicEditor}
                    ref={editorRef}
                    config={{
                        placeholder: placeholder,
                        toolbar: { removeItems: ['uploadImage'] }
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setValue(name, data);
                    }}
                />
            </div>
        </FormField>
        // <FormField label={label}>
        //     <div className='tw-w-[79%]' >
        //         <Controller
        //             name={name}
        //             control={control}
        //             render={({ field }) => (
        //                 <CKEditor
        //                     editor={ClassicEditor}
        //                     data={field.value}
        //                     onChange={(event, editor) => {
        //                         const data = editor.getData();
        //                         field.onChange(data);
        //                     }}
        //                     onBlur={field.onBlur}
        //                 />
        //             )}
        //         />
        //     </div>
        // </FormField>
    );
}

function DataBody({ title, content }) {
    return (
        <div className='tw-grid tw-grid-cols-12 tw-gap-x-2 tw-mb-4 border-bottom'>
            <div className='tw-col-span-3 tw-flex tw-justify-between tw-items-center tw-mb-4 '>{title} <span>:</span></div>
            {
                typeof content === 'string' ?
                    <div className='tw-col-span-9' dangerouslySetInnerHTML={{ __html: content }} />
                    :
                    <div className='tw-col-span-9 tw-flex tw-items-center tw-gap-x-1 tw-flex-wrap'>
                        {
                            content && content.map((info) => {
                                return (
                                    <span key={info?.value} className='tw-bg-gray-200 tw-rounded-sm tw-px-2 tw-py-1 tw-mb-4' >{info?.value}</span>
                                )
                            }
                            )
                        }

                    </div>
            }

        </div>
    )

}