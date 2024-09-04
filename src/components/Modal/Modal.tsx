import React from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal = ({
    isOpen,
    message,
    onConfirm,
    onCancel,
}: ConfirmationModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <p className="text-gray-800 text-lg mb-4">{message}</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
