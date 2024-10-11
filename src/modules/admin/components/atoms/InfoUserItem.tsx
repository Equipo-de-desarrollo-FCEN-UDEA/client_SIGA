const InfoUserItem = ({ title, text }: { title: string; text: string }) => {
  return (
    <div className="mb-2">
      <p className="text-xs text-gray-400">{title}</p>
      <p className="mb-1">{text}</p>
    </div>
  );
};

export default InfoUserItem;
