import React, { useState } from "react";
import Preview from "../components/cardpreview";

interface CreatorProps {
  title?: string;
  initial?: string;
}

export default function Creator({
  initial = "",
  title = "Title",
}: Readonly<CreatorProps>) {
  const [text, setText] = useState(() => initial ?? "");
  const [name, setName] = useState(() => initial ?? "");
  const [speed, setSpeed] = useState<number>(() => 1);
  const [color, setColor] = useState<number>(() => 1);
  const [shaderNr, setShaderNr] = useState<number>(() => 0);

  return (
    <div className="drop-shadow-2xl rounded-2xl bg-gray-800 flex flex-col md:flex-row w-full max-w-6xl overflow-hidden">
      <Preview
        title={title}
        initial={initial}
        text={text}
        name={name}
        speed={speed}
        color={color}
        shaderNr={shaderNr}
      />

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
            maxLength={30}
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
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message here.."
            maxLength={80}
            rows={8}
          />
        </div>

        <div className="mb-4">
          <h3 className="text-lg mb-2 font-bold">Select shader</h3>
          <select
            onChange={(e) => setShaderNr(parseInt(e.target.value) || 0)}
            value={shaderNr}
            id="countries"
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>
              Choose a shader
            </option>
            <option value="0">Fancy waves</option>
            <option value="1">Moving dots</option>
          </select>
        </div>

        <div className="mb-4">
          <h3 className="text-lg mb-2 font-bold">Customize</h3>
          <label htmlFor="speed" className="block mb-2 text-sm font-medium">
            Speed
          </label>
          <input
            type="range"
            id="speed"
            name="speed"
            onChange={(e) => setSpeed(parseFloat(e.target.value) || 1)}
            value={speed}
            min={0.1}
            max={2.0}
            step={0.01}
          />

          <label htmlFor="color" className="block mb-2 text-sm font-medium">
            Color
          </label>
          <input
            type="range"
            id="color"
            name="color"
            onChange={(e) => setColor(parseFloat(e.target.value) || 1)}
            value={color}
            min={10}
            max={1000}
            step={1}
            defaultValue={10}
          />
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
