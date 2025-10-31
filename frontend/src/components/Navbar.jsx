import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from 'lucide-react';

import {
    SignedIn,
    SignedOut,
    SignInButton,
    useClerk,
    UserButton,
    useUser
} from '@clerk/clerk-react';

const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUser();

    const { openSignIn } = useClerk();

    return (
        <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px6 md:px-16 lg:px36 py-5">
            <Link to="/" className="max-md:flex-1">
                {/* <img src={assets.logo} alt="logo" className="w-36  h-auto" /> */}
                <h1 className="text-2xl text-[#d63854] font-bold">
                    Movie Ticket
                </h1>
            </Link>

            <div
                className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-4 min-md:px-8  max-md:h-screen min-md:rounded-md backdrop-blur overflow-hidden transition-[width] duration-300 ${
                    isOpen ? 'max-md:w-full' : 'max-md:w-0'
                }`}
            >
                <XIcon
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden absolute hover:rounded-full hover:ring-1 hover:ring-red-400 top-6 right-6 w-6 h-6 cursor-pointer"
                />

                <NavLink
                    onClick={() => {
                        scrollTo(0, 0);
                        setIsOpen(false);
                    }}
                    to="/"
                    className={({ isActive }) =>
                        `w-full block text-center px-4 py-2 font-semibold transition duration-300 
                         ${
                             isActive
                                 ? 'bg-blue-700 '
                                 : ' bg-white/10 hover:bg-gray-600'
                         }`
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    onClick={() => {
                        scrollTo(0, 0);
                        setIsOpen(false);
                    }}
                    to="/movies"
                    className={({ isActive }) =>
                        `w-full block text-center px-4 py-2 font-semibold transition duration-300 
                         ${
                             isActive
                                 ? 'bg-blue-700 '
                                 : ' bg-white/10 hover:bg-gray-600'
                         }`
                    }
                >
                    Movies
                </NavLink>

                <NavLink
                    onClick={() => {
                        scrollTo(0, 0);
                        setIsOpen(false);
                    }}
                    to="/theaters"
                    className={({ isActive }) =>
                        `w-full block text-center px-4 py-2 font-semibold transition duration-300 
                         ${
                             isActive
                                 ? 'bg-blue-700 '
                                 : ' bg-white/10 hover:bg-gray-600'
                         }`
                    }
                >
                    Theaters
                </NavLink>

                <NavLink
                    onClick={() => {
                        scrollTo(0, 0);
                        setIsOpen(false);
                    }}
                    to="/releases"
                    className={({ isActive }) =>
                        `w-full block text-center px-4 py-2 font-semibold transition duration-300 
                         ${
                             isActive
                                 ? 'bg-blue-700 '
                                 : ' bg-white/10 hover:bg-gray-600'
                         }`
                    }
                >
                    Releases
                </NavLink>

                <NavLink
                    onClick={() => {
                        scrollTo(0, 0);
                        setIsOpen(false);
                    }}
                    to="/favorite"
                    className={({ isActive }) =>
                        `w-full block text-center px-4 py-2 font-semibold transition duration-300 
                         ${
                             isActive
                                 ? 'bg-blue-700 '
                                 : ' bg-white/10 hover:bg-gray-600'
                         }`
                    }
                >
                    Favorites
                </NavLink>
            </div>

            <div className="flex items-center gap-8">
                <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer" />
                {!user ? (
                    <button
                        onClick={openSignIn}
                        className="px-4 py-1 sm:px-7 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
                    >
                        Login
                    </button>
                ) : (
                    <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action
                                label="My Bookings"
                                labelIcon={<TicketPlus width={15} />}
                                onClick={() => navigate('/my-bookings')}
                            />
                        </UserButton.MenuItems>
                    </UserButton>
                )}
            </div>
            <MenuIcon
                onClick={() => setIsOpen(!isOpen)}
                className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer"
            />
        </div>
    );
};

export default Navbar;
