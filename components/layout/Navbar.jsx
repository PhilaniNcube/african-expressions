/* eslint-disable @next/next/no-img-element */
import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import {
  FaFacebookF,
  FaPinterestP,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa';
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

const socials = [
  {
    href: 'https://www.facebook.com/AfricanExpressionsYarn/',
    icon: <FaFacebookF />,
  },
  {
    href: 'https://za.pinterest.com/AEMohair/',
    icon: <FaPinterestP />,
  },
  {
    href: 'https://www.instagram.com/african_expressions_yarns/?hl=en',
    icon: <FaInstagram />,
  },
  {
    href: 'https://www.youtube.com/channel/UCIqbIp6AZzhfUAWUzZ82mKA',
    icon: <FaYoutube />,
  },
];

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="border-b-4 border-accent py-6 md:py-10 px-6  z-[999]">
      <div className="max-w-7xl mx-auto flex items-center px-4 justify-between">
        <Link href="/" passHref>
          <img
            className="h-12 md:h-16 object-cover cursor-pointer"
            alt="African Expressions"
            src="/images/logo.png"
          />
        </Link>

        <nav className="hidden md:flex">
          <ul className="flex items-center uppercase text-xs space-x-3 font-medium">
            <Link href="/" passHref>
              <li
                className={`cursor-pointer hover:text-accent transition-all duration-300 ${
                  router.route === '/'
                    ? 'text-accent font-futuraBold'
                    : 'text-deep'
                }`}
              >
                <a>Home</a>
              </li>
            </Link>

            <Link href="/yarns" passHref>
              <li
                className={`cursor-pointer  hover:text-accent transition-all duration-300 ${
                  router.route === '/yarns'
                    ? 'text-accent font-futuraBold'
                    : 'text-deep'
                }`}
              >
                <a>Yarns</a>
              </li>
            </Link>
            <Link href="/patterns" passHref>
              <li
                className={`cursor-pointer  hover:text-accent transition-all duration-300 ${
                  router.route === '/patterns'
                    ? 'text-accent font-futuraBold'
                    : 'text-deep'
                }`}
              >
                <a>Patterns</a>
              </li>
            </Link>
            <Link href="/express" passHref>
              <li
                className={`cursor-pointer  hover:text-accent transition-all duration-300 ${
                  router.route === '/express'
                    ? 'text-accent font-futuraBold'
                    : 'text-deep'
                }`}
              >
                <a>Express Yourself</a>
              </li>
            </Link>
            <Link href="/online_agents" passHref>
              <li
                className={`cursor-pointer  hover:text-accent transition-all duration-300 ${
                  router.route === '/online_agents'
                    ? 'text-accent font-futuraBold'
                    : 'text-deep'
                }`}
              >
                <a>Online Stockists</a>
              </li>
            </Link>
            <Link href="/stores" passHref>
              <li
                className={`cursor-pointer  hover:text-accent transition-all duration-300 ${
                  router.route === '/stores'
                    ? 'text-accent font-futuraBold'
                    : 'text-deep'
                }`}
              >
                <a>Stores</a>
              </li>
            </Link>
          </ul>
        </nav>

        <div className="md:flex items-center hidden">
          <div className="flex flex-col ">
            <div className="relative">
              <div className="absolute text-deep flex items-center pl-2 h-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-search"
                  width={12}
                  height={12}
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
                className="text-deep bg-white  focus:outline-none focus:border focus:border-gray-700 font-normal pr-20 h-10 flex items-center pl-10 text-sm border-gray-300 rounded border shadow"
                placeholder="Search Yarns"
              />
            </div>
          </div>
        </div>

        <div className="hidden lg:flex space-x-2">
          {socials.map((social, i) => {
            return (
              <div
                key={i}
                className="rounded-full cursor-pointer text-white bg-accent p-1 flex items-center justify-center"
              >
                <Link href={social.href} passHref>
                  {social.icon}
                </Link>
              </div>
            );
          })}
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
