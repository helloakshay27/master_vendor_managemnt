import React from "react";

export default function SettingIcon({color, ...rest}) {
  return (
    <svg
      width={14}
      height={16}
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.00034 5.5918C6.2357 5.5918 4.80518 7.02232 4.80518 8.78696C4.80518 10.5516 6.2357 11.9821 8.00034 11.9821C9.76498 11.9821 11.1955 10.5516 11.1955 8.78696C11.1955 7.02232 9.76498 5.5918 8.00034 5.5918ZM6.40275 8.78696C6.40275 7.90464 7.11802 7.18939 8.00034 7.18939C8.88265 7.18939 9.59792 7.90464 9.59792 8.78696C9.59792 9.66929 8.88265 10.3845 8.00034 10.3845C7.11802 10.3845 6.40275 9.66929 6.40275 8.78696Z"
        fill={color ? color : "black"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5072 2.23226C10.1675 -0.744078 5.83252 -0.744096 5.49281 2.23226L5.42185 2.85396C5.35211 3.46498 4.70596 3.84201 4.13158 3.59304L3.55569 3.34341C0.828386 2.16124 -1.38968 5.87814 1.0506 7.67629L1.55554 8.04836C2.05439 8.41596 2.05439 9.15745 1.55554 9.52503L1.0506 9.8971C-1.38966 11.6952 0.828374 15.4122 3.55569 14.23L4.13158 13.9804C4.70596 13.7314 5.35211 14.1085 5.42185 14.7194L5.49281 15.3412C5.83252 18.3175 10.1675 18.3175 10.5072 15.3412L10.5781 14.7194C10.6479 14.1085 11.2941 13.7314 11.8683 13.9804L12.4443 14.23C15.1716 15.4121 17.3897 11.6952 14.9494 9.8971L14.4444 9.52503C13.9456 9.15744 13.9456 8.41596 14.4444 8.04836L14.9494 7.67629C17.3897 5.87815 15.1716 2.16123 12.4443 3.34341L11.8685 3.59304C11.2941 3.84201 10.6479 3.46498 10.5781 2.85397L10.5072 2.23226ZM7.08008 2.41343C7.20424 1.32564 8.79575 1.32563 8.91991 2.41343L8.99086 3.03513C9.1831 4.7194 10.952 5.73149 12.5037 5.05884L13.0797 4.80921C14.1171 4.35954 14.8623 5.75602 14.0017 6.39017L13.4968 6.76224C12.1313 7.76832 12.1313 9.80508 13.4968 10.8112L14.0017 11.1832C14.8623 11.8174 14.1171 13.2139 13.0797 12.7642L12.5037 12.5145C10.952 11.8419 9.1831 12.854 8.99086 14.5383L8.91991 15.16C8.79575 16.2477 7.20424 16.2478 7.08008 15.16L7.00912 14.5383C6.81689 12.854 5.04803 11.8419 3.49622 12.5145L2.92031 12.7642C1.88291 13.2139 1.1377 11.8174 1.99831 11.1832L2.50325 10.8112C3.8686 9.80507 3.86859 7.76832 2.50325 6.76224L1.99829 6.39016C1.13771 5.75603 1.8829 4.35953 2.92032 4.80922L3.49622 5.05884C5.04803 5.73149 6.81689 4.7194 7.00912 3.03513L7.08008 2.41343Z"
        fill={color ? color : "black"}
      />
    </svg>
  );
}
