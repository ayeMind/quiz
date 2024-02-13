import { Link } from "react-router-dom";

export default function CatalogNavigate({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  let pages: number[];

  console.log("currentPage", currentPage);
  

  if (totalPages <= 5) {
    pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    if (currentPage <= 3) {
      pages = [1, 2, 3, 4, totalPages];
    } else if (currentPage >= totalPages - 2) {
      pages = [1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      pages = [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
    }
  }

  const pageElements = pages.map((page) => {
    // if (page < 1 || page > totalPages) return null;

    return (
      <Link
        to={`/catalog/${page}`}
        key={page}
        className={`px-3 py-3 w-[64px] h-[64px] text-center flex items-center justify-center rounded-2xl bg-[#f1f1f1] dark:bg-[#3c3f4d] text-black dark:text-white hover:opacity-80`}
      >
        {page}
      </Link>
    );
  });

  return (
    <div className="flex gap-2 mt-[32px] h-[100px]">
      {pageElements}
    </div>
  );
}
