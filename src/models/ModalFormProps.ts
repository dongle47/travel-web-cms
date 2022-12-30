
interface Values {
    title: string;
    description: string;
    modifier: string;
  }

export interface ModalFormProps {
    open: boolean;
    onSubmit: (values: Values) => void;
    onCancel: () => void;
  }