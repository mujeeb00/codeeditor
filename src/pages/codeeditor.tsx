import React from "react";
import next, { useState, ChangeEvent, KeyboardEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {PiContactlessPaymentFill} from 'react-icons/pi'
import {FaEnvira} from 'react-icons/fa'
import {FaJs} from 'react-icons/fa'
import {RiSettings3Fill} from 'react-icons/ri'

interface Code {
  html: string;
  css: string;
  javascript: string;
}

const Test = () => {
  const [code, setCode] = useState<Code>({
    html: "",
    css: "",
    javascript: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCode((prevCode) => ({
      ...prevCode,
      [name]: value,
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
    <div className="mainContainer ">
      <div className="mt-3 row bg-black ">
        
        
        {/* First Column */}
        <div className="col-4 ms-5">
          <div className="row ">
            <div className="col-3 bg-dark text-light titleRow ms-3 ">
              <PiContactlessPaymentFill className="text-danger ms-1" />
              HTML
            </div>
            <div className="col-8 bg-black "><RiSettings3Fill/></div>
          </div>

          <div className="row">
            <div className="col-12 ">
              <textarea
                className="bg-secondary bg-dark"
                name="html"
                onChange={handleInputChange}
                onKeyUp={handleKeyPress}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Second Column */}

        <div className="col-3">
          <div className="row ">
            <div className="col-3 bg-dark text-light titleRow">
              <FaEnvira className="text-primary" />
              CSS
            </div>
            <div className="col-9 bg-black p-0"><RiSettings3Fill/></div>
          </div>

          <div className="row">
              <textarea
                className="bg-dark text-light"
                name="css"
                onChange={handleInputChange}
                onKeyUp={handleKeyPress}
              ></textarea>       
          </div>
        </div>
         
         {/* Third Column */}
        <div className="col-4 ms-2">
          <div className="row ">
            <div className="col-3 bg-dark text-warning ">
              <FaJs />
            </div>
            <div className="col-9 bg-black p-0"></div>
          </div>

          <div className="row ">
              <textarea
                className="bg-dark text-light"
                name="javascript"
                onChange={handleInputChange}
                onKeyUp={handleKeyPress}
              ></textarea>
            </div>
        </div>
      </div>

      <div className="row mt-2 bg-sucess">
        <div className="col-12 ms-5">
          <iframe
            srcDoc={`${code.html}<style>${code.css}</style><script>${code.javascript}</script>`}
            id="output"
            className="text-primary container text-dark"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Test;
