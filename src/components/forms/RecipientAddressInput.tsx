import { Label } from "@/components/ui/label";
import { AddressInputModal } from "../modals";

interface RecipientAddressInputProps {
  recipient: string;
  setRecipient: (address: string) => void;
  isAddressModalOpen: boolean;
  setIsAddressModalOpen: (open: boolean) => void;
}

export default function RecipientAddressInput({
  recipient,
  setRecipient,
  isAddressModalOpen,
  setIsAddressModalOpen,
}: RecipientAddressInputProps) {
  return (
    <>
      <div className="space-y-3">
        <Label className="text-base font-semibold text-foreground">
          Recipient Address
        </Label>
        <div
          className="h-[52px] bg-gray-50 dark:bg-gray-900/20 border-2 border-border text-foreground rounded-lg px-4 py-3 transition-all duration-200 hover:border-primary/50 cursor-pointer flex items-center justify-between hover:bg-secondary/50"
          onClick={() => setIsAddressModalOpen(true)}
        >
          <span
            className={recipient ? "text-foreground" : "text-muted-foreground"}
          >
            {recipient || "Click to enter recipient address"}
          </span>
          <svg
            className="h-5 w-5 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </div>
      </div>

      <AddressInputModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onAddressConfirm={setRecipient}
        currentAddress={recipient}
      />
    </>
  );
}
