type PaginationItemProps = {
  children: React.ReactNode;
  label: React.ComponentProps<"li">["aria-label"];
  active?: boolean;
  onClick?: React.ComponentProps<"li">["onClick"];
  rel?: React.ComponentProps<"li">["rel"];
};

const PaginationItem = ({
  children,
  label,
  active,
  onClick,
  rel,
}: PaginationItemProps) => {
  return (
    <li
      className={[
        "pagination-item",
        active ? "pagination-item-active" : undefined,
      ]
        .filter((value) => value)
        .join(" ")}
      aria-current={active ?? "page"}
      aria-label={label}
      rel={rel}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

export default PaginationItem;
