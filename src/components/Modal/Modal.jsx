import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { createPortal } from 'react-dom';

// Styled components
import { Overlay, ModalWrapper } from './Modal.styled';

function Modal({ modalImg, onModalClose }) {
  useEffect(() => {
    function onWindowKeypress(e) {
      const pressedKey = e.code;
      if (pressedKey === `Escape`) {
        onModalClose();
      }
    }

    document.body.style.overflowY = 'hidden';
    window.addEventListener('keydown', onWindowKeypress);

    return () => {
      document.body.style.overflowY = 'unset';
      window.removeEventListener('keydown', onWindowKeypress);
    };
  }, [onModalClose]);

  const handleClick = e => {
    if (e.currentTarget === e.target) {
      onModalClose();
    }
  };

  const modalLayout = (
    <Overlay onClick={handleClick}>
      <ModalWrapper>
        <img src={modalImg.img} alt={modalImg.alt} />
      </ModalWrapper>
    </Overlay>
  );

  const modalRoot = document.getElementById('modal-root');

  return createPortal(modalLayout, modalRoot);
}

Modal.propTypes = {
  modalImg: PropTypes.shape({
    img: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
  onModalClose: PropTypes.func.isRequired,
};

export default Modal;
