import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [invoiceSubmenuOpen, setInvoiceSubmenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Kiểm tra active cho submenu
  const isInvoiceActive =
    location.pathname.startsWith("/dashboard/invoice");

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-md h-screen p-4 flex flex-col transition-[width] duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Header + Toggle */}
        <div className="flex items-center justify-between mb-6">
          {isOpen && <h2 className="text-xl font-bold">Quản lý</h2>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-blue-600 focus:outline-none"
            aria-label={isOpen ? "Thu gọn sidebar" : "Mở rộng sidebar"}
            title={isOpen ? "Thu gọn" : "Mở rộng"}
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col space-y-3">
          <Link
            to="/dashboard"
            className={`flex items-center space-x-3 rounded-md px-3 py-2 transition-colors duration-200
              ${
                isActive("/dashboard")
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            title="Tổng quan"
          >
            <svg
              className={`w-5 h-5 flex-shrink-0 ${
                isActive("/dashboard") ? "text-blue-700" : "text-gray-500"
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
            </svg>
            {isOpen && <span>Tổng quan</span>}
          </Link>

          {/* Hóa đơn với submenu */}
          <button
            onClick={() => setInvoiceSubmenuOpen(!invoiceSubmenuOpen)}
            className={`w-full flex items-center justify-between rounded-md px-3 py-2 transition-colors duration-200
              ${
                isInvoiceActive
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              } focus:outline-none`}
            title="Hóa đơn"
          >
            <div className="flex items-center space-x-3">
              <svg
                className={`w-5 h-5 flex-shrink-0 ${
                  isInvoiceActive ? "text-blue-700" : "text-gray-500"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6M9 16h6M9 8h6M4 6h16v12H4z"
                />
              </svg>
              {isOpen && <span>Hóa đơn</span>}
            </div>

            {/* Icon mũi tên xoay */}
            {isOpen && (
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${
                  invoiceSubmenuOpen ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>

          {/* Submenu */}
          {invoiceSubmenuOpen && isOpen && (
            <div className="flex flex-col pl-10 space-y-2">
              <Link
                to="/invoice/list"
                className={`rounded-md px-3 py-2 transition-colors duration-200
                  ${
                    location.pathname === "/invoice/list"
                      ? "bg-blue-200 text-blue-800 font-semibold"
                      : "text-gray-600 hover:bg-blue-100 hover:text-blue-700"
                  }`}
                title="Danh sách hóa đơn"
              >
                Danh sách
              </Link>
              <Link
                to="/invoice/new"
                className={`rounded-md px-3 py-2 transition-colors duration-200
                  ${
                    location.pathname === "/invoice/new"
                      ? "bg-blue-200 text-blue-800 font-semibold"
                      : "text-gray-600 hover:bg-blue-100 hover:text-blue-700"
                  }`}
                title="Tạo hóa đơn mới"
              >
                Tạo mới
              </Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
