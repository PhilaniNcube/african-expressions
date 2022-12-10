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

  const [search, setSearch] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    router.push(`/yarns?search=${search}`)
  }

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
                  router.route === "/"
                    ? "text-accent font-futuraBold"
                    : "text-deep"
                }`}
              >
                Home
              </li>
            </Link>

            <Link href="/yarns" passHref>
              <li
                className={`cursor-pointer  hover:text-accent transition-all duration-300 ${
                  router.route === "/yarns"
                    ? "text-accent font-futuraBold"
                    : "text-deep"
                }`}
              >
                Yarn
              </li>
            </Link>
            <Link href="/patterns" passHref>
              <li
                className={`cursor-pointer  hover:text-accent transition-all duration-300 ${
                  router.route === "/patterns"
                    ? "text-accent font-futuraBold"
                    : "text-deep"
                }`}
              >
                Patterns
              </li>
            </Link>
            <Link href="/express" passHref>
              <li
                className={`cursor-pointer  hover:text-accent transition-all duration-300 ${
                  router.route === "/express"
                    ? "text-accent font-futuraBold"
                    : "text-deep"
                }`}
              >
                Express Yourself
              </li>
            </Link>
            <Link href="/online_agents" passHref>
              <li
                className={`cursor-pointer  hover:text-accent transition-all duration-300 ${
                  router.route === "/online_agents"
                    ? "text-accent font-futuraBold"
                    : "text-deep"
                }`}
              >
                Online Stockists
              </li>
            </Link>
            <Link href="/stores" passHref>
              <li
                className={`cursor-pointer  hover:text-accent transition-all duration-300 ${
                  router.route === "/stores"
                    ? "text-accent font-futuraBold"
                    : "text-deep"
                }`}
              >
                Stores
              </li>
            </Link>
          </ul>
        </nav>

        <form onSubmit={handleSubmit} className="md:flex items-center hidden">
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
                type="text"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-deep bg-white  focus:outline-none focus:border focus:border-gray-700 font-normal pr-20 h-10 flex items-center pl-10 text-sm border-gray-300 rounded border shadow"
                placeholder="Search Yarns"
              />
            </div>
          </div>
        </form>

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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-yellow-800"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
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
                        active ? "bg-yellow-600 text-white" : "text-slate-800"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <Link href="/">
                        Home
                      </Link>
                    </Menu.Button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Menu.Button
                      className={`${
                        active ? "bg-yellow-600 text-white" : "text-slate-800"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <Link href="/about">
                        About
                      </Link>
                    </Menu.Button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Menu.Button
                      className={`${
                        active ? "bg-yellow-600 text-white" : "text-slate-800"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <Link href="/yarns">
                        Yarns
                      </Link>
                    </Menu.Button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Menu.Button
                      className={`${
                        active ? "bg-yellow-600 text-white" : "text-slate-800"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <Link href="/patterns">
                        Patterns
                      </Link>
                    </Menu.Button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Menu.Button
                      className={`${
                        active ? "bg-yellow-600 text-white" : "text-slate-800"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <Link href="/express">
                        Express Yourself
                      </Link>
                    </Menu.Button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Menu.Button
                      className={`${
                        active ? "bg-yellow-600 text-white" : "text-slate-800"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <Link href="/stores">
                        Stores
                      </Link>
                    </Menu.Button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Menu.Button
                      className={`${
                        active ? "bg-yellow-600 text-white" : "text-slate-800"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <Link href="/online_agents">
                        Online Stockists
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
