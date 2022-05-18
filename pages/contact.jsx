import React, { Fragment } from 'react';

const Contact = () => {
  return (
    <Fragment>
      <div className="max-w-7xl mx-auto py-12">
        <h1 className="font-georgiaBold text-2xl md:text-4xl lg:text-5xl text-gray-800">
          Contact
        </h1>
        <p className="my-2 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
          excepturi quod reiciendis?
        </p>

        <h2 className="text-2xl text-gray-700 font-georgia">Any Queries?</h2>
        <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <form className="w-full mt-6">
            <div className="flex flex-col md:mr-16">
              <label
                htmlFor="name"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                required
                id="name"
                className="text-gray-600 focus:outline-none  bg-white font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
                placeholder="Full Name"
              />
            </div>
            <div className="flex flex-col mt-4 md:mr-16">
              <label
                htmlFor="email"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal mb-2"
              >
                Email
              </label>
              <input
                type="email"
                required
                id="email"
                className="text-gray-600 focus:outline-none  bg-white font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
                placeholder="email@example.com"
              />
            </div>
            <div className="flex flex-col mt-4 md:mr-16">
              <label
                htmlFor="number"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal mb-2"
              >
                Contact Number
              </label>
              <input
                type="tel"
                required
                id="number"
                className="text-gray-600 focus:outline-none  bg-white font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
                placeholder="Contact Number"
              />
            </div>

            <div className="flex flex-col mt-4 md:mr-16">
              <label
                htmlFor="message"
                className="pb-2 text-sm font-bold text-gray-800"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                className="bg-transparent border focus:outline-none border-gray-300 pl-3 py-3 shadow-sm rounded text-sm  resize-none placeholder-gray-500 text-gray-500 "
                placeholder="Message"
                rows={5}
              />
            </div>

            <button
              type="submit"
              className="text-white text-lg uppercase font-medium bg-yellow-800/75 hover:bg-yellow-800/80 px-16 rounded cursor-pointer shadow-lg hover:shadow-sm py-3 mt-4"
            >
              Submit
            </button>
          </form>

          <div className="flex items-center">
            <div className="w-full flex flex-col items-center space-y-2">
              <p className="text-2xl text-gray-700 font-georgia">Head Office</p>
              <span className="flex text-sm text-gray-600">
                <p className="font-bold ">Address:</p>
                <p className="px-2">
                  79 Burman Road, Deal Party, Port Elizabeth, Eastern Cape, 6012
                </p>
              </span>
              <span className="flex text-sm text-gray-600">
                <p className="font-bold ">Phone:</p>
                <p className="px-2">+27(0)41 486 2433</p>
              </span>

              <button
                type="button"
                className="text-white text-lg uppercase font-medium bg-yellow-800/75 hover:bg-yellow-800/80 px-16 rounded cursor-pointer shadow-lg hover:shadow-sm py-3 mt-4"
              >
                Click Here
              </button>

              <p className="px-2 text-sm text-gray-600">
                to find your nearest African Expressions stockists
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Contact;
