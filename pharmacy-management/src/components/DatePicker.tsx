interface IProps {
  date: string;
  label?: string;
  setDate: (value: string) => void;
}

const DatePicker = ({ date, setDate }: IProps) => {
  return (
    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      className="border border-gray-300 rounded-lg px-4 py-2 w-64"
      style={{
        color: date ? "black" : "gray",
      }}
      placeholder="Select a date"
    />
  );
};

export default DatePicker;
