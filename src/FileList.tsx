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
          .then(list => {
            const sorted = list.slice().sort((a,b) =>
              a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
            );
            setFiles(sorted);
          });
      }, []);
      
      useEffect(() => {
        if (files.length) setSelectedFile(files.at(-1)!); // last after sort
      }, [files]);




    return (

        <>
        
        
        <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginTop: "1rem",
  }}
>
<select
  value={selectedFile}
  onChange={(e) => setSelectedFile(e.target.value)}
  style={{
    backgroundColor: "#ffffff",
    color: "#222",
    border: "1px solid #444",
    borderRadius: "6px",
    fontWeight: "500",
    minWidth: "400px",
    padding: "0.5rem 2rem 0.5rem 0.75rem",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    backgroundImage:
      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='%23222'><path d='M7 10l5 5 5-5z'/></svg>\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0.75rem center",
    backgroundSize: "14px",
    cursor: "pointer",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  }}
  onFocus={(e) => {
    e.currentTarget.style.borderColor = "#4a90e2";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(74,144,226,0.25)";
  }}
  onBlur={(e) => {
    e.currentTarget.style.borderColor = "#ccc";
    e.currentTarget.style.boxShadow = "none";
  }}
>
  {files.map((f) => (
    <option key={f} value={f}>
      {f}
    </option>
  ))}
</select>

<button
  onClick={() => downloadFile(selectedFile)}
  style={{
    padding: "0.5rem 1.5rem",
    marginLeft: "1rem",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    fontSize: "0.95rem",
    background: "#4a90e2",
    color: "white",
    cursor: "pointer",
    transition: "background 0.2s ease, transform 0.1s ease",
  }}
  onMouseOver={(e) => (e.currentTarget.style.background = "#357abd")}
  onMouseOut={(e) => (e.currentTarget.style.background = "#4a90e2")}
  onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
  onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
>
  Download
</button>

</div>








      </>
    );
  }