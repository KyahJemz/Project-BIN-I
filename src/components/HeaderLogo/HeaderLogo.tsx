import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export interface HeaderTitleProps {
    name: string
    href: string
    image: string
}

export interface HeaderLogoProps {
    headerTitle: HeaderTitleProps;
    setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function HeaderLogo({ headerTitle, setMobileMenuOpen }: HeaderLogoProps) {
    return (
        <>
            <div className="flex lg:flex-1 w-auto items-center">
            
                <Link href={headerTitle.href} className="flex items-center -m-1.5 p-1.5 h-auto relative">
                    <Image
                        alt={headerTitle.name}
                        src={headerTitle.image}
                        layout="intrinsic"
                        width={20}
                        height={20}
                        objectFit="contain"
                        className="h-10 w-auto"
                    />
                    <span className="ml-3 text-m">{headerTitle.name}</span>
                </Link>

            </div>

            <div className="flex lg:hidden">
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(true)}
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                >
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                </button>
            </div>
        </>
    )
}

export function MobileHeaderLogo({ headerTitle, setMobileMenuOpen }: HeaderLogoProps) {
    return (
        <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center -m-1.5 p-1.5">
                <span className="sr-only">{headerTitle.name}</span>
                <Image
                    alt={headerTitle.name}
                    src={headerTitle.image}
                    className="h-8 w-auto"
                    width={80} 
                    height={10}
                />
            </Link>
            <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
        </div>
    )
}


