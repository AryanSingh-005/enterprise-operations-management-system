// Renders the interface and behavior for this application module.

const ConfirmDialog = ({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl"
      >

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-xl text-red-600">
            !
          </div>

          <h2
            id="confirm-dialog-title"
            className="text-xl font-bold text-slate-900"
          >
            {title}
          </h2>
        </div>

        {/* Message */}
        <p className="mt-5 text-sm leading-6 text-slate-600">
          {message}
        </p>

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-3">

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Processing..." : confirmText}
          </button>

        </div>

      </div>
    </div>
  );
};

export default ConfirmDialog;
