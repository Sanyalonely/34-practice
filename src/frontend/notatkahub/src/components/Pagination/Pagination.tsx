import css from "./Pagination.module.css";
import ReactPaginate from "react-paginate";

type Props = {
  totalPages: number;
  currentPage: number;
  handleChangePage: (page: number) => void;
};

const Pagination = ({ totalPages, currentPage, handleChangePage }: Props) => {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => handleChangePage(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
};

export default Pagination;
