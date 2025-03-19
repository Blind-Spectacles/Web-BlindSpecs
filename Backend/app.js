import React, { useState } from "react";
import axios from "axios";

function App() {
    const [image, setImage] = useState(null);
    const [result, setResult] = useState(null);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!image) {
            alert("Please select an image first.");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await axios.post("http://172.20.10.3:5000/detect", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setResult(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <h1>Object Detection</h1>
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleUpload}>Upload</button>

            {result && (
                <div>
                    <h2>Detected Objects:</h2>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
