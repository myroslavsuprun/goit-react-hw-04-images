import React from 'react';

// Styled components
import { AppWrapperDiv } from './AppWrapper.styled';

function AppWrapper({ children }) {
  return <AppWrapperDiv>{children}</AppWrapperDiv>;
}

export default AppWrapper;
