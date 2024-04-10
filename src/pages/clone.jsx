import React, { useEffect, useRef, useState } from 'react';
import { Modal, Tag } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import initialModems from '../Data/Modemdata.json';
import initialFirmware from '../Data/ModemFirmware.json';
import { Button } from 'react-bootstrap'
import axios from 'axios';
import './table.css'
import { FiEdit, FiFilter } from "react-icons/fi";
import { CgSpinnerTwoAlt } from "react-icons/cg";



export default function Transrecrver() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [dataLists, setDataList] = useState([]);
  const [filterData, setFilterData] = useState();
  const [editData, setEditData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  let cmd_description = useRef(null);
  let response_description = useRef(null);
  let cmd_example = useRef(null);
  let response_example = useRef(null);

  const clearEditor = () => {
    cmd_description.current.editor.setData('')
    response_description.current.editor.setData('')
    cmd_example.current.editor.setData('')
    response_example.current.editor.setData('')
  };

  const fetchData = async () => {
    await axios.get('http://localhost:5000/api/v1/transciver')
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
    setIsLoading(false)

    const baseUrl = 'http://localhost:5000/api/v1/transciver'
    const url = editData ? `${baseUrl}/updateData/${editData.data.unique_id}` : `${baseUrl}/addData`;

    data['created_by'] = "John Doe"
    data['updated_by'] = "Jane Doe"
    data['status'] = data?.status?.value;
    // data['modem_firmware'] = data['modem_firmware'].map(item => item.value);

    await axios.post(url, data)
      .then((res) => {
          fetchData();
          setIsLoading(true)
          setIsModalOpen(false)
          clearEditor();
      })
      .catch((error) => {
        setIsLoading(true)
        console.error('Error:', error.message);
      })
  };

  const handleFilter = async (data) => {
    await axios.post('http://localhost:5000/api/v1/transciver/filter', data)
      .then((response) => {
        setDataList(response.data.data);
        setIsFilterModalOpen(false)
        setFilterData(data)
      })
      .catch((error) => {
        console.error('Error:', error.message);
      })
  }

  const handleEditData = (data) => {
    setEditData(data);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditData(null);
  };

  // =============== filter ==========

  const handleFilterModal = () => {
    setIsFilterModalOpen(false);
  }

  const clearFilter = () => {
    setFilterData();
    fetchData();
  }

  return (
    <div className='tw-p-8 tw-w-full' >
      <div className='card tw-p-4'>
        <div className='tw-flex tw-items-center tw-justify-between'>
          <h4 className='tw-capitalize tw-text-2xl tw-font-bold' >transceiver documents</h4>
          <div className='tw-text-end tw-mb-6 tw-flex tw-items-center tw-gap-2'>
            <button type="button" className="btn btn-danger" onClick={() => setIsFilterModalOpen(true)} >Filter<FiFilter className='tw-ml-1' /> </button>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              Add +
            </Button>
          </div>
        </div >
        {
          filterData && <div className='tw-flex tw-flex-wrap tw-gap-3 tw-mb-5' >
            <FilterBar data={filterData} />
            <button onClick={clearFilter} className='tw-inline-block tw-bg-red-100 tw-whitespace-nowrap tw-rounded-md tw-text-xs tw-px-2 tw-py-1 border !tw-border-red-500 hover:tw-bg-red-200 tw-transition-all'>
              Clear Filter
            </button>
          </div>
        }
        <div className="accordion !tw-mb-0" id="accordionExample">
          {dataLists && dataLists.length > 0 ? (
            dataLists.map((datalist, index) => (
              <div key={index} className="card  !tw-mb-3 !tw-rounded-md">
                <div className="card-header !tw-px-1 " id={`heading${index}`}>
                  <h2 className="mb-0 tw-flex tw-w-full tw-items-center tw-justify-between  ">
                    <button
                      className="btn btn-block text-left tw-px-2 tw-w-full"
                      type="button"
                      data-toggle="collapse"
                      data-target={`#collapse${index}`}
                      aria-expanded="false"
                      aria-controls={`collapse${index}`}
                    >

                      <span className="tw-text-lg tw-font-semibold tw-flex tw-items-center tw-gap-x-2 ">
                        <span className="" >{`${index + 1} )`}</span>
                        {datalist.cmd_title}

                      </span>
                    </button>
                    <div className='tw-flex tw-items-center tw-gap-x-2 tw-justify-center' >
                      {
                        datalist?.status === "Active"
                          ? <Tag style={{ fontSize: '14px', padding: '4px 8px', borderRadius: '10px' }} color="#87d068">Active</Tag>
                          : <Tag style={{ fontSize: '14px', padding: '4px 8px', borderRadius: '10px' }} color="#f50">InActive</Tag>
                      }
                      <button
                        onClick={() => handleEditData({ data: datalist, unique_id: datalist.unique_id })}
                        className="btn btn-primary tw-flex tw-items-center tw-justify-center tw-h-9 tw-w-9 !tw-p-0 tw-border-none !tw-mt-0"
                        type="button"
                      >

                        <FiEdit className="tw-h-4 tw-w-4" />
                      </button>
                    </div>
                  </h2>
                </div>
                <div id={`collapse${index}`} className="collapse border-top tw-border-gray-800" aria-labelledby={`heading${index}`} data-parent="#accordionExample">
                  <div className="card-body !tw-pt-2 tw-flex tw-flex-col tw-gap-y-2">
                    {/* <DataBody title={'Title'} content={datalist?.cmd_title} /> */}
                    <DataBody title={'Command  Description'} content={datalist?.cmd_description} />
                    <DataBody title={'Response description'} content={datalist?.response_description} />
                    <DataBody title={'Command Example'} content={datalist?.cmd_example} />
                    <DataBody title={'Command Response Example'} content={datalist?.response_example} />
                    <DataBody title={'Modem Type'} content={datalist?.modem_type} />
                    <DataBody title={'modem firmware'} content={datalist?.modem_firmware} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h4 className="tw-text-center tw-font-bold">Data Not Found</h4>
          )}
        </div>
        <AddList isLoading={isLoading} editData={editData?.data} cmd_description={cmd_description} response_description={response_description} response_example={response_example} cmd_example={cmd_example} handleEditData={handleEditData} isModalOpen={isModalOpen} handleCancel={handleCancel} handleDataOnsubmit={handleDataOnsubmit} />
        <FilterModal isLoading={isLoading} isFilterModalOpen={isFilterModalOpen} handleFilterModal={handleFilterModal} handleFilter={handleFilter} />
      </div>
    </div>
  );
}

function AddList({isLoading, editData, isModalOpen, handleCancel, handleDataOnsubmit, cmd_description, response_description, response_example, cmd_example }) {

  
  const [modems, setModems] = useState(initialModems);
  const [firmware, setFirmware] = useState(initialFirmware);
  const [isEditorReady, setIsEditorReady] = useState(false)

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
      reset({
        cmd_title: '',
        modem_type: [],
        modem_firmware: [],
        status: [],
      })
      reset();
    }
  }, [isModalOpen, reset]);

  useEffect(() => {
    if (isModalOpen && editData) {
      setValue("cmd_title", editData?.cmd_title)
      setValue("modem_type", editData?.modem_type)
      setValue("modem_firmware", editData?.modem_firmware)
      setValue("status", { label: editData?.status, value: editData?.status })
      if (isEditorReady) {
        callOnReady();
      }
    };
  }, [isModalOpen, editData, setValue]);

  function callOnReady() {
    if (editData) {
      cmd_description?.current.editor.setData(editData?.cmd_description);
      response_description?.current.editor.setData(editData?.response_description);
      cmd_example?.current.editor.setData(editData?.cmd_example);
      response_example?.current.editor.setData(editData?.response_example);
      setIsEditorReady(true)
    }
  }

  const handleCancelModal = () => {
    handleCancel();
  };

  const submitHandler = (data) => {
    handleDataOnsubmit(data);
  };

  return (
    <Modal
      title={editData ? 'Edit Transceiver Documents' : "Add Transceiver Documents"}
      visible={isModalOpen}
      onCancel={handleCancelModal}
      width={920}
      maskClosable={false}
      footer={[
        <div className='tw-flex tw-gap-x-3 tw-items-center'>
          <button type='button' className='btn btn-danger' disabled={!isLoading} onClick={handleSubmit(submitHandler)}>{isLoading ? editData ? "Edit" : "Add" : <CgSpinnerTwoAlt className="tw-size-5 tw-animate-spin" />}</button>
          <button type='button' className="btn btn-light text-dark" onClick={handleCancelModal}>Cancel</button>
        </div>
      ]}
    >
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className='tw-flex tw-flex-col tw-gap-y-2' >
          <div >
            <FormField label="Title">
              <div className='tw-w-[79%]' >
                <input {...register("cmd_title")} type="text" className="form-control" placeholder="" />
              </div>
            </FormField>
            {errors?.cmd_title && <p className='tw-text-sm tw-font-bold tw-w-[79%] tw-ml-auto tw-text-red-600 ' >{errors?.cmd_title.message}</p>}
          </div>


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

          <div >
            <FormField label='modem type'>
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
                        value: modem
                      }))}
                      getOptionLabel={(option) => option.label}
                      getOptionValue={(option) => option.label}
                      isClearable
                    />
                  )}
                />
              </div>
            </FormField>
            {errors?.modem_type && <p className='tw-text-sm tw-font-bold tw-w-[79%] tw-ml-auto tw-text-red-600 ' >{errors?.modem_type.message}</p>}
          </div>
          <div>
            <FormField label='modem firmware'>
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
                        value: fw,
                      }))}
                      getOptionLabel={(option) => option.label}
                      getOptionValue={(option) => option.label}
                      isClearable
                    />
                  )}
                />
              </div>
            </FormField>
            {errors?.modem_firmware && <p className='tw-text-sm tw-font-bold tw-w-[79%] tw-ml-auto tw-text-red-600 ' >{errors?.modem_firmware.message}</p>}
          </div>

          {
            editData && <div>
              <FormField label='status'>
                <div className="tw-w-[79%]" >
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={[
                          { label: "Active", value: "Active" },
                          { label: "InActive", value: "InActive" }
                        ]}
                        getOptionLabel={(option) => option.label}
                        getOptionValue={(option) => option.label}
                        isClearable
                      />
                    )}
                  />
                </div>
              </FormField>
            </div>
          }

        </div>
      </form>
    </Modal>
  );
}

