
import React from "react";

const Modal = ({ openModal, setOpenModal, sizeModal, children }) => {
    const propsChildren = React.Children.map(children, (child) => {
      return child ? React.cloneElement(child, { setOpenModal }) : null;
    });
  
    return (
      <div className={`modalBackground ${openModal ? 'active' : ''}`}>
        <div className={`modalContainer ${sizeModal ? 'large' : ''}`}>
          <div className='titleCloseBtn'>
            <button className='closeBtn' onClick={() => setOpenModal(false)}>
              X
            </button>
          </div>
          {propsChildren}
        </div>
      </div>
    );
  };
  
  export default Modal;
  