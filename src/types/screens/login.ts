interface IOTPContentProps {
  number: string;
  login: (props: {mobileNumber: string; otp: string}) => void;
}

export type {IOTPContentProps};
