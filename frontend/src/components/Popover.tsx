import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface IPopoverProps {
  contentButton: any;
  contentPanel: any;
}

function PopoverComponent({ contentButton, contentPanel }: IPopoverProps) {
  return (
    <Popover className="relative">
      <Popover.Button>{contentButton}</Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-64 lg:max-w-80 text-center -translate-x-1/2 transform sm:px-0 whitespace-break-spaces bg-cyan-50 rounded shadow-md p-3">
          {contentPanel}
        </Popover.Panel>
      </Transition>
    </Popover>
    // <Popover className="relative">
    //   <Popover.Button>{contentButton}</Popover.Button>

    //   <Popover.Panel className="absolute z-10">{contentPanel}</Popover.Panel>
    // </Popover>
  );
}

export default PopoverComponent;
