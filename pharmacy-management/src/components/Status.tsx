export function Status({ status }: { status: string }) {
  const statusColors: { [key: string]: string } = {
    PENDING: "border-yellow text-yellow",
    COMPLETED: "border-green text-green",
    ACTIVE: "border-green text-green bg-green/15",
    CANCELLED: "border-red text-red",
    Cancelled: "border-red text-red",
    ONSTOCK: "border-[#34CDCD] text-black bg-[#34CDCD]/20",
    OUTOFSTOCK: "border-[#FF3B30] text-red bg-[#FF3B30]/20",
    INACTIVE: "border-[#FF3B30] text-red bg-[#FF3B30]/20",
    Critical: "border-[#FF3B30] text-red bg-[#FF3B30]/20",
    Stable: "border-[#34CDCD] text-black bg-[#34CDCD]/20",
    UnderReview: "border-[#FFCC00] bg-[#FFCC00]/5 text-[#FFCC00]",
    Available: "border-[#34CDCD]  bg-[#34CDCD]/20 text-[#34CDCD]",
    Unavailable: "border-[#FF3B30]  text-red bg-[#FF3B30]/20",
    Paid: "border-[#34C759] bg-[#34C759]/20 text-[#34C759]",
    Unpaid: "border-[#FF3B30] text-red bg-[#FF3B30]/20",
    Pending: "border-[#FFCC00] bg-[#FFCC00]/5 text-[#FFCC00]",
    PartiallyPaid: "border-[#3A86FF] bg-[#3A86FF]/5 text-[#3A86FF]",
    Reserved: "border-[#FF3B30] text-red bg-[#FF3B30]/20",
    Occuiped: "border-[#FF3B30] text-red bg-[#FF3B30]/20",
    "Not Admitted": "border-[#FF3B30] text-red py-2 bg-[#FF3B30]/20",
    Admitted: "border-[#34C759] bg-[#34C759]/20 py-2 text-[#34C759]",
    Active: "border-[#34C759] bg-[#34C759]/20 text-[#34C759]",
    "On leave": "border-[#FF3B30] text-red bg-[#FF3B30]/20",
    "In Patient": "border-[#34C759] bg-[#34C759]/20 text-[#34C759]",
    Confirmed: "border-green text-green bg-green/15",
  };

  return (
    <div
      className={`px-2 py-1 flex justify-center border  items-center rounded-lg font-medium ${
        statusColors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      <span>{status}</span>
    </div>
  );
}
