'use client';

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import SidebarItems from "./SidebarItems";
import "./Sheet.css";

function MobileSidebarSheet({ open, onOpenChange }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="sheet-overlay"
          onClick={() => onOpenChange && onOpenChange(false)}
        />
        <Dialog.Content
          className="sheet-content"
          onPointerDownOutside={() => onOpenChange && onOpenChange(false)}
          onEscapeKeyDown={() => onOpenChange && onOpenChange(false)}
        >
          <div className="sheet-sidebar">
            <button
              type="button"
              className="sheet-close-btn"
              aria-label="Close menu"
              onClick={() => onOpenChange && onOpenChange(false)}
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <SidebarItems />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default MobileSidebarSheet;


