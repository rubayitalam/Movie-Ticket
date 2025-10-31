import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Footer = () => {
    return (
        <footer className="bg-[#0f0f0f] text-white px-6 py-10">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
                {/* Brand and Description */}
                <div>
                    <h2 className="text-2xl font-bold">
                        <span className="text-pink-600">Quick</span>Show
                    </h2>
                    <p className="text-sm mt-4 text-gray-300">
                        Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s, when an unknown printer took a
                        galley of type and scrambled it to make a type specimen
                        book.
                    </p>
                    {/* Store Buttons */}
                    <div className="flex gap-3 mt-5">
                        <img
                            src={assets.googlePlay}
                            alt="Google Play"
                            className="w-32 cursor-pointer"
                        />
                        <img
                            src={assets.appStore}
                            alt="App Store"
                            className="w-32 cursor-pointer"
                        />
                    </div>
                </div>

                {/* Company Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Company</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About us</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact us</Link>
                        </li>
                        <li>
                            <Link to="/privacy">Privacy policy</Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Get in touch</h3>
                    <p className="text-sm text-gray-300">+8801828717745</p>
                    <p className="text-sm text-gray-300">
                        mijan.cse19@gmail.com
                    </p>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-800 mt-10 pt-4 text-center text-gray-400 text-sm">
                Copyright 2025 © Mijanur Rahman. All Right Reserved.
            </div>
        </footer>
    );
};

export default Footer;
