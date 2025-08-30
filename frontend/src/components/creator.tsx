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
  const [speed, setSpeed] = useState<number>(() => 1);
  const [color, setColor] = useState<number>(() => 1);
  const [shaderNr, setShaderNr] = useState<number>(() => 0); // Start with first shader (index 0)

  return (
    <div className="drop-shadow-2xl rounded-2xl bg-gray-800 flex flex-col md:flex-row w-full max-w-6xl overflow-hidden">
      <div className="p-4 md:p-6 lg:p-8 flex justify-center items-center md:w-1/2">
        <div className="aspect-[148/105] bg-pink-500 w-full max-w-md text-gray-700 relative overflow-hidden drop-shadow-2xl rounded-xs">
          <div className="absolute inset-0 w-full h-full">
            <ShaderBox speed={speed} shaderNr={shaderNr} color={color} />
          </div>
          <p
            className="mt-4 text-4xl font-extrabold m-auto max-w-fit pl-10 pr-10 text-center limelight-regular relative z-10 text-white drop-shadow-lg"
            style={{
              textShadow:
                "2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.6)",
            }}
          >
            {title}
          </p>
          <div className="flex items-center justify-center w-5/12 h-7/12">
            <p
              className="text-white left-3 bottom-4 w-5/12 max-h-7/12 p-2 h-fit absolute rounded-2xl text-center wrap-anywhere delius-swash-caps-regular z-10 items-center justify-center flex"
              style={{
                textShadow: "1px 1px 3px rgba(0,0,0,0.9)",
                backgroundColor: "rgba(0,0,0,0.3)",
                backdropFilter: "blur(3px)",
                borderColor: "rgba(255,255,255,0.6)",
              }}
            >
              {value ? (
                value.split("\n").map((line, index) => (
                  <React.Fragment
                    key={`line-${index}-${line.substring(0, 10)}`}
                  >
                    {line}
                    {index < value.split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))
              ) : (
                <em className="opacity-50"> Your message here..</em>
              )}
            </p>
          </div>
          <p
            className="absolute right-10 bottom-12 -rotate-12 text-center w-27 wrap-anywhere delius-swash-caps-regular text-xl z-10 outline-dashed rounded-2xl p-2 outline-2 text-white font-semibold"
            style={{
              textShadow: "1px 1px 3px rgba(0,0,0,0.9)",
              backgroundColor: "rgba(0,0,0,0.3)",
              backdropFilter: "blur(3px)",
              borderColor: "rgba(255,255,255,0.6)",
            }}
          >
            to: <br /> {name || <em className="opacity-80">cutie</em>}
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
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type your message here.."
            maxLength={100}
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
