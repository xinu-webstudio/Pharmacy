interface IActionButtonProps {
    onCancel: () => void;
    onSubmit: () => void;
    submitLabel?:string;
    submitlabelButton?:boolean,
  }
  
  export const ActionButton: React.FC<IActionButtonProps> = ({
    onCancel,
    onSubmit,
    submitLabel,
    submitlabelButton,
  }) => {
    return (
      <div className="flex justify-end gap-4">
        <button
          className="ml-2 bg-gray-500 text-white font-bold py-2 px-4 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
  
        <button
          type="submit"
          className="bg-primary text-white font-bold py-2 px-4 rounded"
          onClick={onSubmit}
        >
          {submitlabelButton?submitLabel:"Submit"}
        </button>
      </div>
    );
  };
  