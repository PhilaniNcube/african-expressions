import React, { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";

// ncbphi001 webforms access key: 677e1cff-b326-45cb-a7cc-d37575722699;

const Contact = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  const [isSuccess, setIsSuccess] = React.useState(false);
  const [result, setResult] = React.useState(null);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [message, setMessage] = React.useState("");

  const accessKey = process.env.NEXT_PUBLIC_WEBFORMS_ACCESS_KEY;

   const { submit: onSubmit } = useWeb3Forms({
     access_key: accessKey,
     settings: {
       from_name: "African Expressions",
       subject: "New Contact Message from your Website",
        replyTo: "roxxane@samil.co.za",
       // ... other settings
     },
     onSuccess: (msg, data) => {
       console.log("Success", {msg, data});
       setIsSuccess(true);
       setResult(msg);
       reset();
     },
     onError: (msg, data) => {
      console.log("Error", { msg, data });
       setIsSuccess(false);
       setResult(msg);
     },
   });



  return (
    <Fragment>
      <div className="px-6 py-12 mx-auto max-w-7xl md:px-4">
        <h1 className="text-2xl font-georgiaBold md:text-4xl lg:text-5xl text-deep">
          Contact
        </h1>

        <h2 className="text-2xl text-deep font-georgia">Any Queries?</h2>
        <div className="grid w-full grid-cols-1 gap-6 mt-6 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-6">
            <div className="flex flex-col md:mr-16">
              <label
                htmlFor="name"
                className="mb-2 text-sm font-bold leading-tight tracking-normal text-deep"
              >
                Full Name
              </label>
              <input
                type="text"
                required
                {...register("name", { required: true })}
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                className="flex items-center w-full h-10 pl-3 text-sm font-normal bg-white border border-gray-300 rounded shadow text-deep focus:outline-none"
                placeholder="Full Name"
              />
            </div>
            <div className="flex flex-col mt-4 md:mr-16">
              <label
                htmlFor="email"
                className="mb-2 text-sm font-bold leading-tight tracking-normal text-deep"
              >
                Email
              </label>
              <input
                type="email"
                required
                {...register("email", { required: true })}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="flex items-center w-full h-10 pl-3 text-sm font-normal bg-white border border-gray-300 rounded shadow text-deep focus:outline-none"
                placeholder="email@example.com"
              />
            </div>
            <div className="flex flex-col mt-4 md:mr-16">
              <label
                htmlFor="number"
                className="mb-2 text-sm font-bold leading-tight tracking-normal text-deep"
              >
                Contact Number
              </label>
              <input
                type="tel"
                required
                id="number"
                value={number}
                {...register("number", { required: true })}
                onChange={(e) => setNumber(e.target.value)}
                className="flex items-center w-full h-10 pl-3 text-sm font-normal bg-white border border-gray-300 rounded shadow text-deep focus:outline-none"
                placeholder="Contact Number"
              />
            </div>

            <div className="flex flex-col mt-4 md:mr-16">
              <label
                htmlFor="message"
                className="pb-2 text-sm font-bold text-deep"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                {...register("message", { required: true })}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="py-3 pl-3 text-sm placeholder-gray-500 bg-transparent border border-gray-300 rounded shadow-sm resize-none focus:outline-none text-deep "
                placeholder="Message"
                rows={5}
              />
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="px-16 py-3 mt-4 text-lg font-medium text-white uppercase rounded shadow-lg cursor-pointer bg-accent hover:bg-yellow-800/80 hover:shadow-sm"
            >
              {isSubmitting ? "Please Wait..." : "Submit"}
            </button>
            {isSuccess && (
              <p className="mt-4 text-lg text-green-600">{result}</p>
            )}
          </form>

          <div className="flex items-center">
            <div className="flex flex-col items-center w-full space-y-2">
              <p className="text-2xl text-deep font-georgia">Head Office</p>
              <span className="flex text-sm text-deep">
                <p className="font-bold ">Address:</p>
                <p className="px-2">
                  79 Burman Road, Deal Party, Port Elizabeth, Eastern Cape, 6012
                </p>
              </span>
              <span className="flex text-sm text-deep">
                <p className="font-bold ">Phone:</p>
                <p className="px-2">+27(0)41 486 2433</p>
              </span>
              <Link href="/stores" passHref>
                <button

                  type="button"
                  className="px-16 py-3 mt-4 text-lg font-medium text-white uppercase rounded shadow-lg cursor-pointer bg-accent hover:bg-yellow-800/80 hover:shadow-sm"
                >
                  View Stores
                </button>
              </Link>
              <p className="px-2 text-sm text-deep">
                to find your nearest African Expressions store
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Contact;