function FilterModal({isLoading, isFilterModalOpen, handleFilterModal, handleFilter }) {

  const [modems, setModems] = useState(initialModems);
  const [firmware, setFirmware] = useState(initialFirmware);

  const { register, handleSubmit, setValue, reset, control } = useForm()

  const submitHandler = (data) => {
    if (data.modem_firmware.length > 0 || data.modem_type.length > 0 || Object.keys(data.status).length > 0) {
      handleFilter({ ...data, status: data?.status?.value });
    }
  };

  const handleFilterModals = () => {
    handleFilterModal();
  };

  useEffect(() => {
    if (!isFilterModalOpen) {
      reset({
        modem_type: [],
        modem_firmware: [],
        status: [],
      })
    }
  }, [isFilterModalOpen])

  return (
    <Modal
      title={'Filter Transceiver Documents'}
      visible={isFilterModalOpen}
      onCancel={handleFilterModals}
      width={720}
      maskClosable={false}
      footer={[
        <div className='tw-flex tw-gap-x-3 tw-items-center'>
          <button type='button' className='btn btn-danger' disabled={isLoading} onClick={handleSubmit(submitHandler)}>{isLoading ? 'Filter' : <CgSpinnerTwoAlt className="tw-size-5 tw-animate-spin" />}</button>
          <button type='button' className="btn btn-light text-dark" onClick={handleFilterModals}>Cancel</button>
        </div>
      ]}
    >
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className='tw-flex tw-flex-col tw-gap-y-5' >
          <div >
            <FormField label='modem type'>
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
          </div>
          <div>
            <FormField label='modem firmware'>
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
          </div>
          <div>
            <FormField label='status'>
              <div className="tw-w-[79%]" >
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { label: "Active", value: "Active" },
                        { label: "InActive", value: "InActive" }
                      ]}
                      getOptionLabel={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      isClearable
                    />
                  )}
                />
              </div>
            </FormField>
          </div>
        </div>
      </form>
    </Modal>
  )
}

