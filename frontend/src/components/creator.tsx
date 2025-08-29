import React, { useState } from "react";
import ShaderBox from "../components/shader";

interface CreatorProps {
  title?: string;
  initial?: string;
}

export default function Creator({
  initial = "",
  title = "Title",
}: Readonly<CreatorProps>) {
  // keep initial consistent with SSR to avoid hydration warnings
  const [value, setValue] = useState(() => initial ?? "");
  const [name, setName] = useState(() => initial ?? "");

  return (
    <div className="drop-shadow-2xl rounded-2xl bg-gray-800 flex flex-col md:flex-row w-full max-w-6xl overflow-hidden">
      <div className="p-4 md:p-8 lg:p-10 flex justify-center items-center md:w-1/2">
        <div className="aspect-[148/105] bg-pink-500 w-full max-w-md text-white relative overflow-hidden drop-shadow-2xl rounded-xs">
          <div className="absolute inset-0 w-full h-full">
            <ShaderBox />
          </div>
          <p className="mt-4 text-2xl font-bold m-auto max-w-fit limelight-regular relative z-10">
            {title}
          </p>
          <p className="left-3 bottom-4 w-5/12 h-7/12 absolute text-center center wrap-anywhere delius-swash-caps-regular z-10 items-center justify-center flex">
            {value ? (
              value.split("\n").map((line, index) => (
                <React.Fragment key={`line-${index}-${line.substring(0, 10)}`}>
                  {line}
                  {index < value.split("\n").length - 1 && <br />}
                </React.Fragment>
              ))
            ) : (
              <em></em>
            )}
          </p>
          <p className="absolute right-10 bottom-12 -rotate-12 text-center w-27 wrap-anywhere delius-swash-caps-regular text-xl z-10">
            to: <br /> {name || <em>cutie</em>}
          </p>
        </div>
      </div>
      <div className="p-4 md:p-8 lg:p-10 md:w-1/2 flex flex-col justify-between text-white">
        <div className="mb-4">
          <h3 className="text-lg mb-2 font-bold m-auto">Enter details</h3>
          <label
            htmlFor="name-input"
            className="block mb-2 text-sm font-medium"
          >
            Enter name
          </label>
          <input
            placeholder="Type your friends name.."
            id="name-input"
            onChange={(e) => setName(e.target.value)}
            maxLength={40}
            className="mb-2 block w-full p-2 border rounded-lg text-base bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
          />
          <label
            htmlFor="large-input"
            className="block mb-2 text-sm font-medium"
          >
            Enter message
          </label>
          <textarea
            id="large-input"
            className="block w-full p-4 pl-2 border rounded-lg text-base bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type your message here.."
            maxLength={200}
            rows={8}
          />
        </div>

        <div className="mb-4">
          <h3 className="text-lg mb-2 font-bold">Select shader</h3>
          <select
            id="countries"
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
          >
            <option selected>Choose a shader</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div className="mb-4">
          <h3 className="text-lg mb-2 font-bold">Customize</h3>
          <label htmlFor="volume" className="block mb-2 text-sm font-medium">
            Speed
          </label>
          <input type="range" id="volume" name="volume" min="0" max="100" />
        </div>

        <div>
          <button className="bg-amber-600 hover:bg-amber-700 active:bg-amber-800 py-2 px-4 rounded cursor-pointer font-bold">
            Generate Postcard Link
          </button>
        </div>
      </div>
    </div>
  );
}
