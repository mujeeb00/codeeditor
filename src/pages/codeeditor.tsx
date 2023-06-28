import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { ImHtmlFive } from "react-icons/im";
import { FaEnvira } from "react-icons/fa";
import { FaJs } from "react-icons/fa";
import Editor, { OnChange } from "@monaco-editor/react";

interface Code {
  html: string;
  css: string;
  javascript: string;
}

const CodeEditor = () => {
  const [code, setCode] = useState<Code>({
    html: "",
    css: "",
    javascript: "",
  });

  type OnChange = (value: string, event: { name: any }) => void;

  const handleInputChange: OnChange = (value, event) => {
    const { name } = event;
    setCode((prevCode) => ({
      ...prevCode,
      [name]: value || "",
    }));
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      renderResult();
    }
  };

  const renderResult = () => {
    const iframe = document.getElementById("output") as HTMLIFrameElement;
    if (iframe) {
      const { html, css, javascript } = code;
      const doc = iframe.contentDocument;
      if (doc) {
        doc.open();
        doc.write(`${html}<style>${css}</style><script>${javascript}</script>`);
        doc.close();
      }
    }
  };

  return (
    <div className="mainContainer">
      <div className="mt-3 row bg-black">
        {/* First Column */}
        <div className=" col-md-12 col-lg-4">
          <br />
          <div>
            {/* <ImHtmlFive size={25} className="text-danger mb-1" /> */}
          </div>
          <Editor
            height="200px"
            language="html"
            value={code.html}
            theme="vs-dark-oceanic-next"
            onChange={(value, event) =>
              handleInputChange(String(value), { name: "html" })
            }
          />
        </div>

        {/* Second Column */}

        <div className="col-md-12 col-lg-4">
          <br />
          <div>
            <FaEnvira size={25} className="text-info" />
          </div>

          <Editor
            height="200px"
            language="css"
            value={code.css}
            theme="vs-dark-oceanic-next"
            onChange={(value, event) =>
              handleInputChange(String(value), { name: "css" })
            }
          />
        </div>

        {/* Third Column */}
        <div className="col-md-12 col-lg-4">
          <br />
          <div>
            <FaJs size={25} className="text-warning" />
          </div>
          <Editor
            height="200px"
            language="javascript"
            value={code.javascript}
            theme="vs-dark-oceanic-next"
            onChange={(value, event) =>
              handleInputChange(String(value), { name: "javascript" })
            }
          />
        </div>
      </div>
      <br />
      <div className="mt-2">
        <div className="container-fluid ">
          <iframe
            srcDoc={`${code.html}<style>${code.css}</style><script>${code.javascript}</script>`}
            id="output"
            className=" text-dark container-fluid"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
