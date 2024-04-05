import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import initialModems from '../Data/Modemdata.json';
import initialFirmware from '../Data/ModemFirmware.json';
import axios from 'axios';

export default function Transrecrver() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataLists, setDataList] = useState([]);
  const [editData, setEditData] = useState();
  let cmd_description = useRef(null);
  let response_description = useRef(null);
  let cmd_example = useRef(null);
  let response_example = useRef(null);

  const fetchData = async () => {
    await axios.get('http://localhost:5000/api/data')
      .then((response) => {
        console.log(response);
        setDataList(response.data.data);
      })
      .catch((error) => {
        console.error('Failed to fetch data:', error);
      })
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDataOnsubmit = async (data) => {

    const baseUrl = 'http://localhost:5000/api/data'
    const url = editData ? `${baseUrl}/updateData/${editData.data.unique_id}` : `${baseUrl}/addData`;

    data['unique_id'] = `MTD${Date.now()}`
    data['created_by'] = "John Doe"
    data['updated_by'] = "Jane Doe"

    await axios.post(url, data)
      .then((res) => {
        console.log('Success:', data, res);
        fetchData();
      })
      .catch((error) => {
        console.error('Error:', error.message);
      })

    if (editData) {
      dataLists[dataLists.indexOf(editData?.data)] = data;
      console.log('Success Update:', data);
      setEditData(null);
    } else {
      setDataList([...dataLists, data]);
      console.log('Success:', data);
    }
  };

  const handleEditData = (data) => {
    setEditData(data);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditData(null);
  };

  return (
    <div className='tw-w-10/12 tw-mx-auto'>
      <div className='card'>
        <div className='tw-text-end'>
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            Add +
          </Button>
        </div>
        {dataLists.length > 0 && (
          <div className="card">
            {dataLists.map((datalist, index) => (
              <div key={index} className="card">
                <div className="card-header" id={`${index}`}>
                  <h2 className="mb-0 tw-flex tw-justify-between">
                    <button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target={`${index}`} aria-expanded="true" aria-controls="collapseOne">
                      {datalist.cmd_title}
                    </button>
                    <button onClick={() => handleEditData({ data: datalist, unique_id: datalist.unique_id })} className="btn btn-primary btn-block text-left" type="button">
                      Edit Data
                    </button>
                  </h2>
                </div>

                <div id={`${index}`} className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                  <div className="card-body">
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
              </div>
            ))}
          </div>
        )}
        <AddList editData={editData?.data} cmd_description={cmd_description} response_description={response_description} response_example={response_example} cmd_example={cmd_example} handleEditData={handleEditData} isModalOpen={isModalOpen} handleCancel={handleCancel} handleDataOnsubmit={handleDataOnsubmit} />
      </div>
    </div>
  );
}

function AddList({ editData, isModalOpen, handleCancel, handleDataOnsubmit, cmd_description, response_description, response_example, cmd_example }) {

  const [modems, setModems] = useState(initialModems);
  const [firmware, setFirmware] = useState(initialFirmware);

  const formSchema = yup.object({
    cmd_title: yup.string().required('Title is required'),
  }).required();

  const { register, handleSubmit, setValue, reset, formState: { errors }, control } = useForm({
    resolver: yupResolver(formSchema)
  });


  useEffect(() => {
    if (!isModalOpen) {
      reset({
        cmd_title: '',
        modem_type: [],
        modem_firmware: [],
      })
      reset();
    }
  }, [isModalOpen, reset]);

  useEffect(() => {
    if (isModalOpen && editData) {
      setValue("cmd_title", editData?.cmd_title)
      setValue("modem_type", editData?.modem_type)
      setValue("modem_firmware", editData?.modem_firmware)
    };
  }, [isModalOpen, editData, setValue]);

  function callOnReady() {
    if (editData) {
      cmd_description?.current.editor.setData(editData?.cmd_description);
      response_description?.current.editor.setData(editData?.response_description);
      cmd_example?.current.editor.setData(editData?.cmd_example);
      response_example?.current.editor.setData(editData?.response_example);
    }
  }

  useEffect(() => {
    if (cmd_description.current && editData.cmd_description) {
      cmd_description.current.editor.setData(editData.cmd_description);
    }
  }, [cmd_description])

  useEffect(() => {
    if (response_description.current && editData.response_description) {
      response_description.current.editor.setData(editData.response_description);
    }
  }, [response_description])

  useEffect(() => {
    if (cmd_example.current && editData.cmd_example) {
      cmd_example.current.editor.setData(editData.cmd_example);
    }
  }, [cmd_example])

  useEffect(() => {
    if (response_example.current && editData.response_example) {
      response_example.current.editor.setData(editData.response_example);
    }
  }, [response_example])

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
      open={isModalOpen}
      onCancel={handleCancelModal}
      width={920}
      maskClosable={false}
      footer={[
        <div className='tw-flex tw-gap-x-3 tw-items-center'>
          <button type='button' className='btn btn-danger' onClick={handleSubmit(submitHandler)}>{editData ? "Edit" : "Add"}</button>
          <button type='button' className="btn btn-light text-dark" onClick={handleCancelModal}>Cancel</button>
        </div>
      ]}
    >
      <form onSubmit={handleSubmit(submitHandler)}>
        <FormField label="Title">
          <div className='tw-w-[79%]' >
            <input {...register("cmd_title")} type="text" className="form-control" placeholder="" />
            {errors?.cmd_title && <p className='tw-text-sm tw-font-bold tw-text-red-600 ' >{errors?.cmd_title.message}</p>}
          </div>
        </FormField>

        <CKEditorFormField
          label="CMD Description"
          name="cmd_description"
          editorRef={cmd_description}
          setValue={setValue}
          callOnReady={callOnReady}
          placeholder="CMD Description"
        />

        <CKEditorFormField
          label="Response Description"
          name="response_description"
          editorRef={response_description}
          setValue={setValue}
          callOnReady={callOnReady}
          placeholder="Response description"
        />

        <CKEditorFormField
          label="CMD Example"
          name="cmd_example"
          editorRef={cmd_example}
          setValue={setValue}
          callOnReady={callOnReady}
          placeholder="CMD Example"
        />

        <CKEditorFormField
          label="CMD Response Example"
          name="response_example"
          editorRef={response_example}
          setValue={setValue}
          callOnReady={callOnReady}
          placeholder="CMD Response Example"
        />

        <FormField label='firmware'>
          <div className="tw-w-[79%]" >
            <Controller
              name="modem_type"
              control={control}
              render={({ field }) => (
                <Select
                  isMulti
                  {...field}
                  options={modems.map((modem) => ({
                    label: modem.MODEM_PROFILE_NAME,
                    value: modem.MODEM_PROFILE_NAME
                  }))}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.label}
                  isClearable
                />
              )}
            />
          </div>
        </FormField>

        <FormField label='modemType'>
          <div className="tw-w-[79%]" >
            <Controller
              name="modem_firmware"
              control={control}
              render={({ field }) => (
                <Select
                  isMulti
                  {...field}
                  options={firmware.map((fw) => ({
                    label: fw.MODEM_FIRMWARE_NAME,
                    value: fw.MODEM_FIRMWARE_NAME,
                  }))}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.label}
                  isClearable
                />
              )}
            />
          </div>

        </FormField>
      </form>
    </Modal>
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

function CKEditorFormField({ label, name, editorRef, setValue, placeholder, callOnReady }) {
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
          onReady={() => {
            callOnReady();
          }}
        />
      </div>
    </FormField>
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


