import React from 'react';
import { useForm, Controller } from 'react-hook-form';

interface InvoiceFormData {
  title: string;
  amount: string;
  category?: string;
  note?: string;
  invoiceDate: string; // dùng input type="date" nên string
  dueDate?: string;
  isPaid: boolean;
}

const categories = ['Tiền điện', 'Tiền nước', 'Văn phòng phẩm', 'Khác']; // ví dụ category

const CreateInvoce: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    defaultValues: {
      isPaid: false,
      invoiceDate: new Date().toISOString().split('T')[0], // ngày hiện tại
    },
  });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatCurrency(raw);
    setValue('amount', formatted);
  };

  const formatCurrency = (value: string) => {
    // Xoá tất cả ký tự không phải số
    const numberValue = value.replace(/[^\d]/g, '');

    if (!numberValue) return '';

    // Format lại: VD 1234567 -> 1,234,567
    return Number(numberValue).toLocaleString('vi-VN');
  };

  const onSubmit = (data: InvoiceFormData) => {
    console.log('Dữ liệu hóa đơn gửi đi:', data);
    // Gửi API hoặc xử lý tiếp
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-md space-y-6"
    >
      <h2 className="text-2xl font-semibold mb-4">Tạo hóa đơn mới</h2>

      {/* Title */}
      <div>
        <label className="block mb-1 font-medium" htmlFor="title">
          Tên hoá đơn <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          {...register('title', { required: 'Tên hoá đơn là bắt buộc' })}
          className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
            errors.title
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
          placeholder="Nhập tên hóa đơn"
        />
        {errors.title && (
          <p className="text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Amount */}
      <div>
        <label className="block mb-1 font-medium" htmlFor="amount">
          Số tiền <span className="text-red-500">*</span>
        </label>
        <input
          id="amount"
          type="text"
          inputMode="numeric"
          {...register('amount', {
            required: 'Số tiền là bắt buộc',
            validate: (value) => {
              const numeric = Number(value.replace(/,/g, ''));
              if (isNaN(numeric) || numeric <= 0)
                return 'Số tiền phải lớn hơn 0';
              return true;
            },
          })}
          onChange={handleAmountChange}
          className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
            errors.amount
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
          placeholder="Nhập số tiền"
        />
        {errors.amount && (
          <p className="text-red-500 mt-1">{errors.amount.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block mb-1 font-medium" htmlFor="category">
          Loại hóa đơn
        </label>
        <select
          id="category"
          {...register('category')}
          className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          defaultValue=""
        >
          <option value="" disabled>
            Chọn loại
          </option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 9l6 6 6-6"
            />
          </svg>
        </div>
      </div>

      {/* Note */}
      <div>
        <label className="block mb-1 font-medium" htmlFor="note">
          Ghi chú
        </label>
        <textarea
          id="note"
          {...register('note')}
          rows={3}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập ghi chú (nếu có)"
        ></textarea>
      </div>

      {/* Invoice Date */}
      <div>
        <label className="block mb-1 font-medium" htmlFor="invoiceDate">
          Ngày hóa đơn <span className="text-red-500">*</span>
        </label>
        <input
          id="invoiceDate"
          type="date"
          {...register('invoiceDate', { required: 'Ngày hóa đơn là bắt buộc' })}
          className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
            errors.invoiceDate
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.invoiceDate && (
          <p className="text-red-500 mt-1">{errors.invoiceDate.message}</p>
        )}
      </div>

      {/* Is Paid */}
      <div className="flex items-center space-x-3">
        <label
          htmlFor="isPaid"
          className="relative cursor-pointer select-none flex items-center space-x-2"
        >
          <input
            id="isPaid"
            type="checkbox"
            {...register('isPaid')}
            className="sr-only peer"
          />
          <span
            className="w-6 h-6 flex justify-center items-center border-2 border-gray-300 rounded-md
                 peer-checked:bg-blue-600 peer-checked:border-blue-600
                 transition-colors duration-200"
          >
            {/* Icon check */}
            <svg
              className="w-4 h-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </span>
          <span className="font-medium text-gray-700 select-none">
            Đã thanh toán
          </span>
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
      >
        Lưu hóa đơn
      </button>
    </form>
  );
};

export default CreateInvoce;
