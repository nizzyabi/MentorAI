"use client";

// Imports
import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary"
import Image from "next/image";

// Upload props is the value of the image, the onChange function, and the disabled prop
interface ImageUploadProps {
    value: string;
    onChange: (src: string) => void;
    disabled?: boolean;
}

// This is the component that is going to be rendered
export const ImageUpload = ({
    value,
    onChange,
    disabled
}: ImageUploadProps) => {
    // check if it is mounted & render things correctly by checking if the app is mounted.
    const [isMounted, setIsMounted] = useState(false);

    // use UseEffect to run and set mounted to true at the end to avoid any hydration errors
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="space-y-4 w-full flex flex-col justify-center items-center">
            <CldUploadButton
            // This is the value of the image & shows the image if there is one.
                onUpload={(result: any) => onChange(result.info.secure_url)}
                options={{
                    maxFiles: 1
                }}

                // This is from settings, then upload then getting a preset from cloudinary, make sure it is on unsigned.
                //link: https://console.cloudinary.com/settings/c-f90c917431def56703eea244589b61/upload
                uploadPreset="brdku7rc"
            >
                <div className="
                p-4 
                border-4 
                border-dashed 
                border-primary/10
                rounded-lg
                hover:opacity-75
                transition
                flex
                flex-col
                space-y-2
                items-center
                justify-center
                ">
                    <div className="relative h-40 w-40">
                        <Image 
                            fill
                            alt="Upload"
                            // Placeholder image when no image is there OR the users uploded image.
                            src={value || "/placeholder.svg"}
                            className="rounded-lg object-cover"
                        />
                    </div>

                </div>

            </CldUploadButton>
        </div>
    )
}

export default ImageUpload;