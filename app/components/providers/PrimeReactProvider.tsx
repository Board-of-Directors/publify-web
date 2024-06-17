"use client"

import Tailwind from "primereact/passthrough/tailwind";
import {twMerge} from "tailwind-merge";

import {APIOptions, PrimeReactProvider as InternalPrimeReactProvider} from "primereact/api";

const primeReactConfig: Partial<APIOptions> = {
    unstyled: false,
    pt: Tailwind,
    ptOptions: {
        mergeSections: true,
        mergeProps: true,
        classNameMergeFunction: twMerge
    }
}

const PrimeReactProvider = ({children}: { children: React.ReactNode }) => (
    <InternalPrimeReactProvider value={primeReactConfig}>
        {children}
    </InternalPrimeReactProvider>
);

export default PrimeReactProvider;