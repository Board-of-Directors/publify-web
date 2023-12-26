import React from 'react';
import {PublifyIcon} from "@/app/types/PublifyIcon";

const GothicTemplateIcon = ({className, type, onClick}: PublifyIcon) => {
    return (
        <svg
            onClick={onClick}
            type={type}
            className={className}
            width="106"
            height="140"
            viewBox="0 0 106 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect x="1" y="0.5" width="104" height="139" fill="white"/>
            <rect x="1" y="0.5" width="104" height="139" stroke="#BCBCBC"/>
            <path
                d="M41.4473 18.8096L40.6211 22.6328H40.2871C40.2402 21.5195 39.9883 20.7197 39.5312 20.2334C39.0801 19.7412 38.4443 19.4951 37.624 19.4951C36.7803 19.4951 35.9365 19.7939 35.0928 20.3916C34.249 20.9834 33.5283 21.9004 32.9307 23.1426C32.3389 24.3789 32.043 25.6797 32.043 27.0449C32.043 28.2168 32.3066 29.1133 32.834 29.7344C33.3613 30.3496 33.9795 30.6572 34.6885 30.6572C34.9873 30.6572 35.3506 30.5723 35.7783 30.4023L36.6924 27.2559C36.8447 26.7285 36.9209 26.3828 36.9209 26.2188C36.9209 26.002 36.8271 25.8203 36.6396 25.6738C36.458 25.5215 36.1416 25.4453 35.6904 25.4453L35.7783 25.1113H40.9199L40.8408 25.4453C40.5361 25.4629 40.2959 25.5215 40.1201 25.6211C39.9502 25.7148 39.8154 25.8555 39.7158 26.043C39.6572 26.1543 39.5664 26.4414 39.4434 26.9043L38.3623 30.5693C37.1318 31.0381 35.8369 31.2725 34.4775 31.2725C33.4287 31.2725 32.5352 31.082 31.7969 30.7012C31.0645 30.3203 30.4551 29.7168 29.9688 28.8906C29.4883 28.0645 29.248 27.124 29.248 26.0693C29.248 23.8193 30.2471 21.9648 32.2451 20.5059C33.8096 19.375 35.585 18.8096 37.5713 18.8096C37.917 18.8096 38.2363 18.8271 38.5293 18.8623C38.7461 18.8916 39.127 18.9736 39.6719 19.1084C40.0234 19.1963 40.2637 19.2402 40.3926 19.2402C40.6504 19.2402 40.8936 19.0967 41.1221 18.8096H41.4473ZM46.9229 22.8525C47.3857 22.8525 47.8193 22.9609 48.2236 23.1777C48.6338 23.3887 48.9414 23.6846 49.1465 24.0654C49.3574 24.4463 49.4629 24.8682 49.4629 25.3311C49.4629 26.2803 49.1963 27.2295 48.6631 28.1787C48.1357 29.1279 47.4385 29.8779 46.5713 30.4287C45.7041 30.9736 44.8311 31.2461 43.9521 31.2461C43.1553 31.2461 42.5371 31.0088 42.0977 30.5342C41.6641 30.0596 41.4473 29.4795 41.4473 28.7939C41.4473 27.9795 41.6084 27.2178 41.9307 26.5088C42.2588 25.7939 42.6719 25.1729 43.1699 24.6455C43.6738 24.1123 44.251 23.6816 44.9014 23.3535C45.5518 23.0195 46.2256 22.8525 46.9229 22.8525ZM46.5625 23.3184C46.252 23.3184 45.9941 23.4092 45.7891 23.5908C45.3789 23.96 44.916 24.8242 44.4004 26.1836C43.8848 27.5371 43.627 28.7588 43.627 29.8486C43.627 30.1182 43.709 30.3408 43.873 30.5166C44.0371 30.6924 44.2305 30.7803 44.4531 30.7803C44.6816 30.7803 44.8838 30.71 45.0596 30.5693C45.3174 30.3584 45.6338 29.8867 46.0088 29.1543C46.3838 28.416 46.6914 27.6045 46.9316 26.7197C47.1719 25.8291 47.292 25.0146 47.292 24.2764C47.292 23.9717 47.2188 23.7373 47.0723 23.5732C46.9258 23.4033 46.7559 23.3184 46.5625 23.3184ZM55.167 20.708L54.4639 23.0986H55.6152L55.3076 24.1094H54.1738L52.7061 29.207C52.6123 29.5234 52.5654 29.7637 52.5654 29.9277C52.5654 30.0039 52.5918 30.0713 52.6445 30.1299C52.6973 30.1826 52.7559 30.209 52.8203 30.209C52.9199 30.209 53.0225 30.168 53.1279 30.0859C53.3975 29.8809 53.7109 29.5234 54.0684 29.0137L54.376 29.207C53.9717 29.9102 53.5264 30.4258 53.04 30.7539C52.5537 31.082 52.0762 31.2461 51.6074 31.2461C51.209 31.2461 50.8984 31.1465 50.6758 30.9473C50.459 30.7422 50.3506 30.4844 50.3506 30.1738C50.3506 29.834 50.4268 29.3975 50.5791 28.8643L51.9678 24.1094H50.7725L50.9482 23.459C51.6982 23.1836 52.3311 22.8613 52.8467 22.4922C53.3623 22.123 53.9834 21.5283 54.71 20.708H55.167ZM60.9326 18.8096L58.6475 26.7285C59.4385 25.5625 60.0127 24.7744 60.3701 24.3643C60.9033 23.7725 61.3604 23.374 61.7412 23.1689C62.1279 22.958 62.4971 22.8525 62.8486 22.8525C63.1475 22.8525 63.4023 22.9668 63.6133 23.1953C63.8301 23.418 63.9385 23.7168 63.9385 24.0918C63.9385 24.4082 63.8682 24.8037 63.7275 25.2783L62.6113 29.0225C62.5117 29.3506 62.4619 29.5703 62.4619 29.6816C62.4619 29.7344 62.4824 29.7842 62.5234 29.8311C62.5645 29.8721 62.6113 29.8926 62.6641 29.8926C62.7344 29.8926 62.8047 29.8633 62.875 29.8047C63.0625 29.6582 63.2617 29.4238 63.4727 29.1016C63.5254 29.0195 63.6104 28.8965 63.7275 28.7324L64.0703 28.9258C63.5664 29.7578 63.0889 30.3291 62.6377 30.6396C62.1865 30.9502 61.7588 31.1055 61.3545 31.1055C60.9912 31.1055 60.707 31.0117 60.502 30.8242C60.2969 30.6367 60.1943 30.4023 60.1943 30.1211C60.1943 29.8633 60.2646 29.4971 60.4053 29.0225L61.4951 25.2783C61.5654 25.0205 61.6006 24.833 61.6006 24.7158C61.6006 24.6514 61.5742 24.5957 61.5215 24.5488C61.4746 24.4961 61.4189 24.4697 61.3545 24.4697C61.1436 24.4697 60.8535 24.6455 60.4844 24.9971C59.7227 25.7178 58.9609 26.8486 58.1992 28.3896L57.417 31H55.2373L58.1201 21.0684C58.2373 20.6465 58.2959 20.3447 58.2959 20.1631C58.2959 20.0166 58.2373 19.9023 58.1201 19.8203C57.9678 19.709 57.7334 19.6621 57.417 19.6797L57.4785 19.3281L60.4053 18.8096H60.9326ZM69.0801 18.8096C69.4434 18.8096 69.748 18.9355 69.9941 19.1875C70.2461 19.4395 70.3721 19.7441 70.3721 20.1016C70.3721 20.459 70.2461 20.7637 69.9941 21.0156C69.7422 21.2676 69.4375 21.3936 69.0801 21.3936C68.7285 21.3936 68.4268 21.2676 68.1748 21.0156C67.9229 20.7637 67.7969 20.459 67.7969 20.1016C67.7969 19.7441 67.9199 19.4395 68.166 19.1875C68.418 18.9355 68.7227 18.8096 69.0801 18.8096ZM69.625 22.8525L67.8232 29.1016C67.7236 29.459 67.6738 29.6934 67.6738 29.8047C67.6738 29.8691 67.7002 29.9307 67.7529 29.9893C67.8057 30.042 67.8613 30.0684 67.9199 30.0684C68.0195 30.0684 68.1191 30.0244 68.2188 29.9365C68.4824 29.7197 68.7988 29.3271 69.168 28.7588L69.4668 28.9346C68.582 30.4756 67.6416 31.2461 66.6455 31.2461C66.2646 31.2461 65.96 31.1406 65.7314 30.9297C65.5088 30.7129 65.3975 30.4404 65.3975 30.1123C65.3975 29.8955 65.4473 29.6201 65.5469 29.2861L66.7686 25.085C66.8857 24.6807 66.9443 24.376 66.9443 24.1709C66.9443 24.042 66.8887 23.9277 66.7773 23.8281C66.666 23.7285 66.5137 23.6787 66.3203 23.6787C66.2324 23.6787 66.127 23.6816 66.0039 23.6875L66.1182 23.3359L69.0977 22.8525H69.625ZM76.8057 28.8818L77.0693 29.1191C76.501 29.7988 75.9414 30.2969 75.3906 30.6133C74.6582 31.0352 73.8994 31.2461 73.1143 31.2461C72.5869 31.2461 72.1182 31.1348 71.708 30.9121C71.3037 30.6836 71.0049 30.3672 70.8115 29.9629C70.6182 29.5527 70.5215 29.1338 70.5215 28.7061C70.5215 27.7451 70.7822 26.8018 71.3037 25.876C71.8252 24.9443 72.5137 24.209 73.3691 23.6699C74.2246 23.125 75.0654 22.8525 75.8916 22.8525C76.5537 22.8525 77.0518 22.999 77.3857 23.292C77.7197 23.585 77.8867 23.9482 77.8867 24.3818C77.8867 24.7744 77.7607 25.1084 77.5088 25.3838C77.2568 25.6592 76.9756 25.7969 76.665 25.7969C76.3955 25.7969 76.1699 25.709 75.9883 25.5332C75.8125 25.3574 75.7246 25.1494 75.7246 24.9092C75.7246 24.5928 75.8828 24.3174 76.1992 24.083C76.416 23.9189 76.5244 23.7754 76.5244 23.6523C76.5244 23.5469 76.4805 23.4619 76.3926 23.3975C76.2754 23.3037 76.123 23.2568 75.9355 23.2568C75.4434 23.2568 74.9805 23.4561 74.5469 23.8545C73.9727 24.3818 73.5332 25.0498 73.2285 25.8584C72.9238 26.667 72.7715 27.4346 72.7715 28.1611C72.7715 28.7354 72.9268 29.1953 73.2373 29.541C73.5479 29.8809 73.917 30.0508 74.3447 30.0508C74.7197 30.0508 75.124 29.9541 75.5576 29.7607C75.9971 29.5674 76.4131 29.2744 76.8057 28.8818Z"
                fill="#BCBCBC"/>
            <rect x="15.5" y="44.5" width="75" height="21" stroke="#BCBCBC"/>
            <rect x="69.5" y="86.5" width="21" height="14" stroke="#BCBCBC"/>
            <rect x="42.5" y="107.5" width="21" height="14" stroke="#BCBCBC"/>
            <rect x="15.5" y="79.5" width="21" height="14" stroke="#BCBCBC"/>
            <line x1="15" y1="72.5" x2="37" y2="72.5" stroke="#BCBCBC"/>
            <line x1="42" y1="79.5" x2="64" y2="79.5" stroke="#BCBCBC"/>
            <line x1="69" y1="79.5" x2="91" y2="79.5" stroke="#BCBCBC"/>
            <line x1="42" y1="86.5" x2="64" y2="86.5" stroke="#BCBCBC"/>
            <line x1="42" y1="93.5" x2="64" y2="93.5" stroke="#BCBCBC"/>
            <line x1="15" y1="100.5" x2="37" y2="100.5" stroke="#BCBCBC"/>
            <line x1="42" y1="100.5" x2="64" y2="100.5" stroke="#BCBCBC"/>
            <line x1="15" y1="107.5" x2="37" y2="107.5" stroke="#BCBCBC"/>
            <line x1="69" y1="107.5" x2="91" y2="107.5" stroke="#BCBCBC"/>
            <line x1="15" y1="114.5" x2="37" y2="114.5" stroke="#BCBCBC"/>
            <line x1="69" y1="114.5" x2="91" y2="114.5" stroke="#BCBCBC"/>
            <line x1="15" y1="121.5" x2="37" y2="121.5" stroke="#BCBCBC"/>
            <line x1="69" y1="121.5" x2="91" y2="121.5" stroke="#BCBCBC"/>
            <line x1="42" y1="72.5" x2="64" y2="72.5" stroke="#BCBCBC"/>
            <line x1="69" y1="72.5" x2="91" y2="72.5" stroke="#BCBCBC"/>
        </svg>
    );
};

export default GothicTemplateIcon;