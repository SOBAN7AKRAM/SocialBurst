
import React from "react";


const HomeMain = () => {
  return (
    <>
      {/* #1 Video button & content */}
      <div className="flex flex-col lg:flex-row items-center pl-8 pr-4 text-center lg:text-left space-y-6 lg:space-y-0 lg:space-x-6">
        <div className="lg:w-1/2 flex flex-col items-center gap-3">
          <h2 className="text-3xl font-bold mb-4">Grow your audience on social and beyond</h2>
          <p className="mb-4 pl-7">
            Buffer helps you build an audience organically. We’re a values-driven company that provides
            affordable, intuitive, marketing tools for ambitious people and teams.
          </p>
          <div className="flex flex-col lg:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-blue-500 text-white py-2 px-4 rounded">Get started now</button>
            <button className="border border-blue-500 text-blue-500 py-2 px-4 rounded">Watch video</button>
          </div>
        </div>
        <div className="lg:w-1/2">
        <img
        src="https://buffer.com/static/illustrations/all-channels-3.webp"
        alt="Audience growth illustration"
        className="w-full h-[500px] object-contain"
        />
        </div>
      </div>

      {/* Be where your customers are */}
      <div className="text-center p-5 w-full">
        <h2 className="text-3xl font-bold mb-4">Be where your customers are</h2>
        <p className="mb-4">
          People spend, on average, almost 2.5 hours on social media every day. Let them find your brand
          more easily through these four simple steps:
        </p>
        <img
          src="https://buffer.com/static/misc/buffer-loop-v2.svg"
          alt="Customer engagement steps"
          className="w-full max-w-6xl mx-auto h-72 object-contain"
        />
      </div>

      {/* Analyze part */}
      <div className="flex flex-col lg:flex-row items-center p-5 text-center lg:text-left space-y-6 lg:space-y-0 lg:space-x-6">
        <div className="lg:w-1/2 pl-7">
          <h3 className="text-blue-500 text-lg font-semibold">1. ANALYZE</h3>
          <h2 className="text-3xl font-bold mb-4">Measure your social media performance in a few clicks</h2>
          <p className="mb-4">See what’s working and deliver high engagement content.</p>
          <div className="flex flex-col lg:flex-row gap-4 justify-center lg:justify-start">
          <button className="bg-blue-500 text-white py-2 px-4 rounded">Get started now</button>
          <button className="border border-blue-500 text-blue-500 py-2 px-4 rounded">Learn more</button>
          </div>
        </div>
        <div className="lg:w-1/2">
          <img
            src="https://buffer.com/static/illustrations/thumb-stop-content-2.webp"
            alt="Analyze social media performance"
            className="w-full h-[400px] object-contain"
          />
        </div>
      </div>

      {/* Plan and publish */}
      <div className="flex flex-col-reverse lg:flex-row items-center p-5 text-center lg:text-left space-y-6 lg:space-y-0 lg:space-x-6">
        <div className="lg:w-1/2">
          <img
            src="https://buffer.com/static/illustrations/collaborate-more-efficiently@2x.webp"
            alt="Plan and publish content"
            className="w-full h-[400px] object-contain"
          />
        </div>
        <div className="lg:w-1/2">
          <h3 className="text-blue-500 text-lg font-semibold">2. PLAN AND PUBLISH YOUR CONTENT</h3>
          <h2 className="text-3xl font-bold mb-4">Collaborate and plan your campaigns</h2>
          <p className="mb-4">Schedule your posts in advance so you can focus on other things.</p>
          <div className="flex flex-col lg:flex-row gap-4 justify-center lg:justify-start">
          <button className="bg-blue-500 text-white py-2 px-4 rounded">Get started now</button>
          <button className="border border-blue-500 text-blue-500 py-2 px-4 rounded">Learn more</button>
          </div>
        </div>
      </div>

      {/* Engage */}
      <div className="flex flex-col lg:flex-row items-center p-5 text-center lg:text-left space-y-6 lg:space-y-0 lg:space-x-6">
        <div className="lg:w-1/2 pl-7">
          <h3 className="text-blue-500 text-lg font-semibold">3. ENGAGE</h3>
          <h2 className="text-3xl font-bold mb-4">Respond to comments twice as fast</h2>
          <p className="mb-4">Skip to important comments with the help of labels and hotkeys.</p>
          <div className="flex flex-col lg:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-blue-500 text-white py-2 px-4 rounded">Get started now</button>
            <button className="border border-blue-500 text-blue-500 py-2 px-4 rounded">Learn more</button>
          </div>
        </div>
        <div className="lg:w-1/2">
          <img
            src="https://buffer.com/static/illustrations/hero-reply@2x-2.webp"
            alt="Engage with audience"
            className="w-full h-[400px] object-contain"
          />
        </div>
      </div>

      {/* Buffer achievements */}
      <div className="flex flex-col lg:flex-row justify-around items-center p-5 space-y-6 lg:space-y-0">
        <div className="text-center">
          <h3 className="text-blue-500 text-3xl font-bold">10 years</h3>
          <p>in business</p>
        </div>
        <div className="text-center">
          <h3 className="text-blue-500 text-3xl font-bold">140,000</h3>
          <p>users</p>
        </div>
        <div className="text-center">
          <h3 className="text-blue-500 text-3xl font-bold">100k+</h3>
          <p>monthly blog readers</p>
        </div>
        <div className="text-center">
          <h3 className="text-blue-500 text-3xl font-bold">1.2m+</h3>
          <p>social followers</p>
        </div>
      </div>

      {/* Help center navigator */}
      <div className="flex flex-col-reverse lg:flex-row items-center p-5 space-y-6 lg:space-y-0 lg:space-x-6">
        <div className="lg:w-1/2">
          <img
            src="https://static.buffer.com/cdn-cgi/image/w=1080,quality=90,format=auto/marketing/static/team/buffer-team-map-2022@2x.jpg"
            alt="Buffer team"
            className="w-full"
          />
        </div>
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold mb-4">And we are here to help</h2>
          <p className="mb-4">
            Our customer advocates are standing by 24/7 to support you via email and social media. We also have a
            comprehensive, regularly updated help center for those who prefer to find help themselves.
          </p>
          <button className="border border-blue-500 text-blue-500 py-2 px-4 rounded">
            Visit our help center
          </button>
        </div>
      </div>

      {/* Marketing partners */}
      <div className="w-1/2 mx-auto text-center my-8 space-y-6">
        <h2 className="text-3xl font-bold mb-4">
          An official marketing partner of the industry leaders
        </h2>
        <div className="flex justify-center gap-8">
          <img src="https://buffer.com/static/ui/meta-business-partner@2x-2.png" alt="Meta" className="w-20 h-16" />
          <img src="https://buffer.com/static/ui/pinterest-marketing-partner@2x-2.png" alt="Pinterest" className="w-20 h-16" />
          <img src="https://buffer.com/static/ui/linkedin-marketing-partner@2x-2.png" alt="LinkedIn" className="w-20 h-16" />
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-blue-500 text-white text-center py-10 px-5">
        <h2 className="text-2xl font-bold mb-6">
          140,000+ people like you use Buffer to build their brand on social media every month
        </h2>
        <button className="bg-pink-500 hover:bg-pink-700 py-3 px-6 rounded">
          Get started now
        </button>
      </div>
    </>
  );
};

export default HomeMain;
