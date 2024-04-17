import React from 'react';
import Box from '@mui/material/Box';

type HelperTextWithCounterProps = {
  error?: boolean;
  touched?: boolean;
  valueLength: number;
  maxLength: number;
  errorMessage: string | undefined | false;
};

const HelperTextWithCounter: React.FC<HelperTextWithCounterProps> = ({ error, touched, valueLength, maxLength, errorMessage }) => {
  return (
    <Box component="span" sx={{ display: "flex", justifyContent: "space-between" }}>
      <span>{touched && error && errorMessage}</span>
      <span>{valueLength + '/' + maxLength}</span>
    </Box>
  );
};

export default HelperTextWithCounter;