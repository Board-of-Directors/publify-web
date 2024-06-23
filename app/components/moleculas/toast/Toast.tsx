import React, {forwardRef} from 'react';

import {Toast as PrimeToast, ToastProps} from "primereact/toast";

import 'primereact/resources/themes/lara-light-cyan/theme.css';

const Toast = forwardRef((props: ToastProps, ref) => (
    <PrimeToast {...props} ref={ref as any} position={'bottom-right'}/>
))

export default Toast;
