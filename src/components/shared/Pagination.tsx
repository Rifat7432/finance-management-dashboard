import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = () => {
  return (
    <div className="flex items-center justify-end gap-2 pt-8">
      <Button variant="outline" size="sm" className="rounded-full h-10 w-10">
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <Button size="sm">1</Button>
      <Button variant="ghost" size="sm">
        2
      </Button>
      <Button variant="ghost" size="sm">
        3
      </Button>
      <Button variant="ghost" size="sm">
        4
      </Button>
      <span className="px-2">...</span>
      <Button variant="ghost" size="sm">
        30
      </Button>
      <Button variant="outline" size="sm" className="rounded-full h-10 w-10">
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

// export default Pagination;
// import React from "react";
// import { Button } from "../ui/button";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { setPage } from "@/redux/features/pagination/paginationSlice";

// interface PaginationProps {
//   stateKey: string; // Unique key for this pagination instance in Redux
//   totalItems: number;
//   itemsPerPage?: number;
//   maxVisiblePages?: number;
// }

// const Pagination = ({
//   stateKey,
//   totalItems,
//   itemsPerPage = 10,
//   maxVisiblePages = 5,
// }: PaginationProps) => {
//   const dispatch = useAppDispatch();
//   const currentPage = useAppSelector(
//     (state) => state.pagination[stateKey]?.currentPage || 1
//   );

//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   // Generate array of page numbers to display
//   const getPageNumbers = () => {
//     const pages: (number | string)[] = [];

//     if (totalPages <= maxVisiblePages + 2) {
//       // Show all pages if total is small
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       // Always show first page
//       pages.push(1);

//       let startPage = Math.max(
//         2,
//         currentPage - Math.floor(maxVisiblePages / 2)
//       );
//       const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

//       // Adjust start if we're near the end
//       if (endPage === totalPages - 1) {
//         startPage = Math.max(2, endPage - maxVisiblePages + 1);
//       }

//       // Add ellipsis after first page if needed
//       if (startPage > 2) {
//         pages.push("...");
//       }

//       // Add middle pages
//       for (let i = startPage; i <= endPage; i++) {
//         pages.push(i);
//       }

//       // Add ellipsis before last page if needed
//       if (endPage < totalPages - 1) {
//         pages.push("...");
//       }

//       // Always show last page
//       pages.push(totalPages);
//     }

//     return pages;
//   };

//   const handlePageChange = (page: number) => {
//     dispatch(setPage({ key: stateKey, page }));
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       handlePageChange(currentPage - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       handlePageChange(currentPage + 1);
//     }
//   };

//   const handlePageClick = (page: number | string) => {
//     if (typeof page === "number") {
//       handlePageChange(page);
//     }
//   };

//   if (totalPages <= 1) {
//     return null; // Don't show pagination if there's only one page
//   }

//   const pageNumbers = getPageNumbers();

//   return (
//     <div className="flex items-center justify-end gap-2 pt-8">
//       <Button
//         variant="outline"
//         size="sm"
//         className="rounded-full h-10 w-10"
//         onClick={handlePrevious}
//         disabled={currentPage === 1}
//       >
//         <ChevronLeft className="w-4 h-4" />
//       </Button>

//       {pageNumbers.map((page, index) => {
//         if (page === "...") {
//           return (
//             <span key={`ellipsis-${index}`} className="px-2">
//               ...
//             </span>
//           );
//         }

//         return (
//           <Button
//             key={page}
//             size="sm"
//             variant={currentPage === page ? "default" : "ghost"}
//             onClick={() => handlePageClick(page)}
//           >
//             {page}
//           </Button>
//         );
//       })}

//       <Button
//         variant="outline"
//         size="sm"
//         className="rounded-full h-10 w-10"
//         onClick={handleNext}
//         disabled={currentPage === totalPages}
//       >
//         <ChevronRight className="w-4 h-4" />
//       </Button>
//     </div>
//   );
// };

// export default Pagination;