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
        // if (cmd_description.current && data.data.cmd_description) {
        //     cmd_description.current.editor.setData(data.data.cmd_description);
        // }
        // if (response_description.current && data.data.response_description) {
        //     response_description.current.editor.setData(data.data.response_description);
        // }
        // if (cmd_example.current && data.cmd_example) {
        //     cmd_example.current.editor.setData(data.data.cmd_example);
        // }
        // if (response_example.current && data.response_example) {
        //     response_example.current.editor.setData(data.data.response_example);
        // }
    };

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
                <AddListModal editData={editData?.data} handleEditData={handleEditData} cmd_description={cmd_description} response_description={response_description} response_example={response_example} cmd_example={cmd_example}   isModalOpen={isModalOpen} handleCancel={handleCancel} handleDataOnsubmit={handleDataOnsubmit} />
            </div>
        </div >
    );
}

function AddListModal({ editData, isModalOpen, handleCancel, handleDataOnsubmit,cmd_description, response_description, response_example, cmd_example }) {

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

    const formSchema = yup.object({
        cmd_title: yup.string().required('Title is required'),
        modem_type: yup.array().typeError("Atleast one Modemdata selected ").min(1, "Atleast one Modemdata selected"),
        modem_firmware: yup.array().typeError("Atleast one Modem Firmware selected").min(1, "Atleast one Modem Firmware selected"),
    }).required();

    

    useEffect(() => {
        if (!isModalOpen) {

        }
    }, [isModalOpen]);

    useEffect(()=>{
        if (cmd_description.current && editData.cmd_description) {
            cmd_description.current.editor.setData(editData.cmd_description);
        }
    },[cmd_description])

    useEffect(()=>{
        if (response_description.current && editData.response_description) {
            response_description.current.editor.setData(editData.response_description);
        }
    },[response_description])

    useEffect(()=>{
        if (cmd_example.current && editData.cmd_example) {
            cmd_example.current.editor.setData(editData.cmd_example);
        }
    },[cmd_example])

    useEffect(()=>{
        if (response_example.current && editData.response_example) {
            response_example.current.editor.setData(editData.response_example);
        } 
    },[response_example])

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
            <form >
                <div>
                    <FormField label="Title">
                        <input type="text" name="cmd_title" onChange={(e) => formHandler("cmd_title", e.target.value)} className="form-control tw-w-[79%] " placeholder="" />
                    </FormField>
                    <FormField label="CMD Description">
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
                    </FormField>

                </div>

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