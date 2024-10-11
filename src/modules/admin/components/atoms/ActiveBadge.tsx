const ActiveBadge = ({ isActive }: { isActive: boolean }) => {
  return (
    <>
      {isActive ? (
        <div className="w-14 h-7 bg-green-200 border-2 border-green-800 text-green-800 text-center rounded-lg">
          <p>Activo</p>
        </div>
      ) : (
        <div className="w-20 h-7 bg-red-200 border-2 border-red-800 text-red-800 text-center rounded-lg">
          <p>No Activo</p>
        </div>
      )}
    </>
  );
};

export default ActiveBadge;
