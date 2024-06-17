import {usePathname} from "next/navigation";

export const useGetIssueId = () => {
    const pathname = usePathname();

    const lastIndexOfEditorPrefix = pathname.lastIndexOf('/');
    return pathname.substring(lastIndexOfEditorPrefix + 1);
}