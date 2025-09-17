import { useState, useEffect } from "react";



export default function FileList() {
    const [files, setFiles] = useState<string[]>([]);
    const [selectedFile, setSelectedFile] = useState<string>("");


    function downloadFile(filename: string) {
        window.location.href = `/api/files/${filename}`;
      }

    useEffect(() => {
      fetch("/api/files")
        .then(res => res.json())
        .then(setFiles);
    }, []);
  
    return (

        <>
        
        

        <select
        value={selectedFile}
        onChange={(e) =>
          setSelectedFile(e.target.value)
        }
        style={{
          backgroundColor: "#4a6fa5",
          color: "white",
          border: "none",
          borderRadius: "12px",
          fontWeight: "bold",
          minWidth: "300px",
          padding: "0.35rem 2rem 0.35rem 0.75rem",
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='white'><path d='M7 10l5 5 5-5z'/></svg>\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.75rem center",
          backgroundSize: "12px",
          cursor: "pointer",
        }}
      >

        {files.map(f => (
            <option key={f} value={f}>{f}</option>
        ))
    }
      </select>


      <button
        onClick={() => downloadFile(selectedFile)}
        style={{
          padding: "0.4rem 1.25rem",
          border: "solid black",
          background: "#f5f5f5",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = "#e6e6e6")}
        onMouseOut={(e) => (e.currentTarget.style.background = "#f5f5f5")}
      >
        Download
      </button>

     




{/* 
      <ul>
        {files.map(f => (
          <li key={f}>
            <a href={`/api/files/${f}`} download>{f}</a>
          </li>
        ))}
      </ul>
 */}








      </>
    );
  }