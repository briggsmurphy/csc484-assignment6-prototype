import "./ConfirmModal.css";

function ConfirmModal({
  title,
  message,
  confirmText,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="confirm-modal__overlay">
      <div
        className="confirm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
      >
        <h2 id="confirm-modal-title">{title}</h2>
        <p>{message}</p>

        <div className="confirm-modal__actions">
          <button
            className="confirm-modal__cancel"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="confirm-modal__confirm"
            type="button"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;