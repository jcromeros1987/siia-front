import { useRef, useImperativeHandle, forwardRef, useState } from 'react';

const FormPopUp = forwardRef(
  (
    {
      form_component,
      form_name,
      static_backdrop_id,
      successButtonText = 'Enviar',
      cancelButtonText = 'Cancelar',
      size = 'lg',
      onSuccess,
    },
    ref
  ) => {
    const modalRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState(null);

    useImperativeHandle(ref, () => ({
      loadData: (data) => {
        setFormData(data);
        showModal();
      },
    }));

    const showModal = () => {
      setIsOpen(true);
      // Show Bootstrap modal
      if (modalRef.current) {
        const modal = new window.bootstrap.Modal(modalRef.current);
        modal.show();
      }
    };

    const hideModal = () => {
      setIsOpen(false);
      if (modalRef.current) {
        const modal = window.bootstrap.Modal.getInstance(modalRef.current);
        if (modal) modal.hide();
      }
    };

    const handleSuccess = () => {
      hideModal();
      if (onSuccess) {
        onSuccess();
      }
    };

    const handleCancel = () => {
      hideModal();
    };

    const sizeClass = {
      sm: 'modal-sm',
      lg: 'modal-lg',
      xl: 'modal-xl',
    }[size] || 'modal-lg';

    return (
      <div
        className="modal fade"
        id={static_backdrop_id}
        ref={modalRef}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby={`${static_backdrop_id}Label`}
        aria-hidden="true"
      >
        <div className={`modal-dialog ${sizeClass}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`${static_backdrop_id}Label`}>
                {form_name}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCancel}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {formData ? (
                <div>
                  {/* Form component will be rendered here */}
                  {/* This is a placeholder - you'll need to handle dynamic form rendering */}
                  <p>Form: {form_component}</p>
                  <pre>{JSON.stringify(formData, null, 2)}</pre>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                {cancelButtonText}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSuccess}
              >
                {successButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

FormPopUp.displayName = 'FormPopUp';

export default FormPopUp;