function FilterBar({ data }) {
  console.log(Object.entries(data))
  return (
    <>
      {
        Object.entries(data).map(([key, values]) =>
          < >
            {
              typeof values === "object" && values.length > 0 &&
              <div className='' >
                <span className='tw-font-bold tw-mr-2 tw-capitalize ' >{key.split('_').join(" ")} :</span>
                {
                  values.map((value) => (
                    <span className='tw-text-xs border tw-py-1 tw-px-2 tw-inline-block !tw-border-indigo-600 tw-rounded tw-mx-1' >{value?.value}</span>
                  ))
                }
              </div>
            }
            {
              typeof values === "string" && values &&
              <div>
                <span className='tw-font-bold tw-mr-2 tw-capitalize ' >{key.split('_').join(" ")} :</span>
                <span className='tw-text-xs border tw-py-1 tw-px-2 tw-inline-block !tw-border-indigo-600 tw-rounded tw-mx-1' >{values}</span>
              </div>
            }

          </>
        )
      }
    </>
  )
}

function FormField({ label, children }) {
  return (
    <div className="tw-mb-1 tw-flex tw-items-center tw-justify-between">
      <label className="tw-mr-2 tw-mb-0 form-label tw-w-1/5 tw-flex tw-items-center tw-capitalize tw-justify-between">{label}<span>:</span></label>
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
    <div className='tw-grid tw-grid-cols-12 tw-gap-x-8 tw-pb-2  border-bottom'>
      <div className='tw-col-span-2  tw-py-3 tw-flex tw-justify-between tw-items-center tw-capitalize border-right !tw-border-gray-300 tw-font-bold '>{title}</div>
      {
        typeof content === 'string' ?
          <div className='tw-col-span-10 tw-py-3 ' dangerouslySetInnerHTML={{ __html: content }} />
          :
          <div className='tw-col-span-10 tw-flex tw-items-center tw-gap-2 tw-flex-wrap'>
            {
              content && content.map((info) => {
                return (
                  <span key={info?.value} className='tw-bg-gray-200 tw-rounded-sm tw-px-2 tw-py-1' >{info?.value}</span>
                )
              }
              )
            }

          </div>
      }

    </div>
  )

}