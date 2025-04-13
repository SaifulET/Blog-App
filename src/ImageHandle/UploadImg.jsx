import { useState } from "react";

const UploadImg = () => {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); 
    };

    const handleUrlChange = (e) => {
        setImageUrl(e.target.value); // Store the URL
    };

    const handleUpload = async () => {
        const formData = new FormData();

        if (file) {
            formData.append("file", file); // Add file to FormData
        } else if (imageUrl) {
            formData.append("imageUrl", imageUrl); // Add image URL to FormData
        } else {
            alert("Please select a file or enter an image URL.");
            return;
        }

        try {
            console.log(formData);
            const response = await fetch("http://localhost:5000/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <div>
            <h2>Upload Image</h2>

            {/* File Input */}
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <br />
            
            {/* URL Input */}
            <input 
                type="text" 
                placeholder="Enter Image URL" 
                value={imageUrl} 
                onChange={handleUrlChange} 
            />
            <br />
            
            {/* Upload Button */}
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default UploadImg;
