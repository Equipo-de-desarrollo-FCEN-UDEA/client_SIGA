"use client";

import User from "@/core/interfaces/user";
import Link from "next/link";
import { usePagination } from "pagination-react-js";
import Pagination from "@components/molecules/Pagination/index";

interface UsersTableProps {
  users: User[];
  pages: number;
  currentPage: number;
  total: number;
  limit: number;
  offSet: number;
  onPageChange: (page: number) => void;
}

const UsersTable = ({ users, pages, currentPage, total, limit, offSet, onPageChange  }: UsersTableProps) => {
  // Hook to handle pagination
  const { pageNumbers, setActivePage } =
    usePagination({
      activePage: currentPage,
      recordsPerPage: limit,
      totalRecordsLength: total,
      offset: offSet,
      navCustomPageSteps: { prev: 3, next: 3 },
      permanentFirstNumber: true,
      permanentLastNumber: true,
    });

  // Function to update the active page in the paginator
  function updateActivePage(pageNumber: number | false) {
    if (pageNumber) {
      setActivePage(pageNumber);
      onPageChange(pageNumber);
    }
  }

  return (
    <div className="w-full flex flex-col items-center">
      <table className="table-auto min-w-full border-collapse border border-slate-500 bg-white shadow-md rounded-lg overflow-scroll">
        <thead className="bg-darkGreen text-white">
          <tr>
            <th className="px-6 py-3 text-left font-semibold">Nombre</th>
            <th className="px-6 py-3 text-left font-semibold">Apellido</th>
            <th className="px-6 py-3 text-left font-semibold">Email</th>
            <th className="px-6 py-3 text-left font-semibold">
              Tipo de Identificación
            </th>
            <th className="px-6 py-3 text-left font-semibold">
              Número de Identificación
            </th>
            <th className="px-6 py-3 text-left font-semibold">Teléfono</th>
            <th className="px-6 py-3 text-left font-semibold">Activo</th>
            <th className="px-6 py-3 text-left font-semibold"></th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {users.length > 0 ? (
            users
              .map((user: User) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="px-6 py-4 border-b border-gray-200">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {user.last_name}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {user.email.toLocaleLowerCase()}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {user.identification_type}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {user.identification_number}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {user.phone !== "NULL" ? user.phone : ""}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {user.is_active ? "Sí" : "No"}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    <Link
                      href={`user/${user.id}`}
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                    >
                      editar
                    </Link>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={8} className="px-6 py-4 text-center">
                Cargando usuarios...
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        pageNumbers={pageNumbers}
        updateActivePage={updateActivePage}
      />
    </div>
  );
};

export default UsersTable;
