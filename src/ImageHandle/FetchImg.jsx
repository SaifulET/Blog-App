import  { useEffect, useState } from "react";
import axios from "axios";

const FetchImg = (prop) => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/image/${prop.id}`);
                setImage(res.data);
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };
        if (prop.id) fetchImage();
    }, [prop.id]);

    return (
        <div>
            <h2>Single Image View</h2>
            {image ? (
                 <img 
                 src={image.filepath ? image.filepath : image.imageUrl} 
                 alt="Stored" 
                 width="200" 
             />
            ) : (
                <p>Loading or Image not found...</p>
            )}
        </div>
    );
};

export default FetchImg;
