import React from "react";

import { Toast, ToastToggle } from "flowbite-react";
import { HiExclamation, HiCheck } from "react-icons/hi";
import { useSelector } from "react-redux";

function FlashMessages() {
  const { messages } = useSelector((state) => state.flashMessage);
  return (
    <div className="flex flex-col gap-4 fixed top-4 left-1/2 -translate-x-1/2 z-50">
      {messages && messages?.map((msg, index) => {
        // Determine styles and icon based on message type
        const isError = msg.type === "danger";
        const bgColor = isError
          ? "bg-red-600 dark:bg-red-800"
          : "bg-green-600 dark:bg-green-800";
        const textColor = isError
          ? "text-red-600 dark:text-red-500"
          : "text-green-600 dark:text-green-200";
        const Icon = isError ? HiExclamation : HiCheck;

        return (
          <Toast key={index}>
            <div
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white ${bgColor}`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div className={`ml-3 text-sm font-normal ${textColor}`}>
              {msg.message}
            </div>
            <ToastToggle />
          </Toast>
        );
      })}
    </div>
  );
}

export default FlashMessages;
