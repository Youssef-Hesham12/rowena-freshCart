import Swal from "sweetalert2";

interface ConfirmDialogProps {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  icon?: "trash" | "cart";
}

export async function confirmDialog({
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  icon = "trash",
}: ConfirmDialogProps) {
  const icons = {
    trash: `
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
        <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
          </path>
        </svg>
      </div>
    `,
    cart: `
      <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-linear-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17">
          </path>
        </svg>
      </div>
    `,
  };

  return Swal.fire({
    html: `
      <div class="text-center py-2">
        ${icons[icon]}

        <h3 class="text-2xl font-bold text-gray-900 mb-2">
          ${title}
        </h3>

        <p class="text-gray-500 text-sm font-medium leading-relaxed max-w-xs mx-auto">
          ${description}
        </p>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    buttonsStyling: false,

    customClass: {
      popup:
        "rounded-2xl shadow-2xl border-0 p-0 animate__animated animate__fadeIn animate__faster",
      htmlContainer: "p-6 m-0",
      actions: "px-6 pb-6 pt-0 gap-3 flex-row-reverse",
      confirmButton:
        "bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all cursor-pointer shadow-lg shadow-red-500/20",
      cancelButton:
        "bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all cursor-pointer",
    },
  });
}
