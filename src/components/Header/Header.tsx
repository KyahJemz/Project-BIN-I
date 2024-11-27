'use client'

import { useEffect, useState } from 'react'
import {
    Dialog,
    DialogPanel,
    PopoverGroup,
} from '@headlessui/react';
import { FlyoutMenu, FlyoutMenuProps, MobileFlyoutMenu } from '../FlyoutMenu/FlyoutMenu'
import { HeaderMenu, HeaderMenuProps, MobileHeaderMenu } from '../HeaderMenu/HeaderMenu'
import { HeaderLogo, MobileHeaderLogo, HeaderTitleProps } from '../HeaderLogo/HeaderLogo'
import Link from 'next/link';
import { useAccountStore } from '@/stores/useAccountStore';

export interface headerButtonProps {
    name: string;
    href: string;
}

export interface HeaderProps {
    headerItems: [FlyoutMenuProps & HeaderMenuProps];
    headerTitle: HeaderTitleProps;
    headerButton: headerButtonProps;
    isLoggedin?: boolean;
}

export default function Header({ headerItems, headerTitle, headerButton}: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
            <header className="fixed top-0 left-0 right-0 bg-forest-green text-white z-50">
                
                {/* WEB LAYOUT */}
                <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8">
                    
                    {headerTitle ? (
                        <HeaderLogo headerTitle={headerTitle} setMobileMenuOpen={setMobileMenuOpen} />
                    ) : null}

                    {headerItems ? (
                        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                            {headerItems.map((headerItem) => (
                                headerItem.href ? (
                                    <HeaderMenu key={headerItem.name} name={headerItem.name} href={headerItem.href} />
                                ) : (
                                    <FlyoutMenu key={headerItem.name} name={headerItem.name} items={headerItem.items} />
                                )
                            ))}
                        </PopoverGroup>
                    ) : null}

                </nav>

                {/* MOBILE LAYOUT */}
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <div className="fixed inset-0 z-10" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-20 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">

                        {headerTitle ? (
                            <MobileHeaderLogo headerTitle={headerTitle} setMobileMenuOpen={setMobileMenuOpen} />
                        ) : null}

                        <div className="flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">

                                {headerItems ? (
                                    <div className="space-y-2 py-6">
                                        {headerItems.map((headerItem) => (
                                            headerItem.href ? (
                                                <MobileHeaderMenu key={headerItem.name} name={headerItem.name} href={headerItem.href} />
                                            ) : (
                                                <MobileFlyoutMenu key={headerItem.name} name={headerItem.name} items={headerItem.items} />
                                            )
                                        ))}
                                    </div>
                                ) : null}

                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>
    )
}
