import {ChangeEvent, useState} from "react";
import {fileToBase64} from "@/app/utils/fileToBase64";

export const useArticleCoverSider = () => {

    const [
        file,
        setFile
    ] = useState<File | undefined>(undefined)

    const handleChangeFile = (event : ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0]
        file && setFile(file)
    }

    const handeClearClick = () => setFile(undefined)

    return {
        file, handleChangeFile, handeClearClick
    }

}