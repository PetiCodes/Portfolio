"use client";
import React, { useState } from "react";
import ConnectAnimation from "./ConnectAnimation";
import { useAnimation } from "../context/AnimationContext";

const ContactSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const { connectAnimationRef } = useAnimation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/send";

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const resData = await response.json();

    if (response.status === 200) {
      console.log("Message sent.");
      setEmailSubmitted(true);
    }
  };

  return (
    <section className="my-8 md:my-8 py-16 relative pt-8 sm:pt-8 md:pt-8 mt-8 sm:mt-8 md:mt-8">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        <ConnectAnimation 
          ref={connectAnimationRef}
          className="text-center text-4xl font-bold text-white"
          speed={100}
        />
      </h2>
      <div className="grid md:grid-cols-2 gap-4 relative max-w-4xl mx-auto">
        <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
        <div className="z-10 relative">
          <p className="text-[#ADB7BE] mb-4 max-w-md">
            I&apos;m always open to discussing new opportunities, collaborating on interesting projects, 
            or just having a conversation about technology and innovation. Whether you have a question, 
            want to explore a partnership, or simply want to say hello, feel free to reach out!
          </p>
          <div className="mb-4 text-[#ADB7BE]">
            <p>📧 work.mohdpeti@gmail.com</p>
            <p>📱 +91 9321879718</p>
            <p>📍 Mumbai, Maharashtra, India</p>
          </div>
        </div>
        <div>
          {emailSubmitted ? (
            <p className="text-green-500 text-sm mt-2">
              Email sent successfully!
            </p>
          ) : (
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="text-white block mb-2 text-sm font-medium"
                >
                  Your email
                </label>
                <input
                  name="email"
                  type="email"
                  id="email"
                  required
                  className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="text-white block text-sm mb-2 font-medium"
                >
                  Subject
                </label>
                <input
                  name="subject"
                  type="text"
                  id="subject"
                  required
                  className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Let's collaborate!"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="text-white block text-sm mb-2 font-medium"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>
              <button
                type="submit"
                className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-5 rounded-lg w-full"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 