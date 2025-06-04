import React, { useState } from 'react';
import { SidebarItem } from './SidebarItem';
import { SidebarSubmenu } from './SidebarSubmenu';
import { HomeIcon, FileTextIcon, ListIcon } from 'lucide-react'; // hoặc icon tuỳ ý

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [invoiceSubmenuOpen, setInvoiceSubmenuOpen] = useState(false);
  const [categorySubmenuOpen, setCategorySubmenuOpen] = useState(false);

  return (
    <div
      className={`bg-white h-screen p-4 shadow-md transition-[width] duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        {isOpen && <h2 className="text-xl font-bold">Quản lý</h2>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          title={isOpen ? 'Thu gọn' : 'Mở rộng'}
        >
          {/* Toggle Icon */}
          {isOpen ? <span>&larr;</span> : <span>&rarr;</span>}
        </button>
      </div>

      <nav className="flex flex-col space-y-3">
        <SidebarItem
          to="/dashboard"
          label="Tổng quan"
          icon={<HomeIcon />}
          isOpen={isOpen}
        />

        <SidebarSubmenu
          label="Hóa đơn"
          icon={<FileTextIcon />}
          isOpen={isOpen}
          expanded={invoiceSubmenuOpen}
          onToggle={() => setInvoiceSubmenuOpen(!invoiceSubmenuOpen)}
          basePath="/dashboard/invoice"
          submenu={[
            { to: '/invoice/list', label: 'Danh sách' },
            { to: '/invoice/new', label: 'Tạo mới' },
          ]}
        />

        <SidebarSubmenu
          label="Danh mục"
          icon={<ListIcon />}
          isOpen={isOpen}
          expanded={categorySubmenuOpen}
          onToggle={() => setCategorySubmenuOpen(!categorySubmenuOpen)}
          basePath="/invoice/category"
          submenu={[
            { to: '/invoice/category/list', label: 'Danh sách' },
            { to: '/invoice/category/new', label: 'Tạo mới' },
          ]}
        />
      </nav>
    </div>
  );
};

export default Sidebar;
