"use client";

import Loading from "@/components/loading/loading";
import { useAuth } from "@/hooks/useAuth";
import { IBusinessProposal } from "@/models/BusinessProposal";
import PageCenteringWrapper from "@/wrappers/pageCenteringWrapper";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import BusinessProposal from "@/components/businessProposal/businessProposal";

const AddBusinessProposalCTA = () => {
  return (
    <Link href="/admin/business-proposals">
      <div className="max-w-sm h-[22rem] bg-ennovate-main border border-ennovate-main rounded-lg bg-opacity-70 hover:bg-opacity-100 group flex items-center justify-center">
        <span className="text-white text-6xl font-bold group-hover:font-extrabold">
          +
        </span>
      </div>
    </Link>
  );
};

export default function BusinessProposals() {
  const [businessProposals, setBusinessProposals] = useState<
    IBusinessProposal[] | null
  >(null);

  useEffect(() => {
    const initializeData = async () => {
      const res = await axios.post("/api/business-proposals/read");
      setBusinessProposals(res.data);
    };

    initializeData();
  }, []);

  if (!businessProposals) {
    return (
      <PageCenteringWrapper>
        <Loading />
      </PageCenteringWrapper>
    );
  }

  const { isAuthenticated } = useAuth();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mx-8 mt-8">
      {businessProposals.map((businessProposal, index) => (
        <BusinessProposal key={index} businessProposal={businessProposal} />
      ))}
      {isAuthenticated && <AddBusinessProposalCTA />}
    </div>
  );
}
