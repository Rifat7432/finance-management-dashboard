"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import Pagination from "@/components/shared/Pagination";
import { useGetAdsQuery } from "@/redux/features/ad/adApi";
import CreateAdModal from "./ADModels/CreateAdModal";
import AdList from "./AdList";
import UpdateAdModal from "./ADModels/UpdateAdModal";
import { setPage } from "@/redux/features/ad/adSlice";
import Spinner from "@/components/shared/Spinner";

export default function AdManagementPage() {
  const { updateAd, page } = useAppSelector((state) => state.ad);
  const dispatch = useAppDispatch();
  const {
    data: adsData,
    error,
    isLoading,
  } = useGetAdsQuery({
    page,
    ...{},
  });
  return (
   
      <div className="space-y-6 bg-white p-10 rounded-l">
        <div className="flex items-center justify-between">
          <div className="flex gap-2"></div>

          {/* Create Ad Modal */}
          <CreateAdModal />
        </div>

        {/* Ad cards (same design as before) */}
        {isLoading ? (
          <div className="h-80 flex items-center justify-center">
            <Spinner></Spinner>
          </div>
        ) : (
          <AdList adsData={adsData} isLoading={isLoading} error={error} />
        )}

        {/* Update Ad Modal */}
        {updateAd && <UpdateAdModal />}

        {/* Pagination */}
        {!isLoading && (
          <Pagination
            setPage={(page) => dispatch(setPage(page))}
            totalPages={Number(adsData?.data?.meta?.totalPage)}
            page={page}
          />
        )}
      </div>
  );
}
