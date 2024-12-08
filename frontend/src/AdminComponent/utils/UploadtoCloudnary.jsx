const upload_preset = "ketan-food";
const cloudinary_name = "dup8dijgq"; // replace with your Cloudinary account name
const api_url = `https://api.cloudinary.com/v1_1/${cloudinary_name}/image/upload`;

export const UploadImageC = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloudinary_name);
    try {
        const res = await fetch(api_url, {
            method: "POST",
            body: data
        });

        if (!res.ok) {
            // Attempt to retrieve and log the error message from the response
            const errorData = await res.json();
            console.error("Cloudinary error response:", errorData);
            throw new Error(errorData.error?.message || "Image upload failed");
        }

        const fileData = await res.json(); // Parse JSON response
        return fileData.url;
    } catch (error) {
        console.error("Error uploading image:", error.message);
        return null;
    }
};
