export function createConfirmModal(message, onConfirm, onCancel) {
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";

    const modal = document.createElement("div");
    modal.className = "confirm-modal";

    const modalMessage = document.createElement("p");
    modalMessage.textContent = message;
    modal.appendChild(modalMessage);

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";

    const confirmButton = document.createElement("button");
    confirmButton.className = "confirm-button";
    confirmButton.textContent = "Да";
    confirmButton.addEventListener("click", () => {
        onConfirm();
        document.body.removeChild(modalOverlay);
    });

    const cancelButton = document.createElement("button");
    cancelButton.className = "cancel-button";
    cancelButton.textContent = "Нет";
    cancelButton.addEventListener("click", () => {
        onCancel();
        document.body.removeChild(modalOverlay);
    });

    buttonContainer.appendChild(confirmButton);
    buttonContainer.appendChild(cancelButton);
    modal.appendChild(buttonContainer);
    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);
}