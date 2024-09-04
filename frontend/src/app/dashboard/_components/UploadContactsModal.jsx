'use client'
import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LuX } from "react-icons/lu"
import { toggleUploadContactModal, fetchContacts, uploadContact } from "../../lib/features/contacts/contactSlice"
import { toast } from "react-toastify"

const UploadContactsModal = () => {
    const dispatch = useDispatch()
    const { uploadContactOpen, isSuccess } = useSelector((state) => state.contact)
    const fileInputRef = useRef(null);
    const [fileUploaded, setFileUploaded] = useState(false)
    const [uploadError, setUploadError] = useState(null); // State for error handling

    useEffect(() => {
        if (isSuccess && fileUploaded) {
            toast.success("Contacts Uploaded Successfully");
        }
    }, [isSuccess, fileUploaded]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setUploadError(null); // Reset any previous errors

        const formData = new FormData();
        const file = fileInputRef.current?.files[0]; // Get the first file

        if (!file) {
            setUploadError('Please select a file to upload.');
            return;
        }

        formData.append('file', file); // Append the file to formData with the correct key

        try {
            console.log('Uploading file:', formData); // Debugging log
            const response = await dispatch(uploadContact(formData)).unwrap();
            console.log('Upload successful:', response); // Debugging log

            setFileUploaded(true); 
            dispatch(fetchContacts());
        } catch (error) {
            console.error('Upload failed:', error); // Debugging log
            setFileUploaded(false); 
            setUploadError('Failed to upload file. Please try again.'); // Set error message
        }

        dispatch(toggleUploadContactModal());
    }

    return (
        <>
            <div className={`${uploadContactOpen ? 'fixed inset-0 bg-black bg-opacity-50 z-40' : 'hidden'}`} onClick={() => dispatch(toggleUploadContactModal())}></div>
            <div id="editUserModal" tabIndex="-1" aria-hidden="true" className={`${uploadContactOpen ? '' : 'hidden'} fixed max-sm:inset-0 z-50 items-center place-items-center justify-center p-4 h-max m-auto`}>
                <div className="relative w-full max-w-2xl">
                    <form className="relative bg-white rounded-2xl shadow" onSubmit={handleSubmit}>
                        <div className="flex items-start justify-between p-4 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Upload Contacts from .csv file
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                                <LuX className="scale-[1.5] stroke-2" onClick={() => dispatch(toggleUploadContactModal())} />
                            </button>
                        </div>
                        <div className="p-6 space-y-6 max-h-[calc(100vh-15rem)] overflow-auto">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="disclaimer" className="block mb-2 text-sm font-medium text-red-900">Disclaimer</label>
                                    <p>For proper upload and to prevent corruption of data, please only upload .csv files and ensure column labels are as follows:</p>
                                    <div className="flex flex-row max-sm:flex-wrap space-x-1 font-bold">
                                        <p>name</p><span>|</span><p>given_names</p><span>|</span><p>last_names</p><span>|</span><p>phone_number</p><span>|</span><p>email</p><span>|</span><p>organisation</p>
                                    </div>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="upload-contacts" className="block mb-2 text-sm font-medium text-gray-900">Upload Document</label>
                                    <input ref={fileInputRef} type="file" accept=".csv" name="upload-contacts" id="upload-contacts" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" />
                                    {uploadError && <p className="text-red-500 text-sm mt-2">{uploadError}</p>} {/* Display upload error */}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save all</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default UploadContactsModal
