"use client";
import { useEffect, useState } from "react";
import Table from "@/components/organisms/Table";
import FilterSection, {
  FilterType,
} from "@/components/molecules/FilterSection/FilterSection";
import Pagination from "@/components/molecules/Pagination";
import { usePagination } from "pagination-react-js";
import UserApplicationService from "@/core/services/api/applications/user_application";
import UserApplication from "@/core/interfaces/applications/userApplication";

// Define los tipos de filtro
const filterTypes: FilterType<{
  consecutive: string;
  solicitante: string;
  tipo: string;
  estado: string;
}>[] = [
  {
    id: "consecutive",
    label: "Consecutivo",
    placeholder: "Filtrar por consecutivo",
  },
  {
    id: "solicitante",
    label: "Solicitante",
    placeholder: "Filtrar por solicitante",
  },
  { id: "tipo", label: "Tipo", placeholder: "Filtrar por tipo" },
  { id: "estado", label: "Estado", placeholder: "Filtrar por estado" },
];

const PAGE_SIZE = 7;

const MyApplications = () => {
  const [userApplications, setUserApplications] = useState<UserApplication[]>(
    []
  );
  const [rows, setRows] = useState<string[][]>([]);
  const [filters, setFilters] = useState<
    Partial<{
      consecutive: string;
      solicitante: string;
      tipo: string;
      estado: string;
    }>
  >({});
  const [currentPage, setCurrentPage] = useState(1);

  const headers = ["Consecutivo", "Solicitante", "Tipo", "Estado", "Acción"];

  useEffect(() => {
    const userApplicationService = new UserApplicationService();
    const fetchData = async () => {
      const data = await userApplicationService.getMyApplications();
      setUserApplications(data || []);
    };
    fetchData();
  }, []);

  const filteredApplications = userApplications.filter((ua) => {
    const solicitante = `${ua.user.name} ${ua.user.last_name}`.toLowerCase();
    return (
      (!filters.consecutive ||
        ua.consecutive
          .toString()
          .includes(filters.consecutive.toLowerCase())) &&
      (!filters.solicitante ||
        solicitante.includes(filters.solicitante.toLowerCase())) &&
      (!filters.tipo ||
        ua.application.name
          .toLowerCase()
          .includes(filters.tipo.toLowerCase())) &&
      (!filters.estado ||
        ua.user_application_status[0].status.description
          .toLowerCase()
          .includes(filters.estado.toLowerCase()))
    );
  });

  const total = filteredApplications.length;
  const pages = Math.ceil(total / PAGE_SIZE);
  const offSet = (currentPage - 1) * PAGE_SIZE;
  const paginatedApplications = filteredApplications.slice(
    offSet,
    offSet + PAGE_SIZE
  );

  useEffect(() => {
    const newRows = paginatedApplications.map((userApplication) => {
      const type = userApplication.application.name.toLowerCase();
      return [
        `${userApplication.consecutive}`,
        `${userApplication.user.name} ${userApplication.user.last_name}`,
        userApplication.application.name,
        userApplication.user_application_status[0].status.description,
        `/solicitudes/${type}/ver/${userApplication.id}`,
      ];
    });
    setRows(newRows);
  }, [paginatedApplications]);

  // Cuando se aplica un filtro
  const handleFilter = (newFilters: Partial<typeof filters>) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // Paginación visual con usePagination
  const { pageNumbers, setActivePage } = usePagination({
    activePage: currentPage,
    recordsPerPage: PAGE_SIZE,
    totalRecordsLength: total,
    offset: offSet,
    navCustomPageSteps: { prev: 3, next: 3 },
    permanentFirstNumber: true,
    permanentLastNumber: true,
  });

  // Cambio de página
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setActivePage(newPage);
  };

  // Para el paginador visual
  function updateActivePage(pageNumber: number | false) {
    if (pageNumber) {
      handlePageChange(pageNumber);
    }
  }

  return (
    <div className="p-10 mx-auto my-3">
      {/* Filtro usando FilterSection */}
      <FilterSection filterTypes={filterTypes} onFilter={handleFilter} />

      {/* Tabla */}
      <div className="w-full">
        <Table headers={headers} rows={rows} link={true} />
      </div>

      <div className="flex justify-center mt-5">
        <Pagination
          pageNumbers={pageNumbers}
          updateActivePage={updateActivePage}
        />
      </div>
      {/* Paginación visual igual a UsersTable */}
    </div>
  );
};

export default MyApplications;
