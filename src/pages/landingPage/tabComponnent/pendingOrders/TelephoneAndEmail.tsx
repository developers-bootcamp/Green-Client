import React from 'react';
import telephoneIcon from '../../../../images/telephone.png';
import mailIcon from '../../../../images/mail.png'

interface PhoneIconProps {
  phoneNumber: string;
}

interface EmailIconProps {
  emailAddress: string;
}

const PhoneIcon: React.FC<PhoneIconProps> = ({ phoneNumber }) => {
  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <img
      src={telephoneIcon}
      alt="Call"
      width="50"
      height="50"
      onClick={handlePhoneClick}
    />
  );
};

const EmailIcon: React.FC<EmailIconProps> = ({ emailAddress }) => {
  const handleEmailClick = () => {
    window.location.href = `mailto:${emailAddress}`;
  };

  return (
    <img
      src={mailIcon}
      alt="Email"
      width="50"
      height="50"
      onClick={handleEmailClick}
    />
  );
};

const TelephoneAndEmail: React.FC = (props:any) => {
  return (
    <div>
      <PhoneIcon phoneNumber={props.phone }/>
      <EmailIcon emailAddress={props.email} />
    </div>
  );
};

export default TelephoneAndEmail;
