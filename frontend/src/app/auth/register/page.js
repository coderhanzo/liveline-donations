'use client'
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { register, reset } from "../../lib/features/auth/authSlice"
import { useState, useEffect } from "react"

const RegisterPage = () => {
    const [phone_number, setPhoneNumber] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [re_password, setRePassword] = useState("")
    const [institution_admin, setInstitutionAdmin] = useState(false)
    const [institution_name, setInstitutionName] = useState("")

    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            window.location.href = "/dashboard"
        }
        dispatch(reset())
    }, [isError, isSuccess, message, user, dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email) {
            toast.error("An email must be provided")
        }
        if (password !== re_password) {
            toast.error("Passwords do not match")
        } else {
            const userData = { phone_number, first_name, last_name, email, password, re_password, institution_admin, institution_name }
            dispatch(register(userData))
        }
    }

    return (
        <section className="w-screen h-screen flex bg-slate-100">
            <div className="flex flex-col justify-center items-center rounded-2xl shadow-2xl m-auto md:w-2/3 bg-white w-full p-8">
                <div className="flex justify-center mb-8">
                    <Image width={50} height={50} src="/assets/bsystems_logo.png" alt="" />
                </div>
                <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize">Get Started</h1>
                <p className="mt-4 text-gray-500">Sign Up As An Individual or A Non-Profit Organization</p>

                <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3 w-full" onSubmit={handleSubmit}>
                    <div className="col-span-3 sm:col-span-1">
                        <label className="block mb-2 text-sm text-gray-600">First Name</label>
                        <input type="text" placeholder="John" value={first_name} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="col-span-3 sm:col-span-1">
                        <label className="block mb-2 text-sm text-gray-600">Last Name</label>
                        <input type="text" placeholder="Snow" value={last_name} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="col-span-3 sm:col-span-1">
                        <label className="block mb-2 text-sm text-gray-600">Phone number</label>
                        <input type="tel" placeholder="XXX-XX-XXXX-XXX" value={phone_number} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <div className="col-span-3 sm:col-span-1">
                        <label className="block mb-2 text-sm text-gray-600">Email address</label>
                        <input type="text" placeholder="johnsnow@example.com" value={email} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="col-span-3 sm:col-span-1">
                        <label className="block mb-2 text-sm text-gray-600">Password</label>
                        <input type="password" placeholder="⏺⏺⏺⏺⏺⏺⏺⏺" value={password} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="col-span-3 sm:col-span-1">
                        <label className="block mb-2 text-sm text-gray-600">Confirm password</label>
                        <input type="password" placeholder="⏺⏺⏺⏺⏺⏺⏺⏺" value={re_password} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setRePassword(e.target.value)} />
                    </div>

                    <div className="col-span-3 sm:col-span-3">
                        <label className="block mb-2 text-sm text-gray-600">Upload National ID</label>
                        <input type="file" accept=".jpg, .png, .jpeg" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>

                    <div className="col-span-2 sm:col-span-3 my-6 sm:mt-6 sm:mb-0">
                        <div className="flex flex-row items-center space-x-4 ml-1 w-full">
                            <input type="checkbox" className="w-4 h-4 text-gray-700 border border-gray-200 rounded-lg focus:border-gray-300 focus:ring-gray-400 focus:outline-none focus:ring focus:ring-opacity-40 hover:cursor-pointer" checked={institution_admin} onChange={() => setInstitutionAdmin(!institution_admin)} />
                            <label className="text-md text-gray-600 w-full">Sign Up As An Organization</label>
                        </div>
                        <p className="text-xs mx-1 text-gray-400 pt-2">Creates an account as an organization</p>
                    </div>

                    <div className={`col-span-2 sm:col-span-1 ${institution_admin ? '' : 'hidden sm:block sm:collapse'}`}>
                        <label className="block mb-2 text-sm text-gray-600">Organization Name</label>
                        <input type="text" placeholder="Organization Name" value={institution_name} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setInstitutionName(e.target.value)} />
                    </div>

                    <div className={`col-span-2 sm:col-span-1 ${institution_admin ? '' : 'hidden'}`}>
                        <label htmlFor="business_cert" className="block mb-2 text-sm font-medium text-gray-900">Upload Organization Certificate</label>
                        <input type="file" accept=".jpg, .jpeg, .png" name="business_cert" id="business_cert" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" />
                    </div>

                    <div className={`col-span-2 sm:col-span-1 ${institution_admin ? '' : 'hidden'}`}>
                        <label htmlFor="business_cert" className="block mb-2 text-sm font-medium text-gray-900">Upload NPO License</label>
                        <input type="file" accept=".jpg, .jpeg, .png" name="business_cert" id="business_cert" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" />
                    </div>

                    <div className="col-span-3 sm:col-span-3 flex flex-col md:flex-row md:items-center md:justify-between mt-8 md:mt-4 space-y-4 md:space-y-0">
                        <div className="flex flex-col md:flex-row items-center space-x-2">
                            <input type="checkbox" id="terms" className="w-4 h-4 text-gray-700 border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 hover:cursor-pointer" />
                            <label htmlFor="terms" className="text-sm text-gray-600 ml-2">Accept Terms</label>

                            <input type="checkbox" id="privacy" className="w-4 h-4 text-gray-700 border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 hover:cursor-pointer ml-4" />
                            <label htmlFor="privacy" className="text-sm text-gray-600 ml-2">Accept Privacy Policy</label>
                        </div>

                        <div className="flex flex-col md:flex-row items-center space-x-2">
                            <button type="submit" className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">Sign Up</button>
                            <p className="text-xs font-semibold uppercase text-gray-600 ml-4">Already a registered user? <a href="/auth/login" className="text-blue-600 hover:underline">Log in</a></p>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default RegisterPage
