import { Disclosure, DisclosureButton, DisclosurePanel, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { useState } from 'react';

export interface FlyoutMenuProps {
    name: string,
    items?: [{
        name: string, 
        description: string, 
        href: string
    }] | null
}

export function FlyoutMenu({ name, items }: FlyoutMenuProps) {
    const validItems = items || [];
    const [open, setOpen] = useState(false);
    
    return (
        <Popover className="relative">
            <PopoverButton
                onClick={() => {
                    setOpen(!open);
                }}
                className="inline-flex items-center gap-x-1 text-s leading-6 text-gray-900"
            >
                <span className='text-white'>{name}</span>
                <ChevronDownIcon aria-hidden="true" className="h-5 w-5 text-white" />
            </PopoverButton>

            {open && (
                <PopoverPanel
                transition
                className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-300">
                    <div className="p-4">
                        {validItems.map((item) => (
                            <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-100">
                                <div>
                                    <Link href={item.href} prefetch className="font-semibold text-gray-900">
                                        {item.name}
                                        <span className="absolute inset-0" />
                                    </Link>
                                    <p className="mt-1 text-gray-600">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </PopoverPanel>
            )}
        </Popover>
    )
}

export function MobileFlyoutMenu({ name, items }: FlyoutMenuProps) {
    const validItems = items || [];
    return (
        <div className="space-y-2 py-6">
            <Disclosure as="div" className="-mx-3">
                <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    {name}
                    <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none group-data-[open]:rotate-180" />
                </DisclosureButton>
                <DisclosurePanel className="mt-2 space-y-2 bg-inherit">
                    {validItems.map((item) => (
                        <Link key={item.name} href={item.href} prefetch className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                            <DisclosureButton as="a">
                                {item.name}
                            </DisclosureButton>
                        </Link>
                    ))}
                </DisclosurePanel>
            </Disclosure>
        </div>
    )
}

