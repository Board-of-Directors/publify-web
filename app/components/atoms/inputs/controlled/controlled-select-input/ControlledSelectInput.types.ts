import {FieldValues, Path} from "react-hook-form";
import {ClassValue} from "clsx";

export type ControlledSelectInputProps<T extends FieldValues> = {
    name : Path<T>,
    options : string[],
    placeholder?: string,
    isMulti?: boolean,
    className?: Iterable<ClassValue>
}