/*

Copyright 2024 Himanshu Dinkar

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/


import React from "react";
import './HomePage.css'

const VideoSection = () => {
  return (
    <section
      id="project-video"
      className="py-10  relative px-6  p-8 rounded-md  shadow-md bg-slate-950  "
    >
      <div className="container flex gap-3  max-md:h-auto h-screen mx-auto w-full justify-center max-md:flex-col-reverse max-md:w-full max-md:items-center p-16 max-md:p-0 ">
        <div className="left-portion gap-8 mt-11 max-md:mt-0 flex flex-col justify-center max-md:items-start max-md:w-[100%] w-[60%] ">
          <h1 className="text-gray-300 text-5xl max-md:mt-8 mx-3 max-md:text-2xl font-semibold max-md:w-full ">
            {" "}
            Supported Live Lecture And Live Chatting Features for Students and
            Teachers{" "}
          </h1>
          <p className="text-gray-200 font-light text-xl max-md:text-sm max-md:w-full max-md:h-auto h-36 w-[90%] text-wrap mx-3">
          The platform enables live lecture streaming and interactive live chatting, promoting seamless communication between students and teachers for an enhanced, engaging, and collaborative learning experience in real time.
          </p>
        </div>
        <div className="right-portion h-full items-center w-1/2  max-md:w-full flex max-md:items-start max-md:h-1/2  justify-center ">
          <video
            className="rounded-lg mt-10 w-[95%] "
            src="/videos/project.mp4 "
            autoPlay
            muted
          ></video>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
