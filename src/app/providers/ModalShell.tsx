"use client";

import dynamic from "next/dynamic";

// Dynamic imports prevent SSR — modals need browser APIs (Radix Portal, Zustand)
const MealLogModal = dynamic(() => import("../../components/modals/MealLogModal"), { ssr: false });
const RecipeModal = dynamic(() => import("../../components/modals/RecipeModal"), { ssr: false });
const AdaptModal = dynamic(() => import("../../components/modals/AdaptModal"), { ssr: false });
const BiometricsModal = dynamic(() => import("../../components/modals/BiometricsModal"), { ssr: false });

export default function ModalShell() {
  return (
    <>
      <MealLogModal />
      <RecipeModal />
      <AdaptModal />
      <BiometricsModal />
    </>
  );
}
