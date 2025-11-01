/* eslint-disable prefer-const */
"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import ContentList from "@/components/pages/content/ContentList";
import CreateContentModal from "@/components/pages/content/ContenetModels/CreateContentModal";
import UpdateContentModal from "@/components/pages/content/ContenetModels/UpdateContentModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setContentCategory, setPage } from "@/redux/features/content/contentSlice";
import Pagination from "@/components/shared/Pagination";
import { useGetContentsQuery } from "@/redux/features/content/contentApi";

const categories = [
  "All",
  "Budget",
  "Debt",
  "Saving",
  "Investment",
  "Taxation",
];

export default function ContentPage() {
  const { contentCategory, updateContent, page } = useAppSelector(
    (state) => state.content
  );
  const dispatch = useAppDispatch();
  const {
    data: videosData,
    error,
    isLoading,
  } = useGetContentsQuery({
    page,
    ...(contentCategory === "All" ? {} : { category: contentCategory }),
  });
  return (
    <DashboardLayout>
      <div className="space-y-6 bg-white p-10 rounded-l">
        {/* Category buttons + Upload */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={contentCategory === category ? "default" : "outline"}
                onClick={() => dispatch(setContentCategory(category))}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Create Content Modal */}
          <CreateContentModal />
        </div>

        {/* Video cards */}
        <ContentList
          videosData={videosData}
          isLoading={isLoading}
          error={error}
        />

        {/* Update Content Modal */}
        {updateContent && <UpdateContentModal />}

        {/* Pagination */}
        {!isLoading && (
          <Pagination setPage={(page)=> dispatch(setPage(page))} totalPages={Number(videosData?.data?.meta?.totalPage)} page={page}/>
        )}
      </div>
    </DashboardLayout>
  );
}
