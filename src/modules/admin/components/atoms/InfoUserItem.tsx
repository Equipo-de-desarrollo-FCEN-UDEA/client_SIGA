const InfoUserItem = ({ title, text }: { title: string; text: string }) => {
  return (
    <div className="flex">
      <strong>{title}</strong>
      <p className="secondary-text ml-2 mb-1">{text}</p>
    </div>
  );
};

export default InfoUserItem;
