// components/InvoiceSpecificsTable.jsx

export const InvoiceSpecificsTable = ({ products = [] }) => {
  if (!products.length) {
    return (
      <div className="text-sm text-muted-foreground py-8 text-center">
        No product details available.
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-4 py-2 font-medium text-gray-700"># Product</th>
            <th className="px-4 py-2 font-medium text-gray-700">Product Name</th>
            <th className="px-4 py-2 font-medium text-gray-700">Unit Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{item.code}</td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
