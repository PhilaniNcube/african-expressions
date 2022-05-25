/* eslint-disable @next/next/no-img-element */
import { Fragment, useState } from 'react';
import { Menu, Popover, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  MenuAlt1Icon,
  MenuIcon,
} from '@heroicons/react/solid';
import Link from 'next/link';

const solutions = [
  {
    name: 'Contact Us',
    href: '/contact',
  },
  {
    name: 'Stores',
    href: '/stores',
  },
  {
    name: 'Online Stockists',
    href: '/online_agents',
  },
];

const Navbar = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="border-b-4 border-accent py-3 px-6 md:px-4 lg:px-0 z-[999]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" passHref>
          <img
            className="h-12 object-cover cursor-pointer"
            alt="African Expressions"
            src="/images/logo.png"
          />
        </Link>

        <nav className="hidden md:flex">
          <ul className="flex items-center text-sm space-x-7 font-medium">
            <Link href="/" passHref>
              <li className="cursor-pointer">
                <a>Home</a>
              </li>
            </Link>
            <Link href="/about" passHref>
              <li className="cursor-pointer">
                <a>About</a>
              </li>
            </Link>
            <Link href="/yarns" passHref>
              <li className="cursor-pointer">
                <a>Yarns</a>
              </li>
            </Link>
            <Link href="/patterns" passHref>
              <li className="cursor-pointer">
                <a>Patterns</a>
              </li>
            </Link>
            <Link href="/express" passHref>
              <li className="cursor-pointer">
                <a>Express Yourself</a>
              </li>
            </Link>
            <div className="z-[999]">
              <Popover className="relative">
                {({ open }) => (
                  <Fragment>
                    <Popover.Button
                      className={`
                ${open ? '' : 'text-opacity-90'}
                  rounded-md inline-flex items-center text-sm font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                      <span>Info</span>
                      <ChevronDownIcon
                        className={`${open ? '' : 'text-opacity-70'}
                  ml-2 h-5 w-5 text-gray-700 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                        aria-hidden="true"
                      />
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 w-[200px] px-4 mt-3 transform -translate-x-1/2 sm:px-0">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative grid gap-2 bg-white p-3 grid-cols-1">
                            {solutions.map((item) => (
                              <Popover.Button
                                key={item.name}
                                href={item.href}
                                as={Link}
                                className="flex cursor-pointer items-center p-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                              >
                                <div className="py-2 cursor-pointer">
                                  <p className="text-sm font-medium text-gray-900 cursor-pointer">
                                    {item.name}
                                  </p>
                                </div>
                              </Popover.Button>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </Fragment>
                )}
              </Popover>
            </div>
          </ul>
        </nav>

        <div className="md:flex items-center hidden">
          <div className="flex flex-col ">
            <div className="relative">
              <div className="absolute text-gray-600 flex items-center pl-3 h-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-search"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx={10} cy={10} r={7} />
                  <line x1={21} y1={21} x2={15} y2={15} />
                </svg>
              </div>
              <input
                id="search"
                className="text-gray-600 dark:text-gray-400 bg-white  focus:outline-none focus:border focus:border-gray-700 font-normal pr-20 sm:pr-32 h-10 flex items-center pl-10 text-sm border-gray-300 rounded border shadow"
                placeholder="Search Yarns"
              />
            </div>
          </div>
        </div>

        {/**Menu Icon */}
        <div className="flex items-center justify-center z-[999] md:hidden ">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-yellow-600 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <MenuIcon className="text-yellow-600 h-8 w-8" />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Menu.Button
                      className={`${
                        active ? 'bg-yellow-600 text-white' : 'text-slate-800'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <Link href="/">
                        <a className="w-full">Home</a>
                      </Link>
                    </Menu.Button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Menu.Button
                      className={`${
                        active ? 'bg-yellow-600 text-white' : 'text-slate-800'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <Link href="/about">
                        <a className="w-full">About</a>
                      </Link>
                    </Menu.Button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Menu.Button
                      className={`${
                        active ? 'bg-yellow-600 text-white' : 'text-slate-800'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <Link href="/yarns">
                        <a className="w-full">Yarns</a>
                      </Link>
                    </Menu.Button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Menu.Button
                      className={`${
                        active ? 'bg-yellow-600 text-white' : 'text-slate-800'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <Link href="/patterns">
                        <a className="w-full">Patterns</a>
                      </Link>
                    </Menu.Button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Menu.Button
                      className={`${
                        active ? 'bg-yellow-600 text-white' : 'text-slate-800'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <Link href="/express">
                        <a className="w-full">Express Yourself</a>
                      </Link>
                    </Menu.Button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Menu.Button
                      className={`${
                        active ? 'bg-yellow-600 text-white' : 'text-slate-800'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <Link href="/stores">
                        <a className="w-full">Stores</a>
                      </Link>
                    </Menu.Button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Menu.Button
                      className={`${
                        active ? 'bg-yellow-600 text-white' : 'text-slate-800'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <Link href="/online_agents">
                        <a className="w-full">Online Stockists</a>
                      </Link>
                    </Menu.Button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
