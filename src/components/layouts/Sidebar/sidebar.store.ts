import { create } from "zustand";
import { persist } from "zustand/middleware";

import { UserRole } from "./sidebar.types";

interface SidebarState {
  isSidebarCollapsed: boolean;

  dropdownOpen: Record<
    UserRole,
    Record<string, boolean>
  >;

  hasHydrated: boolean;

  toggleSidebar: () => void;

  toggleDropdown: (
    role: UserRole,
    label: string
  ) => void;

  setDropdownOpen: (
    role: UserRole,
    label: string,
    value: boolean
  ) => void;

  setHasHydrated: (
    state: boolean
  ) => void;
}

export const useSidebarStore =
  create<SidebarState>()(
    persist(
      (set) => ({
        isSidebarCollapsed: false,

        dropdownOpen: {
          admin: {},
          rt: {},
          rw: {},
          kades: {},
        },

        hasHydrated: false,

        toggleSidebar: () =>
          set((state) => ({
            isSidebarCollapsed:
              !state.isSidebarCollapsed,
          })),

        toggleDropdown: (
          role,
          label
        ) =>
          set((state) => ({
            dropdownOpen: {
              ...state.dropdownOpen,

              [role]: {
                ...state.dropdownOpen[
                  role
                ],

                [label]:
                  !state.dropdownOpen[
                    role
                  ]?.[label],
              },
            },
          })),

        setDropdownOpen: (
          role,
          label,
          value
        ) =>
          set((state) => ({
            dropdownOpen: {
              ...state.dropdownOpen,

              [role]: {
                ...state.dropdownOpen[
                  role
                ],

                [label]: value,
              },
            },
          })),

        setHasHydrated: (state) =>
          set({
            hasHydrated: state,
          }),
      }),
      {
        name: "sidebar-storage",

        onRehydrateStorage:
          () => (state) => {
            state?.setHasHydrated(
              true
            );
          },
      }
    )
  );