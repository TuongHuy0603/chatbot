import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import SidebarItems from "./SidebarItems";
import "./Sheet.css";

function MobileSidebarSheet({ open, onOpenChange }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="sheet-overlay" />
        <Dialog.Content className="sheet-content">
          <div className="sheet-sidebar">
            <SidebarItems />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default MobileSidebarSheet;


