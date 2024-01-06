import React, { Fragment } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

Modal.setAppElement('#root'); // Set the root element for accessibility

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
    
    if (isOpen) {
    MySwal.fire({
        title: 'Are you sure?',
        text: `You won't be able to revert this subcategory!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ms-1'
        },
        buttonsStyling: false,
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
    })

  return (
<Fragment>

</Fragment>  
);
};
}

export default DeleteModal;
