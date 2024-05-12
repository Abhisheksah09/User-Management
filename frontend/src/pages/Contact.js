import React from "react";

const Contact = () => {
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">
                Name: Abhishek Sah
              </p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">
                Phone No: 8879003313
              </p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">
                Gmail:{" "}
                <a
                  href="mailto:john.doe@gmail.com"
                  className="text-blue-500 hover:underline"
                >
                  sahabhishek097@gmail.com
                </a>
              </p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">
                LinkedIn:{" "}
                <a
                  href="https://www.linkedin.com/in/abhishek-sah-782409265/"
                  className="text-blue-500 hover:underline"
                >
                  LinkedIn Profile:
                  https://www.linkedin.com/in/abhishek-sah-782409265/
                </a>
              </p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">
                GitHub:{" "}
                <a
                  href="https://github.com/johndoe"
                  className="text-blue-500 hover:underline"
                >
                  GitHub Profile: https://github.com/Abhisheksah09
                </a>
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Form</h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  placeholder="Its Just an Dummy, Not working"
                  id="message"
                  name="message"
                  rows="4"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                ></textarea>
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
