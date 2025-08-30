import React, { useState } from "react";
import ShaderBox from "../components/shader";

interface PreviewProps {
  title?: string;
  initial?: string;
  text?: string;
  name?: string;
  speed?: number;
  color?: number;
  shaderNr?: number;
}

export default function Preview({
  initial = "",
  title = "Title",
  text = "no text",
  name = "no name",
  speed = 1,
  color = 10,
  shaderNr = 1,
}: Readonly<PreviewProps>) {
  return (
    <div className="p-4 md:p-6 lg:p-8 flex justify-center items-center md:w-1/2">
      <div className="aspect-[148/105] bg-pink-500 w-full max-w-md text-gray-700 relative overflow-hidden drop-shadow-2xl rounded-xs">
        <div className="absolute inset-0 w-full h-full">
          <ShaderBox speed={speed} shaderNr={shaderNr} color={color} />
        </div>
        <p
          className="mt-2 md:mt-4 text-2xl md:text-4xl font-extrabold m-auto max-w-fit pl-5 pr-5 md:pl-10 md:pr-10 text-center limelight-regular relative z-10 text-white drop-shadow-lg"
          style={{
            textShadow: "2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.6)",
          }}
        >
          {title}
        </p>
        <div className="flex items-center justify-center w-5/12 h-7/12">
          <p
            className="text-white text-xs md:text-xl left-3 bottom-4 w-5/12 max-h-7/12 p-2 h-fit absolute rounded-2xl text-center wrap-anywhere delius-swash-caps-regular z-10 items-center justify-center flex"
            style={{
              textShadow: "1px 1px 3px rgba(0,0,0,0.9)",
              backgroundColor: "rgba(0,0,0,0.3)",
              backdropFilter: "blur(3px)",
              borderColor: "rgba(255,255,255,0.6)",
            }}
          >
            {text ? (
              text.split("\n").map((line, index) => (
                <React.Fragment key={`line-${index}-${line.substring(0, 10)}`}>
                  {line}
                  {index < text.split("\n").length - 1 && <br />}
                </React.Fragment>
              ))
            ) : (
              <em className="opacity-50"> Your message here..</em>
            )}
          </p>
        </div>
        <p
          className="absolute right-5 bottom-6 md:right-10 md:bottom-12 -rotate-12 text-center w-17 md:w-27 wrap-anywhere delius-swash-caps-regular md:text-xl z-10 outline-dashed rounded-2xl p-2 outline-2 text-xs  text-white font-semibold"
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
  );
}
