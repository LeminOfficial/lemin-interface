import { Button } from '../ui/button';
import { SendIcon } from '../icons';

interface StreamButtonProps {
  isValid: boolean;
}

export const StreamButton = ({ isValid }: StreamButtonProps) => (
  <Button
    type="submit"
    form="stream-form"
    disabled={!isValid}
    className="!rounded-xl w-full !bg-brand-base h-14 text-base font-medium"
  >
    <SendIcon className="h-4 w-4 rotate-90" />
    Create Stream
  </Button>
);
