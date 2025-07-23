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

export default Pagination;
