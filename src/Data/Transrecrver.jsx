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

export default function Transrecrver() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataLists, setDataList] = useState([]);
  const [editData, setEditData] = useState();

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditData(null);
  };

  const handleDataOnsubmit = (data) => {
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
                      {datalist.title}
                    </button>
                    <button onClick={() => handleEditData({ data: datalist, id: index })} className="btn btn-primary btn-block text-left" type="button">
                      Edit Data
                    </button>
                  </h2>
                </div>

                <div id={`${index}`} className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                  <div className="card-body">
                    {Object.entries(datalist).map(([key, value], idx) => (
                      <div key={idx} className='tw-grid tw-grid-cols-12 tw-gap-x-2 tw-mb-4'>
                        <div className='tw-col-span-3'>{key}</div>
                        <div className='tw-col-span-9' dangerouslySetInnerHTML={{ __html: typeof value === 'string' ? value : value?.label }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <AddList editData={editData?.data} handleEditData={handleEditData} isModalOpen={isModalOpen} handleCancel={handleCancel} handleDataOnsubmit={handleDataOnsubmit} />
      </div>
    </div>
  );
}

function AddList({ editData, isModalOpen, handleCancel, handleDataOnsubmit }) {

  const [modems, setModems] = useState(initialModems);
  const [firmware, setFirmware] = useState(initialFirmware);

  const formSchema = yup.object({
    title: yup.string().required('Title is required'),
    CMD_Description: yup.string().required('CMD Description is required'),
    Response_description: yup.string().required('Response Description is required'),
    CMD_Example: yup.string().required('CMD Example is required'),
    CMD_Response_Example: yup.string().required('CMD Response Example is required'),
  }).required();

  const { register, handleSubmit, setValue, reset, formState: { errors }, control } = useForm({
    // resolver: yupResolver(formSchema)
  });

  const editorsRef = {
    CMD_Description: useRef(null),
    Response_description: useRef(null),
    CMD_Example: useRef(null),
    CMD_Response_Example: useRef(null)
  };

  useEffect(() => {
    if (!isModalOpen) {
      reset();
    }
  }, [isModalOpen, reset]);

  useEffect(() => {
    if (isModalOpen && editData) {
      Object.entries(editData).forEach(([key, value]) => {
        if (editorsRef[key]?.current) {
          editorsRef[key].current.editor.setData(value || '');
        } else {
          setValue(key, value);
        }
      });
    }
  }, [isModalOpen, editData, setValue]);

  const clearEditor = () => {
    Object.values(editorsRef).forEach(ref => {
      if (ref && ref.current && ref.current.editor) {
        ref.current.editor.setData('');
      }
    });
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
          <input {...register("title")} type="text" className="form-control" placeholder="" />
          {errors.title && <p>{errors.title.message}</p>}
        </FormField>

        <CKEditorFormField
          label="CMD Description"
          name="CMD_Description"
          editorRef={editorsRef.CMD_Description}
          setValue={setValue}
          placeholder="CMD Description"
        />

        <CKEditorFormField
          label="Response Description"
          name="Response_description"
          editorRef={editorsRef.Response_description}
          setValue={setValue}
          placeholder="Response description"
        />

        <CKEditorFormField
          label="CMD Example"
          name="CMD_Example"
          editorRef={editorsRef.CMD_Example}
          setValue={setValue}
          placeholder="CMD Example"
        />

        <CKEditorFormField
          label="CMD Response Example"
          name="CMD_Response_Example"
          editorRef={editorsRef.CMD_Response_Example}
          setValue={setValue}
          placeholder="CMD Response Example"
        />

        <Controller
          name="firmware"
          control={control}
          render={({ field}) => (
            <Select
            isMulti
            
              {...field}
              options={firmware.map((fw) => ({
                label: fw.MODEM_FIRMWARE_NAME,
                value: fw
              }))}
              
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value} 
              isClearable
            />
          )}
        />

        <Controller
          name="modemType"
          control={control}
          render={({ field }) => (
            <Select
            isMulti
              {...field}
              options={modems.map((modem) => ({
                label: modem.MODEM_TYPE_NAME,
                value: modem
              }))}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value} 
              isClearable
            />
          )}
        />
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
  );
}
