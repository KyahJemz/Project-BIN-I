import Link from "next/link";

export interface HeaderMenuProps {
    name: string;
    href?: string | null;
}

export function HeaderMenu({ name, href }: HeaderMenuProps) {
    const validHref = href || "#";
    return (
        <Link href={validHref} prefetch className="text-s leading-6 text-white">
            {name}
        </Link>
    )
}

export function MobileHeaderMenu({ name, href }: HeaderMenuProps) {
    const validHref = href || "#";
    return (
        <Link href={validHref} prefetch className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
            {name}
        </Link>
    )
}


